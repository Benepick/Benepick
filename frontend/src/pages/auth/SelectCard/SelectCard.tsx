import React from 'react';
import { Button, Text, View } from 'react-native';
import { SelectCardNavigationProps } from '@common/interfaces/navigation';

function SelectCard({ navigation }: SelectCardNavigationProps) {
  return (
    <View>
      <Text>카드 선택 페이지입니다.</Text>
      <Button title="카드 선택 완료" onPress={() => navigation.push('RegistrationComplete')} />
    </View>
  );
}

export default SelectCard;
