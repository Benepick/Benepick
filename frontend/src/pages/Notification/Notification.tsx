import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import NotificationItem from './Container/NotificationItem';
import WhitePage from '@common/components/WhitePage';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import NotificationDate from './Container/NotificationDate';
import { NotificationNavigationProps } from '@interfaces/navigation';
import SubmitButton from '@common/components/SubmitButton';
import { addNotificationLog } from '@store/slices/appSlice';

function Notification({ navigation }: NotificationNavigationProps) {
  const notificationLogs = useAppSelector((state) => state.app.notificationLog);
  const dispatch = useAppDispatch();
  return (
    <WhitePage>
      {notificationLogs.length !== 0 &&
        notificationLogs.map((log, index) => (
          <NotificationDate
            date={log.date}
            values={log.values}
            navigation={navigation}
            key={index}
          />
        ))}
      {notificationLogs.length === 0 && (
        <View style={styles.container}>
          <Spacing />
          <BText>알람 내역이 없습니다</BText>
        </View>
      )}
    </WhitePage>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default Notification;
