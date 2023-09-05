import React from 'react';
import { View, Button, Text } from 'react-native';

import { ConsumptionNavigationProps } from '@common/interfaces/navigation';

function Consumption({ navigation }: ConsumptionNavigationProps) {
  return (
    <View>
      <Text>내 소비</Text>
    </View>
  );
}

export default Consumption;
