import colors from '@common/design/colors';
import { BSwitchProps } from 'interfaces/common';
import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

function BSwitch({ size, value, ...rest }: BSwitchProps) {
  const styles = StyleSheet.create({
    switch: {
      width: size * 50,
      height: size * 25,
      backgroundColor: value ? colors.main2 : colors.disabled,
      display: 'flex',
      justifyContent: 'center',
      borderRadius: size * 10,
    },
    grip: {
      width: size * 20,
      height: size * 20,
      borderRadius: size * 10,
      backgroundColor: colors.white,
      alignSelf: value ? 'flex-end' : 'flex-start',
      marginLeft: size * 2.5,
      marginRight: size * 2.5,
    },
  });
  return (
    <TouchableHighlight style={styles.switch} {...rest} underlayColor={colors.disabled}>
      <View style={styles.grip}></View>
    </TouchableHighlight>
  );
}

export default BSwitch;
