import React from 'react';
import { Text, View, Button } from 'react-native';

import NotificationItem from './Container/NotificationItem';

function Notification() {
  return (
    <View>
      <Text>알람 페이지</Text>
      <NotificationItem />
    </View>
  );
}

export default Notification;
