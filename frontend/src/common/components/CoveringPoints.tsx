import colors from '@common/design/colors';
import { CoveringPointsProps } from '@interfaces/common';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function CoveringPoints({ num, size }: CoveringPointsProps) {
  const styles = StyleSheet.create({
    dot: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: colors.black,
      margin: size / 8,
    },
    container: {
      flexDirection: 'row',
    },
  });
  const dots = [];
  dots.push(<View style={styles.dot} key={0} />);
  for (let i = 1; i < num; i++) {
    dots.push(<View style={styles.dot} key={i} />);
  }
  return <View style={styles.container}>{dots}</View>;
}

export default CoveringPoints;
