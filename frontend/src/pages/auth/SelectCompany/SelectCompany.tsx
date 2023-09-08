import React from 'react';
import { Button, Text, View } from 'react-native';
import { SelectCompanyNavigationProps } from 'interfaces/navigation';

function SelectCompany({ navigation }: SelectCompanyNavigationProps) {
  return (
    <View>
      <Text>카드사 선택 페이지입니다.</Text>
      <Button title="카드사 선택 완료" onPress={() => navigation.push('SelectCard')} />
    </View>
  );
}

export default SelectCompany;
