import React from 'react';
import { Text, View, Button } from 'react-native';

function Start({ navigation }: any) {
  return (
    <View>
      <Text>스타트</Text>
      <Button title="홈열기" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default Start;
