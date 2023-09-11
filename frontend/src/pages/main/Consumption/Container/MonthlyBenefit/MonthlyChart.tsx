import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Spacing } from '@common/components/Spacing';
import MonthlyConsumption from './MonthlyConsumption';

interface MonthlyChartProps {
  consumption: Array<number>;
}

function MonthlyChart({ consumption }: MonthlyChartProps) {
  const max = Math.max(...consumption) * 1.25;
  return (
    <View style={styles.box}>
      <MonthlyConsumption stickHeight={(consumption[0] / max) * 200} />
      <MonthlyConsumption stickHeight={(consumption[1] / max) * 200} />
      <MonthlyConsumption stickHeight={(consumption[2] / max) * 200} />
      <MonthlyConsumption stickHeight={(consumption[3] / max) * 200} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
});

export default MonthlyChart;
