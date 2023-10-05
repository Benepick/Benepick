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
  Image,
} from 'react-native';

interface ChatInputProps {
  inputProps: TextInputProps;
  touchableOpacityProps: TouchableOpacityProps;
  isLoading: boolean; // 추가된 isLoading prop
}

function ChatInput({ inputProps, touchableOpacityProps, isLoading }: ChatInputProps) {
  return (
    <View style={styles.inputContainer}>
      <TextInput {...inputProps} style={styles.inputBox} />
      {!isLoading && (
        <TouchableOpacity {...touchableOpacityProps} style={styles.button} activeOpacity={0.8}>
          <SvgIcons name="Send" fill={colors.white} size={40} />
        </TouchableOpacity>
      )}
      {isLoading && (
        <Image
          source={require('@common/assets/images/DualBall.gif')}
          style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50 }}
        />
      )}
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
