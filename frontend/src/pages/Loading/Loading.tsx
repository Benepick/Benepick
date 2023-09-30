import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-svg';

function Loading() {
  return (
    <View>
      <Image
        style={{ width: 200, height: 200 }}
        source={require('@common/assets/images/Loading.gif')}
      />
    </View>
  );
}

export default Loading;
