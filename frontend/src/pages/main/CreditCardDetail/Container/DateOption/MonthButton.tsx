import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import { MonthButtonProps } from '@interfaces/creditCard';

function MonthButton({ month, isSelected, onSelect, isDisabled }: MonthButtonProps) {
  const styles = StyleSheet.create({
    box: {
      margin: 5,
      width: 100,
      aspectRatio: 1.5,
      borderStyle: 'solid',
      borderColor: isSelected && !isDisabled ? colors.main : colors.disabled,
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDisabled ? colors.disabled : 'transparent',
    },
    text: {
      color: isDisabled ? colors.white : isSelected ? colors.main : colors.black,
    },
  });

  return (
    <TouchableOpacity onPress={isDisabled ? undefined : onSelect} disabled={isDisabled}>
      <View style={styles.box}>
        <BText type="p" style={styles.text}>
          {month}월
        </BText>
      </View>
    </TouchableOpacity>
  );
}

export default MonthButton;
