import React from 'react';
import { View, Button, Text } from 'react-native';

import { CheckPasswordNavigationProps } from 'interfaces/navigation';

function CheckPassword({ navigation }: CheckPasswordNavigationProps) {
  return (
    <View>
      <Text>비밀번호 확인</Text>
      <Button title="비밀번호 변경" onPress={() => navigation.push('ChangePassword')} />
    </View>
  );
}

export default CheckPassword;
