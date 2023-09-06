import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { CompanySelectBoxProps } from '@common/interfaces/components';
import SvgIcons from '@common/assets/SvgIcons';
import colors from '@common/design/colors';
import { Spacing } from './Spacing';

function CompanySelectBox({ name, size = 30, image, state }: CompanySelectBoxProps) {
  const [isSelected, setIsSelected] = useState(false);

  const icon = state === 'linked' ? 'Link' : state === 'selected' ? 'Check' : 'Add';

  const onPress = () => {
    setIsSelected(!isSelected);
  };

  const styles = StyleSheet.create({
    defaultBox: {
      width: `${size}%`,
      aspectRatio: 1,
      borderStyle: 'solid',
      borderColor: colors.disabled,
      borderWidth: 1,
      borderRadius: size / 3,
      backgroundColor: 'transparent',
    },
    selectedBox: {
      width: `${size}%`,
      aspectRatio: 1,
      borderStyle: 'solid',
      borderColor: colors.main2,
      borderWidth: 1,
      borderRadius: size / 3,
      backgroundColor: colors.main3,
    },
    icon: { alignSelf: 'flex-end', marginRight: size / 10 },
    image: {
      width: `${size * 1.5}%`,
      height: `${size * 1.5}%`,
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
