import React from 'react';
import { Button, Text, View } from 'react-native';
import { PersonalAuthNavigationProps } from 'interfaces/navigation';

function PersonalAuth({ navigation }: PersonalAuthNavigationProps) {
  return (
    <View>
      <Text>본인 인증 페이지입니다.</Text>
      <Button title="휴대전화 인증하기" onPress={() => navigation.push('PhoneAuth')} />
    </View>
  );
}

export default PersonalAuth;
