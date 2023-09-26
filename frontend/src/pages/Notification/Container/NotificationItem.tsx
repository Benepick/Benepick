import BText from '@common/components/BText';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing } from '@common/components/Spacing';
import SvgIcons from '@common/assets/SvgIcons';
import colors from '@common/design/colors';

function NotificationItem() {
  return (
    <View>
      <View style={styles.text}>
          <SvgIcons name="Location" fill={colors.disabled} size={30} />
          <Spacing rem="0.5" dir="row" />
        <BText>~~어쩌고저쩌고 추천해 드려요</BText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NotificationItem;
