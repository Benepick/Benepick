import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CardProgressProps } from 'interfaces/common';
import colors from '@common/design/colors';
import CardProgressSection from './childs/CardProgressSection';
import CardProgressBar from './childs/CardProgressBar';

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

  const percent =
    (100 / sections.length) * currentSection +
    (((currentAmount - sections[currentSection - 1]) /
      (nextSectionAmont - sections[currentSection - 1])) *
      100) /
      sections.length;

  return (
    <View style={styles.container}>
      {sections.map((section, index) => (
        <View key={section} style={styles.group}>
          <CardProgressBar
            section={index}
            percent={
              currentSection >= index + 1
                ? 100
                : currentSection === index
                ? ((currentAmount - sections[currentSection - 1]) /
                    (nextSectionAmont - sections[currentSection - 1])) *
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
