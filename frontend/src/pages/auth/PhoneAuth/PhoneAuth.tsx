import React, { useState } from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import { PhoneAuthNavigationProps } from 'interfaces/navigation';

function PhoneAuth({ navigation }: PhoneAuthNavigationProps) {
  const [text, onChangeText] = useState('');

  return (
    <View>
      <Text>휴대전화 인증 페이지입니다.</Text>
      <TextInput value={text} onChangeText={onChangeText} />
      <Button title="인증 완료" onPress={() => navigation.push('SetPassword')} />
    </View>
  );
}

export default PhoneAuth;
