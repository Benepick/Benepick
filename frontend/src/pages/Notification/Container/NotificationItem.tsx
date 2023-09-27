import BText from '@common/components/BText';
import React from 'react';
import { View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Spacing } from '@common/components/Spacing';
import SvgIcons from '@common/assets/SvgIcons';
import colors from '@common/design/colors';
import { NotificationNavigationProps } from '@interfaces/navigation';

interface NotificationItemProps extends NotificationNavigationProps {
  value: string;
}

function NotificationItem({ value, navigation }: NotificationItemProps) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Benefit', { place: value })}>
      <View style={styles.container}>
        <SvgIcons name="Location" fill={colors.disabled} size={30} />
        <Spacing rem="0.5" dir="row" />
        <BText type="p" style={styles.text}>
          {value}에서 카드 추천을 받으셨어요
        </BText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  },
});

export default NotificationItem;
