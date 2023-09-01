import React from 'react';
import { Text, View, Button } from 'react-native';

import AlarmItem from './Container/AlarmItem';

function Alarm() {
  return (
    <View>
      <Text>알람 페이지</Text>
      <AlarmItem />
    </View>
  );
}

export default Alarm;
