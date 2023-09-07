import React, { memo } from 'react';
import { View, ViewStyle } from 'react-native';

interface SpacingProps {
  rem?: '0.25' | '0.5' | '1' | '1.5' | '2' | '2.5' | '3' | '3.5' | '4' | '4.5' | '5';
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
