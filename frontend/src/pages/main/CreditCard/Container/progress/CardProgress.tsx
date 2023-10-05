import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CardProgressProps } from 'interfaces/common';
import colors from '@common/design/colors';
import CardProgressSection from './childs/CardProgressSection';
import CardProgressBar from './childs/CardProgressBar';
import BText from '@common/components/BText';

function CardProgress({
  sections,
  currentAmount,
  currentSection,
  nextSectionAmont,
}: CardProgressProps) {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 12,
      flexDirection: 'row',
    },
    group: {
      width: `${100 / sections.length}%`,
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {sections.map((section, index) => (
        <View key={section} style={styles.group}>
          <CardProgressBar
            section={index}
            percent={
              currentSection > index
                ? 100
                : currentSection === index
                ? ((currentAmount - sections[currentSection]) /
                    (nextSectionAmont - sections[currentSection])) *
                  100
                : 0
            }
          />
          <CardProgressSection section={index + 1} isFill={currentSection >= index + 1} />
        </View>
      ))}
    </View>
  );
}

export default CardProgress;
