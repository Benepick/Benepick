import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import colors from '@common/design/colors';
import { BInputProps } from '@common/interfaces/components';

function BInput({ label, ...rest }: BInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...rest} style={styles.input} placeholder={label} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.disabled,
    minHeight: 40,
    padding: 8,
    fontSize: 15,
  },
  label: {
    fontSize: 10,
    paddingLeft: 8,
  },
  container: {
    margin: 5,
  },
});

export default BInput;
