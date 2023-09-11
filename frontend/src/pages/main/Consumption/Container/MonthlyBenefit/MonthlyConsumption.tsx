import React, { useState } from 'react';
import { View, StyleSheet, LayoutRectangle, LayoutChangeEvent } from 'react-native';

import BText from '@common/components/BText';
import colors from '@common/design/colors';

interface MonthlyStickProps {
  stickHeight: number;
}

function MonthlyConsumption({ stickHeight }: MonthlyStickProps) {
  const styles = StyleSheet.create({
    box: {
      width: '15%',
      alignItems: 'center',
    },
    stick: {
      width: '100%',
      height: stickHeight,
      backgroundColor: colors.main3,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    // dot: {
    //   width: '20%',
    //   height: layout?.width,
    //   borderRadius: layout ? layout?.width / 2 : 0,
    //   backgroundColor: colors.main,
    // },
  });

  return (
    <View style={styles.box}>
      <View style={styles.stick}></View>
      <BText type="bold">{} 월</BText>
    </View>
  );
}

export default MonthlyConsumption;
