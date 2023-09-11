import SvgIcons from '@common/assets/SvgIcons';
import colors from '@common/design/colors';
import { BCheckBoxProps } from 'interfaces/common';
import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

function BCheckBox({ size, value, ...rest }: BCheckBoxProps) {
  const styles = StyleSheet.create({
    check: {
      width: size * 25,
      height: size * 25,
      backgroundColor: value ? colors.main : colors.white,
      borderWidth: 2,
      borderColor: colors.disabled,
      display: 'flex',
      justifyContent: 'center',
      borderRadius: size * 5,
    },
  });
  return (
    <TouchableHighlight
      style={styles.check}
      {...rest}
      activeOpacity={0}
      underlayColor={colors.white}
    >
      {value ? <SvgIcons name="Check" fill={colors.white} /> : <View />}
    </TouchableHighlight>
  );
}

export default BCheckBox;
