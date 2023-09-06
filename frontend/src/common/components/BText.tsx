import React from 'react';
import { Text } from 'react-native';
import { BTextProps } from '@common/interfaces/components';
import { globalStyles } from '@common/design/globalStyles';
import colors from '@common/design/colors';

function BText({ children, type, color = colors.black, style, ...rest }: BTextProps) {
  const stylesMap = {
    h1: globalStyles.h1,
    h2: globalStyles.h2,
    h3: globalStyles.h3,
    bold: globalStyles.bold,
    p: globalStyles.p,
  };

  const textStyle = [stylesMap[type || 'p'], color ? { color } : null, style];

  return (
    <Text style={textStyle} {...rest}>
      {children}
    </Text>
  );
}

export default BText;
