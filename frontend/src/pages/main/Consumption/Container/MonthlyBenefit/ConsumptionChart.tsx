import React from 'react';
import { View, StyleSheet } from 'react-native';

import ConsumptionChartItem from './ConsumptionChartItem';

interface ConsumptionChartProps {
  consumptions: Array<number>;
}

function ConsumptionChart({ consumptions }: ConsumptionChartProps) {
  const max = Math.max(...consumptions) * 1.25;

  return (
    <View style={styles.box}>
      {consumptions.map((consumption, index) => (
        <ConsumptionChartItem stickHeight={(consumption / max) * 200} key={index} />
      ))}
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

export default ConsumptionChart;
