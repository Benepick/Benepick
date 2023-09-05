import React from 'react';
import { View, Button, Text } from 'react-native';

import { CompanyConnectionNavigationProps } from '@common/interfaces/navigation';

function CompanyConnection({ navigation }: CompanyConnectionNavigationProps) {
  return (
    <View>
      <Text>카드사 연결 확인 페이지</Text>
      <Button title="자산 연결하러 가기" onPress={() => navigation.push('CompanyManagement')} />
    </View>
  );
}

export default CompanyConnection;
