import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import WhitePage from '@common/components/WhitePage';
import PasswordInput from '@common/components/PasswordInput';
import PasswordNumpad from '@common/components/PasswordNumpad';

import { LoginNavigationProps } from 'interfaces/navigation';
import user from '@api/user';

function Login({ navigation }: LoginNavigationProps) {
  const [password, setPassword] = useState<string[]>([]);
  const [len, setLen] = useState<number>(0);

  useEffect(() => {
    setLen(password.length);
  }, [password, password.length]);

  const enterPassword = (pad: string) => {
    if (pad === 'Clear') {
      setPassword([]);
    } else if (pad === 'remove' && password.length > 0) {
      const newPassword = [...password];
      newPassword.pop();
      setPassword(newPassword);
    } else {
      const newPassword = [...password, pad];
      setPassword(newPassword);
      if (newPassword.length === 6) {
        setPassword([]);
        user
          .login(newPassword.join(''))
          .then((response) => {
            if (response.statusCode === 200) {
              console.log(response.messages);
              navigation.navigate('BottomTab');
            } else {
              console.log('Error, Status Code: ', response.statusCode);
              if (response.statusCode === 400) {
                Alert.alert('비밀번호가 틀렸습니다.');
              } else if (response.statusCode === 460) {
                Alert.alert('토큰 만료 : 재인증이 필요합니다.');
                navigation.push('AuthStack');
              } else if (response.statusCode === 461) {
                Alert.alert('토큰 만료 : 재인증이 필요합니다.');
                navigation.push('AuthStack');
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <WhitePage>
      <View style={styles.container}>
        <View style={styles.top}>
          <Spacing rem="5" />
          <BText type="h1" children="비밀번호 확인" />
          <Spacing />
          <BText type="h3" children={'비밀번호를 입력해주세요'} />
          <Spacing rem="2" />
          <PasswordInput enteredLength={len} />
        </View>
        <PasswordNumpad enterPassword={(pad) => enterPassword(pad)} />
      </View>
    </WhitePage>
  );
}

const styles = StyleSheet.create({
  top: {
    alignItems: 'center',
  },
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },
});

export default Login;
