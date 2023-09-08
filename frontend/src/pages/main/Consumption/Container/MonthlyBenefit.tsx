import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ConsumptionNavigationProps } from 'interfaces/navigation';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import { Spacing } from '@common/components/Spacing';

function MonthlyBenefit() {
  return (
    <View style={styles.box}>
      <BText type="h3">이번 달에 혜택을 가장 많이 받으셨네요!</BText>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: 20,
  },
});

export default MonthlyBenefit;
