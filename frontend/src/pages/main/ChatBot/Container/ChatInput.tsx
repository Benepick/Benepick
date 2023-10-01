import React, { useState } from 'react';
import SvgIcons from '@common/assets/SvgIcons';
import colors from '@common/design/colors';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

function ChatInput({
  inputProps,
  touchableOpacityProps,
}: {
  inputProps: TextInputProps;
  touchableOpacityProps: TouchableOpacityProps;
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput {...inputProps} style={styles.inputBox} />
      <TouchableOpacity {...touchableOpacityProps} style={styles.button} activeOpacity={0.8}>
        <SvgIcons name="Send" fill={colors.white} size={40} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 28,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    padding: 3,
  },
  inputBox: {
    flex: 1,
    height: 60,
    padding: 20,
    color: colors.black,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: colors.main,
    borderRadius: 50,
  },
});

export default ChatInput;
