import React from 'react';
import { View } from 'react-native';

import { BranchProps } from 'interfaces/common';

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
