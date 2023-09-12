import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { RequestButtonProps } from 'interfaces/common';
import colors from '@common/design/colors';
import BText from './BText';

function RequestButton({ title, ...rest }: RequestButtonProps) {
  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor={colors.main}
      activeOpacity={0.5}
      {...rest}
    >
      <BText type="bold" color={colors.white}>
        {title}
      </BText>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.main,
    padding: 7,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RequestButton;
