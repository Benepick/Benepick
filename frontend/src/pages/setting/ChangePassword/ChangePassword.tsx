import React, { useEffect, useState } from 'react';
import { View, Button, Text, Alert, StyleSheet } from 'react-native';

import { ChangePasswordNavigationProps } from 'interfaces/navigation';
import user from '@api/user';
import WhitePage from '@common/components/WhitePage';
import { Spacing } from '@common/components/Spacing';
import BText from '@common/components/BText';
import PasswordInput from '@common/components/PasswordInput';
import PasswordNumpad from '@common/components/PasswordNumpad';

function ChangePassword({ navigation }: ChangePasswordNavigationProps) {
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
            user
              .password(newPassword.join(''))
              .then((response) => {
                if (response.statusCode === 200) {
                  console.log('성공, Message: ', response.messages);
                  Alert.alert('비밀번호가 변경되었습니다.');
                } else {
                  console.log('Error');
                  Alert.alert('비밀번호 변경에 실패했습니다.');
                }
                setPassword([]);
                setCheck([]);
                navigation.navigate('Setting');
              })
              .catch((error) => {
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
          <BText type="h1" children={check.length !== 6 ? '비밀번호 재설정' : '비밀번호 확인'} />
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

export default ChangePassword;
