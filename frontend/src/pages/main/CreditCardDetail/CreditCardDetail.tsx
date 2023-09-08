import React from 'react';
import { View, Button, Text } from 'react-native';

import { CreditCardDetailNavigationProps } from 'interfaces/navigation';

function CreditCardDetail({ navigation }: CreditCardDetailNavigationProps) {
  return (
    <View>
      <Text>내 카드 상세</Text>
    </View>
  );
}

export default CreditCardDetail;
