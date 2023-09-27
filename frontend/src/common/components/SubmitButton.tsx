import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { SubmitButtonProps } from 'interfaces/common';
import colors from '@common/design/colors';
import BText from './BText';

function SubmitButton({ title, color = colors.main, ...rest }: SubmitButtonProps) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: color,
      padding: 12,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <TouchableHighlight
      disabled={color === colors.disabled}
      style={styles.button}
      activeOpacity={color === colors.disabled ? 1 : 0.2}
      underlayColor={color}
      {...rest}
    >
      <BText type="bold" color={colors.white}>
        {title}
      </BText>
    </TouchableHighlight>
  );
}

export default SubmitButton;
