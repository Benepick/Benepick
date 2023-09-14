import colors from '@common/design/colors';
import { PasswordInputProps } from '@interfaces/auth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

function PasswordInput({ enteredLength }: PasswordInputProps) {
  const array = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.row}>
      {array.map((num) => (
        <View style={enteredLength >= num ? styles.filled : styles.default} key={num}></View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  default: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.backgroundColor,
    margin: 7,
  },
  filled: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.main,
    margin: 7,
  },
});

export default PasswordInput;
