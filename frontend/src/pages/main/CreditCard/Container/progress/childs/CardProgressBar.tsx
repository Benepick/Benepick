import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CardProgressBarProps } from 'interfaces/common';
import colors from '@common/design/colors';

function CardProgressBar({ percent, section }: CardProgressBarProps) {
  const styles = StyleSheet.create({
    container: {
      width: '77%',
      height: '100%',
      justifyContent: 'center',
      marginLeft: '-1%',
    },
    baseLine: {
      width: '100%',
      height: '20%',
      backgroundColor: colors.backgroundColor,
      justifyContent: 'center',
      borderTopLeftRadius: section === 0 ? 5 : 0,
      borderBottomLeftRadius: section === 0 ? 5 : 0,
    },
    progressLine: {
      width: `${percent}%`,
      height: '150%',
      maxWidth: '100%',
      backgroundColor: colors.main,
      borderTopLeftRadius: section === 0 ? 5 : 0,
      borderBottomLeftRadius: section === 0 ? 5 : 0,
      borderTopRightRadius: percent !== 100 ? 5 : 0,
      borderBottomRightRadius: percent !== 100 ? 5 : 0,
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
