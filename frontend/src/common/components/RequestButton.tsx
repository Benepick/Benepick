import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { RequestButtonProps } from 'interfaces/common';
import colors from '@common/design/colors';
import BText from './BText';

function RequestButton({ title, color = colors.main, ...rest }: RequestButtonProps) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: color,
      padding: 7,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor={color}
      activeOpacity={color === colors.disabled ? 1 : 0.2}
      {...rest}
    >
      <BText type="bold" color={colors.white}>
        {title}
      </BText>
    </TouchableHighlight>
  );
}

export default RequestButton;
