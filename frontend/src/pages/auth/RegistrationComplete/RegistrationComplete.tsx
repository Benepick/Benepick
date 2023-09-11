import React from 'react';
import { Button, Text, View } from 'react-native';
import { RegistrationCompleteNavigationProps } from 'interfaces/navigation';

function RegistrationComplete({ navigation }: RegistrationCompleteNavigationProps) {
  return (
    <View>
      <Text>카드 등록이 완료되었습니다.</Text>
      <Button onPress={() => navigation.push('BottomTab')} title="BenePick 시작하기"></Button>
    </View>
  );
}

export default RegistrationComplete;
