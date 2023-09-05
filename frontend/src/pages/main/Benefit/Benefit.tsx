import React from 'react';
import { View, Button, Text } from 'react-native';

import { BenefitNavigationProps } from '@common/interfaces/navigation';

function Benefit({ navigation }: BenefitNavigationProps) {
  return (
    <View>
      <Text>내 혜택</Text>
    </View>
  );
}

export default Benefit;
