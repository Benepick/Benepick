import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableHighlightProps } from 'react-native';
import { Text } from 'react-native-svg';
import BText from './BText';
import colors from '@common/design/colors';

interface FlatButtonProps extends TouchableHighlightProps {
  title: string;
}

function FlatButton({ title }: FlatButtonProps) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'transparent',
      padding: 12,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <TouchableHighlight style={styles.button} activeOpacity={0.2}>
      <BText type="bold" color={colors.disabled}>
        {title}
      </BText>
    </TouchableHighlight>
  );
}

export default FlatButton;
