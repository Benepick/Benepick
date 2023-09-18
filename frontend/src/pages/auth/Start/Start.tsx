import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';

import { StartNavigationProps } from 'interfaces/navigation';
import WhitePage from '@common/components/WhitePage';
import SubmitButton from '@common/components/SubmitButton';
import { Spacing } from '@common/components/Spacing';
import { useAppDispatch } from '@store/hooks';
import { setToken } from '@store/slices/userSlice';

function Start({ navigation }: StartNavigationProps) {
  const dispatch = useAppDispatch();
  return (
    <WhitePage style={styles.layout}>
      <Image style={styles.logo} source={require('@common/assets/images/logo/startLogo.png')} />
      <Spacing />
      <SubmitButton
        title="베네픽 시작하기"
        onPress={() => navigation.push('Terms', { isRead: false })}
      />
      <Spacing />
      <SubmitButton
        title="간편 로그인 페이지로 이동하기"
        onPress={() => navigation.push('Login')}
      />
      <Spacing />

      <SubmitButton title="홈페이지로 이동하기" onPress={() => navigation.push('BottomTab')} />
      <Spacing />

      <SubmitButton title="테스트 페이지로 이동하기" onPress={() => navigation.push('Test')} />

      <SubmitButton
        title="최정수님으로 로그인하기"
        onPress={() =>
          dispatch(
            setToken(
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3MtdG9rZW4iLCJpYXQiOjE2OTQ2NTI3MDAsImV4cCI6MTc1NTEzMjcwMCwidXNlcklkIjoiMDAyM2QwYjc2NDAxYzQ4NGMxMjNlOWRjYzYwMzQ5M2Y2ODdmZTRkZjhlOTY1MjFlOGU1MWFhMmVmZDNmZGEwZSJ9.FOVWaHgmS8QjEJYEHzn0rSTZNRsx3MX57VSql2PHWRs',
            ),
          )
        }
      />
    </WhitePage>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
  layout: {
    justifyContent: 'center',
  },
});

export default Start;
