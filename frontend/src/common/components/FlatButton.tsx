import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import BText from './BText';
import colors from '@common/design/colors';

interface FlatButtonProps extends TouchableOpacityProps {
  title: string;
}

function FlatButton({ title, onPress }: FlatButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={onPress}>
      <BText type="p" color={colors.disabled}>
        {title}
      </BText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '45%',
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
    borderColor: colors.disabled,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FlatButton;
