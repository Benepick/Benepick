import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { CompanySelectBoxProps } from 'interfaces/common';
import SvgIcons from '@common/assets/SvgIcons';
import colors from '@common/design/colors';
import { Spacing } from './Spacing';

function CompanySelectBox({
  name,
  size = 30,
  image,
  isLinked,
  isSelected,
  onPress,
}: CompanySelectBoxProps) {
  const icon = isLinked ? 'Link' : isSelected ? 'Check' : 'Add';

  const styles = StyleSheet.create({
    defaultBox: {
      width: '100%',
      aspectRatio: 1,
      borderStyle: 'solid',
      borderColor: colors.disabled,
      borderWidth: 1,
      borderRadius: size / 3,
      backgroundColor: 'transparent',
    },
    selectedBox: {
      width: '100%',
      aspectRatio: 1,
      borderStyle: 'solid',
      borderColor: colors.main2,
      borderWidth: 1,
      borderRadius: size / 3,
      backgroundColor: colors.main3,
    },
    icon: { alignSelf: 'flex-end', marginRight: size / 10 },
    image: {
      width: '45%',
      height: '45%',
      alignSelf: 'center',
    },
    text: { alignSelf: 'center' },
  });
  return (
    <TouchableHighlight
      underlayColor={colors.main3}
      style={isSelected ? styles.selectedBox : styles.defaultBox}
      onPress={onPress}
    >
      <View>
        <SvgIcons
          name={icon}
          fill={icon === 'Link' ? colors.main : colors.disabled}
          style={styles.icon}
        />
        <Spacing rem="0.25" />
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <Spacing rem="0.25" />
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default CompanySelectBox;
