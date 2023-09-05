import React from 'react';
import { View, Button, Text } from 'react-native';

import { ChangePasswordNavigationProps } from '@common/interfaces/navigation';

function ChangePassword({ navigation }: ChangePasswordNavigationProps) {
  return (
    <View>
      <Text>비밀번호 변경</Text>
    </View>
  );
}

export default ChangePassword;
