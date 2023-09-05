import React from 'react';
import { Button, Text, View } from 'react-native';

import { TermsNavigationProps } from '@common/interfaces/navigation';

function Terms({ navigation }: TermsNavigationProps) {
  return (
    <View>
      <Text>이용약관 페이지입니다.</Text>
      <Button title="이용약관 확인하기" onPress={() => navigation.push('ReadTerms')} />
      <Button title="이용약관 동의하기" onPress={() => navigation.push('PersonalAuth')} />
    </View>
  );
}

export default Terms;
