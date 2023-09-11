import colors from '@common/design/colors';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, LayoutRectangle, LayoutChangeEvent, Button } from 'react-native';
import { Circle, Line, Svg } from 'react-native-svg';

interface BenefitChartProps {
  benefits: Array<number>;
}

function BenefitChart({ benefits }: BenefitChartProps) {
  const max = Math.max(...benefits) * 1.5;

  const start = 10;
  const end = 90;

  const Coordinates = {
    d1: { x: `${start}%`, y: `${90 - (benefits[0] / max) * 100}%` },
    d2: { x: `${start + (end - start) / 3}%`, y: `${90 - (benefits[1] / max) * 100}%` },
    d3: { x: `${end - (end - start) / 3}%`, y: `${90 - (benefits[2] / max) * 100}%` },
    d4: { x: `${end}%`, y: `${90 - (benefits[3] / max) * 100}%` },
  };

  return (
    <View style={styles.box}>
      <Svg width="100%" height="200">
        <Circle cx={Coordinates.d1.x} cy={Coordinates.d1.y} r="5" fill={colors.main2} />
        <Line
          x1={Coordinates.d1.x}
          y1={Coordinates.d1.y}
          x2={Coordinates.d2.x}
          y2={Coordinates.d2.y}
          stroke={colors.main2}
          strokeWidth="4"
        />
        <Circle cx={Coordinates.d2.x} cy={Coordinates.d2.y} r="5" fill={colors.main2} />
        <Line
          x1={Coordinates.d2.x}
          y1={Coordinates.d2.y}
          x2={Coordinates.d3.x}
          y2={Coordinates.d3.y}
          stroke={colors.main2}
          strokeWidth="4"
        />
        <Circle cx={Coordinates.d3.x} cy={Coordinates.d3.y} r="5" fill={colors.main2} />
        <Line
          x1={Coordinates.d3.x}
          y1={Coordinates.d3.y}
          x2={Coordinates.d4.x}
          y2={Coordinates.d4.y}
          stroke={colors.main2}
          strokeWidth="4"
        />
        <Circle cx={Coordinates.d4.x} cy={Coordinates.d4.y} r="5" fill={colors.main2} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.main2,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default BenefitChart;
