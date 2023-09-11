import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import BText from '@common/components/BText';
import colors from '@common/design/colors';
import { Spacing } from '@common/components/Spacing';
import MonthlyChart from './MonthlyBenefit/MonthlyChart';

function MonthlyBenefit() {
  const consumption = [1547340, 1193491, 1233214, 1112340];
  const benefit = [15440, 8800, 17200, 300];
  return (
    <View style={styles.container}>
      <BText type="h3">{}에 혜택을 가장 많이 받으셨네요!</BText>

      <MonthlyChart consumption={consumption} />

      <View style={styles.text}>
        <BText type="bold">
          {}년 {}월 총 사용 금액
        </BText>
        <BText type="p">{} 원</BText>
      </View>
      <View style={styles.text}>
        <BText type="bold">
          {}년 {}월 총 받은 혜택
        </BText>
        <BText type="p">{} 원</BText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: 20,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MonthlyBenefit;
