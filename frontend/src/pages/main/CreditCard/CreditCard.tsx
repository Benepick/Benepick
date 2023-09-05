import React from 'react';
import { View, Button, Text } from 'react-native';

import { CreditCardNavigationProps } from '@common/interfaces/navigation';

function CreditCard({ navigation }: CreditCardNavigationProps) {
  return (
    <View>
      <Text>내 카드</Text>
    </View>
  );
}

export default CreditCard;
