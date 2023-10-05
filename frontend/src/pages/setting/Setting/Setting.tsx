import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';

import { SettingNavigationProps } from 'interfaces/navigation';
import WhitePage from '@common/components/WhitePage';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import AuthSetting from './Container/AuthSetting';
import CardSetting from './Container/CardSetting';
import AppSetting from './Container/AppSetting';
import FlatButton from '@common/components/FlatButton';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { clearToken, setAutoLogin } from '@store/slices/userSlice';
import { reset } from '@store/slices/appSlice';
import user from '@api/user';

function Setting({ navigation }: SettingNavigationProps) {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.userName);

  const logout = () => {
    Alert.alert('로그아웃', '정말로 로그아웃 하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('로그아웃 취소'),
        style: 'cancel',
      },
      {
        text: '로그아웃',
        onPress: () => {
          dispatch(clearToken());
          dispatch(setAutoLogin(false));
          dispatch(reset());
          navigation.push('AuthStack');
        },
      },
    ]);
  };

  const withdrawal = () => {
    Alert.alert('회원탈퇴', '정말로 회원탈퇴를 진행하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('회원탈퇴 취소'),
        style: 'cancel',
      },
      {
        text: '회원탈퇴',
        onPress: () => {
          if (userName !== '베네픽') {
            user
              .withdrawal()
              .then((response) => {
                dispatch(clearToken());
                dispatch(setAutoLogin(false));
                dispatch(reset());
                navigation.push('AuthStack');
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            Alert.alert('체험 계정은 탈퇴가 불가합니다.');
          }
        },
      },
    ]);
  };

  return (
    <WhitePage>
      <Spacing />
      <BText type="h3">사용자 설정</BText>
      <Spacing />
      <AuthSetting navigation={navigation} />
      <Spacing />
      <BText type="h3">카드 설정</BText>
      <Spacing />
      <CardSetting navigation={navigation} />
      <Spacing />
      <BText type="h3">앱 설정</BText>
      <Spacing />
      <AppSetting />
      <View style={styles.row}>
        <FlatButton title={'로그아웃'} onPress={logout} />
        <Spacing dir={'row'} />
        <FlatButton title={'회원탈퇴'} onPress={withdrawal} />
      </View>
      <Spacing rem="1" />
    </WhitePage>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Setting;
