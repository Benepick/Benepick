import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import colors from '@common/design/colors';
import { BInputProps } from 'interfaces/common';

function BInput({ label, style, ...rest }: BInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(0)).current;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const labelStyle = {
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 10],
    }),
    paddingLeft: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 11],
    }),
  };

  const styles = StyleSheet.create({
    input: {
      width: '100%',
      minHeight: 50,
      padding: 8,
      fontSize: 15,
      margin: 2,
    },
    label: {
      position: 'absolute',
      color: isFocused ? colors.main : colors.disabled,
      fontFamily: 'IBMPlexSansKR-SemiBold',
    },
    container: {
      margin: 8,
      width: '95%',
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: isFocused ? colors.main : colors.disabled,
      width: '95%',
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
    },
  });

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (inputValue === '') {
      setIsFocused(false);
    }
    rest.onBlur?.(e);
  };
  return (
    <View style={[styles.container, style]}>
      {isFocused && <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>}
      <TextInput
        {...rest}
        style={styles.input}
        placeholder={isFocused ? '' : label}
        placeholderTextColor={colors.placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        onChangeText={(e) => {
          setInputValue(e);
          rest.onChangeText?.(e);
        }}
      />
      <View style={styles.hr}></View>
    </View>
  );
}

export default BInput;
