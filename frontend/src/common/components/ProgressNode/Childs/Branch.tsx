import React from 'react';
import { View } from 'react-native';

import { BranchProps } from '@common/interfaces/components';

function Branch({ size, color }: BranchProps) {
  return (
    <View
      style={{
        width: size / 4,
        height: size / 8,
        backgroundColor: color,
      }}
    />
  );
}

export default Branch;
