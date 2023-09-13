import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CardProgressBarProps } from 'interfaces/common';
import colors from '@common/design/colors';

function CardProgressBar({ percent }: CardProgressBarProps) {
  const styles = StyleSheet.create({
    container: {
      width: '90%',
      height: '40%',
      justifyContent: 'center',
    },
    baseLine: {
      width: '100%',
      height: '50%',
      backgroundColor: colors.backgroundColor,
      zIndex: 0,
      position: 'absolute',
      borderRadius: 7,
      justifyContent: 'center',
    },
    progressLine: {
      width: `${percent}%`,
      height: '150%',
      backgroundColor: colors.main,
      zIndex: 1,
      position: 'absolute',
      borderRadius: 7,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.baseLine}>
        <View style={styles.progressLine} />
      </View>
    </View>
  );
}

export default CardProgressBar;
