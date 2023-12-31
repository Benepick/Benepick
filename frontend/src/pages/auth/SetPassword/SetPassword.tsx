import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import WhitePage from '@common/components/WhitePage';
import PasswordInput from '@common/components/PasswordInput';
import PasswordNumpad from '@common/components/PasswordNumpad';

import { SetPasswordNavigationProps } from 'interfaces/navigation';
import user from '@api/user';
import { useAppDispatch } from '../../../store/hooks';
import { setToken, setUserName } from '@store/slices/userSlice';

function SetPassword({ navigation, route }: SetPasswordNavigationProps) {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<Array<string>>([]);
  const [len, setLen] = useState(0);
  const [check, setCheck] = useState<Array<string>>([]);

  useEffect(() => {
    setLen(password.length);
  }, [password, password.length]);

  const enterPassword = (pad: string) => {
    if (pad === 'Clear') {
      setPassword([]);
    } else if (pad === 'remove' && password.length >= 0) {
      const newPassword = [...password];
      newPassword.pop();
      setPassword(newPassword);
    } else {
      const newPassword = [...password, pad];
      setPassword(newPassword);
      if (newPassword.length === 6) {
        if (check.length === 6) {
          console.log(check);
          console.log(newPassword);
          if (JSON.stringify(check) == JSON.stringify(newPassword)) {
            const userData = {
              userName: route.params.userData.userName,
              userSocialNumber: route.params.userData.userSocialNumber,
              userPhoneNumber: route.params.userData.userPhoneNumber,
              userGenderAndGenerationCode: route.params.userData.userGenderAndGenerationCode,
              userSimplePassword: check.join(''),
            };
            user
              .signup(userData)
              .then((response) => {
                const AuthHeader = response.headers.authorization;
                const token = AuthHeader.replace('Bearer ', '');
                const userName = response.data.data;
                dispatch(setToken(token));
                dispatch(setUserName(userName));

                setPassword([]);
                setCheck([]);
                navigation.navigate('SelectCompany');
              })
              .catch((error) => {
                console.log(userData);
                console.log('Error, Message: ', error);
              });
          } else {
            setPassword([]);
            setCheck([]);
            Alert.alert('비밀번호를 확인해주세요.');
          }
        } else {
          setCheck(newPassword);
          setPassword([]);
        }
      }
    }
  };

  return (
    <WhitePage>
      <View style={styles.container}>
        <View style={styles.top}>
          <Spacing rem="5" />
          <BText type="h1" children={check.length !== 6 ? '비밀번호 설정' : '비밀번호 확인'} />
          <Spacing />
          <BText
            type="h3"
            children={
              check.length !== 6 ? '비밀번호를 입력해주세요' : '비밀번호를 한번 더 입력해주세요'
            }
          />
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

export default SetPassword;
