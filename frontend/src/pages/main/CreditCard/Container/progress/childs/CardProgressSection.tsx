import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CardProgressSectionProps } from 'interfaces/common';
import BText from '@common/components/BText';
import colors from '@common/design/colors';

function CardProgressSection({ sectionCount, currentSection }: CardProgressSectionProps) {
  const group = [];

  for (let i = 1; i <= sectionCount; i++) {
    group.push(i);
    console.log(group);
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          height: '100%',
          aspectRatio: 1,
          borderRadius: 10,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      {group.map((section) => (
        <View
          style={{
            height: '100%',
            aspectRatio: 1,
            borderRadius: 10,
            backgroundColor: currentSection < section ? colors.backgroundColor : colors.main,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          key={section}
        >
          <BText type="bold" color={currentSection < section ? colors.disabled : colors.white}>
            {section}
          </BText>
        </View>
      ))}
    </View>
  );
}

export default CardProgressSection;
