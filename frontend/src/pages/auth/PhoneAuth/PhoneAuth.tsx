import React from 'react';
import { Button, Text, View } from 'react-native';
import { PhoneAuthNavigationProps } from '@common/interfaces/navigation';

function PhoneAuth({ navigation }: PhoneAuthNavigationProps) {
  return (
    <View>
      <Text>휴대전화 인증 페이지입니다.</Text>
      <Button title="인증 완료" onPress={() => navigation.push('PasswordSetting')} />
    </View>
  );
}

export default PhoneAuth;
