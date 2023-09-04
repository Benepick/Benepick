import React from 'react';
import { Text, View, Button } from 'react-native';
import { StartNavigationProps } from '../../common/interface';

function Start({ navigation }: StartNavigationProps) {
  return (
    <View>
      <Text>스타트</Text>
      <Button title="홈열기" onPress={() => navigation.push('BottomTab')} />
    </View>
  );
}

export default Start;
