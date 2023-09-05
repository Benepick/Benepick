import React, { useState } from 'react';
import { BInputProps } from '@common/interfaces/components';
import { TextInput, StyleSheet } from 'react-native';

function BInput({ ...rest }: BInputProps) {
  return <TextInput style={styles.input} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default BInput;
