import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { RequestButtonProps } from '@common/interfaces/components';
import colors from '@common/design/colors';
import BText from './BText';

function RequestButton({ title, ...rest }: RequestButtonProps) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <BText type="bold" color={colors.white}>
        {title}
      </BText>
    </TouchableOpacity>
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
