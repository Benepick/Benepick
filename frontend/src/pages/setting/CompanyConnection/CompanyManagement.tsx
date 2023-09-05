import React from 'react';
import { View, Button, Text } from 'react-native';

import { CompanyManagementNavigationProps } from '@common/interfaces/navigation';

function CompanyManagement({ navigation }: CompanyManagementNavigationProps) {
  return (
    <View>
      <Text>카드사 관리</Text>
    </View>
  );
}

export default CompanyManagement;
