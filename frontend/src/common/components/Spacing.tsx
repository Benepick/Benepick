import React, { memo } from 'react';
import { View, ViewStyle } from 'react-native';

interface SpacingProps {
  rem?: string;
  dir?: 'row' | 'col';
}

export const Spacing = memo<SpacingProps>(function Spacing({ rem = '1', dir = 'col' }) {
  const size = Number(rem) * 16; // 1rem = 16px as a base, adjust as needed

  const style: ViewStyle = {
    width: dir === 'row' ? size : undefined,
    height: dir === 'col' ? size : undefined,
  };

  return <View style={style} />;
});
