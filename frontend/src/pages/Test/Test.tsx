import React from 'react';
import { View } from 'react-native';
import AlarmButton from '../../common/components/AlarmButton';

import IconButton from '@common/components/IconButton';

function Test() {
  return (
    <View>
      <AlarmButton isAlarmed={false} onPress={() => console.log('알람크릭')} />
      <IconButton name="ChatBot" size={100} />
    </View>
  );
}

export default Test;
