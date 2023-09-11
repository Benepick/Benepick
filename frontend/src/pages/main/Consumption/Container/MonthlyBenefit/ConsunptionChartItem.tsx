import React, { useState } from 'react';
import { View, StyleSheet, LayoutRectangle, LayoutChangeEvent } from 'react-native';

import BText from '@common/components/BText';
import colors from '@common/design/colors';
import { Spacing } from '@common/components/Spacing';

interface ConsunptionChartItemProps {
  stickHeight: number;
}

function ConsunptionChartItem({ stickHeight }: ConsunptionChartItemProps) {
  const styles = StyleSheet.create({
    box: {
      width: '15%',
      alignItems: 'center',
    },
    stick: {
      width: '100%',
      height: stickHeight,
      backgroundColor: colors.main2,
      alignItems: 'center',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
  });
  return (
    <View style={styles.box}>
      <View style={styles.stick}></View>
    </View>
  );
}

export default ConsunptionChartItem;
