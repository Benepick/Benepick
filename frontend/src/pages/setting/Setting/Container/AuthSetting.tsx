import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import SvgIcons from '@common/assets/SvgIcons';
import colors from '@common/design/colors';
import BSwitch from '@common/components/BSwitch';
import IconButton from '@common/components/IconButton';
import { SettingNavigationProps } from '@interfaces/navigation';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setAutoLogin } from '@store/slices/userSlice';

function AuthSetting({ navigation }: SettingNavigationProps) {
  const isAutoLogined = useAppSelector((state) => state.user.autoLogIn);
  const [isBiometricAuthentication, setBiometricAuthentication] = useState(false);
  const dispatch = useAppDispatch();

  const changeAutoLogin = () => {
    if (isAutoLogined) {
      dispatch(setAutoLogin(!isAutoLogined));
    } else {
      navigation.navigate('CheckPasswordToAutoLogin');
    }
  };

  return (
    <View>
      {/* 자동 로그인 여부 */}
      <View style={styles.container}>
        <View style={styles.option}>
          <View style={styles.text}>
            <SvgIcons name="Profile" fill={colors.disabled} size={30} />
            <Spacing rem="0.5" dir="row" />
            <BText>자동로그인 여부</BText>
          </View>
          <View>
            <BSwitch size={1} value={isAutoLogined} onPress={changeAutoLogin} />
          </View>
        </View>
        <Spacing rem="1" />
      </View>
      {/* 생체 인증 사용 여부 */}
      {/* <View style={styles.container}>
        <View style={styles.option}>
          <View style={styles.text}>
            <SvgIcons name="FingerPrint" fill={colors.disabled} size={30} />
            <Spacing rem="0.5" dir="row" />
            <BText>생체인증 여부</BText>
          </View>
          <View>
            <BSwitch
              size={1}
              value={isBiometricAuthentication}
              onPress={changeBiometricAuthentication}
            />
          </View>
        </View>
        <Spacing rem="1" />
      </View> */}

      <View style={styles.container}>
        <View style={styles.option}>
          <View style={styles.text}>
            <SvgIcons name="Lock" fill={colors.disabled} size={30} />
            <Spacing rem="0.5" dir="row" />
            <BText>비밀번호 변경</BText>
          </View>
          <View>
            <IconButton
              name="Right"
              onPress={() => {
                navigation.push('PasswordStack');
              }}
            />
          </View>
        </View>
        <Spacing rem="0.5" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AuthSetting;
