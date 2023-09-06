import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import colors from '@common/design/colors';
import { BInputProps } from '@common/interfaces/components';

function BInput({ label, ...rest }: BInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(0)).current;

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
      fontWeight: 'bold',
    },
    container: {
      margin: 8,
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: isFocused ? colors.main : colors.disabled,
      width: '95%',
      position: 'absolute',
      bottom: 10,
      left: 10,
    },
  });

  return (
    <View style={styles.container}>
      {isFocused && <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>}
      <TextInput
        {...rest}
        style={styles.input}
        placeholder={isFocused ? '' : label}
        onFocus={() => setIsFocused(true)}
      />
      <View style={styles.hr}></View>
    </View>
  );
}

export default BInput;
