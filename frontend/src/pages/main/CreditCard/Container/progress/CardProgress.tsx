import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CardProgressProps } from 'interfaces/common';
import colors from '@common/design/colors';
import CardProgressSection from './childs/CardProgressSection';
import CardProgressBar from './childs/CardProgressBar';

function CardProgress({ sections, current }: CardProgressProps) {
  const dummySections = [200000, 500000, 800000, 3000000, 5000000];
  const dummyCurrent = 1804340;

  let index = 0;
  let next = 0;

  for (let i of dummySections) {
    if (dummyCurrent > i) {
      index = dummySections.indexOf(i) + 1;
      next = dummySections[index];
    }
  }

  return (
    <View style={styles.container}>
      <CardProgressBar
        percent={
          (100 / dummySections.length) * index +
          (((dummyCurrent - dummySections[index - 1]) / (next - dummySections[index - 1])) * 100) /
            dummySections.length
        }
      />
      <CardProgressSection sectionCount={dummySections.length} currentSection={index} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-2.5%',
  },
});

export default CardProgress;
