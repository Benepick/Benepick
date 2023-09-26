import React from 'react';
import { Text, View, Button } from 'react-native';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import NotificationItem from './Container/NotificationItem';
import WhitePage from '@common/components/WhitePage';

function Notification() {
  return (
    <WhitePage>
      <Spacing />
        <BText type="h3" >2023년 어쩌고</BText>
      <Spacing />
      <NotificationItem />
    </WhitePage>
  );
}


export default Notification;
