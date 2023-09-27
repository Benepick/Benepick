import BText from '@common/components/BText';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing } from '@common/components/Spacing';
import SvgIcons from '@common/assets/SvgIcons';
import colors from '@common/design/colors';
import NotificationItem from './NotificationItem';
import { NotificationNavigationProps } from '@interfaces/navigation';

interface NotificationLog extends NotificationNavigationProps {
  date: string;
  values: string[];
}

function NotificationDate({ date, values, navigation }: NotificationLog) {
  return (
    <View>
      <Spacing />
      <View style={styles.container}>
        <Spacing dir="row" rem="0.5" />
        <BText type="bold">
          {date.slice(0, 4)}년 {date.slice(5, 7)}월 {date.slice(8, 10)}일
        </BText>
      </View>
      <Spacing rem="0.5" />
      {values.map((value, index) => (
        <View key={index}>
          <NotificationItem value={value} navigation={navigation} />
          <Spacing rem="0.5" />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NotificationDate;
