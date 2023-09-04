import React from 'react';
import { Text, View, Button } from 'react-native';

import { StartNavigationProps } from '@common/interfaces/navigation';

function Start({ navigation }: StartNavigationProps) {
  return (
    <View>
      <Text>BenePick</Text>
      <Button title="BenePick 시작하기" onPress={() => navigation.push('Terms')} />
    </View>
  );
}

export default Start;
