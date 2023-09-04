import React from 'react';
import { View } from 'react-native';
import AlarmButton from '../../common/components/AlarmButton';

function Test() {
  return (
    <View>
      <AlarmButton isAlarmed={false} onPress={() => console.log('알람크릭')} />
    </View>
  );
}

export default Test;
