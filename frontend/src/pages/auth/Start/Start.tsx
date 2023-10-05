import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Image, NativeModules } from 'react-native';

import { StartNavigationProps } from 'interfaces/navigation';
import WhitePage from '@common/components/WhitePage';
import SubmitButton from '@common/components/SubmitButton';
import { Spacing } from '@common/components/Spacing';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setToken, setUserName } from '@store/slices/userSlice';

function Start({ navigation }: StartNavigationProps) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.token) {
      if (user.autoLogIn) {
        navigation.push('BottomTab');
      } else {
        navigation.push('Login');
      }
    }
  }, []);

  const { EventListener } = NativeModules;

  const testLogin = () => {
    dispatch(
      setToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3MtdG9rZW4iLCJpYXQiOjE2OTY0OTE4NzEsImV4cCI6MTc1Njk3MTg3MSwidXNlcklkIjoiMDcwZjE4ZGYwZmU3MmI0ZjllNzcxNDk0M2ZlMGMzMDkxOTU0NTk2NWJhN2UwNDcwZGUxY2M3Yzc3YjMyZGRkNSJ9.3EvuzOrN-H7qWZWHik_tJC199CFToW2BSr6XanUHywE',
      ),
    );
    dispatch(setUserName('베네픽'));
    navigation.navigate('BottomTab');
  };

  return (
    <WhitePage style={styles.layout}>
      <Image style={styles.logo} source={require('@common/assets/images/logo/startLogo.png')} />
      <Spacing />
      <SubmitButton
        title="베네픽 시작하기"
        onPress={() => navigation.push('Terms', { isRead: false })}
      />
      <Spacing />
      <SubmitButton title="베네픽 체험하기" onPress={testLogin} />
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
