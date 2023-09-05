import React from 'react';
import { View, Button, Text } from 'react-native';

import { SettingNavigationProps } from '@common/interfaces/navigation';

function Setting({ navigation }: SettingNavigationProps) {
  return (
    <View>
      <Text>환경 설정</Text>
      <Button title="비밀번호 변경" onPress={() => navigation.push('PasswordStack')} />
      <Button title="자산 연결 관리" onPress={() => navigation.push('CompanyStack')} />
    </View>
  );
}

export default Setting;
