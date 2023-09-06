import React from 'react';
import { View } from 'react-native';

import { NodeProps } from '@common/interfaces/components';
import BText from '@common/components/BText';
import colors from '@common/design/colors';

function Node({ size, color, num }: NodeProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BText type="bold" color={colors.white}>
        {num}
      </BText>
    </View>
  );
}

export default Node;
