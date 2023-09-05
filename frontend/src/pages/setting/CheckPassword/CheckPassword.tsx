import React from 'react';
import { View, Button, Text } from 'react-native';

import { CheckPasswordNavigationProps } from '@common/interfaces/navigation';

function CheckPassword({ navigation }: CheckPasswordNavigationProps) {
  return (
    <View>
      <Text>비밀번호 확인</Text>
    </View>
  );
}

export default CheckPassword;
