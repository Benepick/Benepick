import colors from '@common/design/colors';
import React from 'react';
import { View } from 'react-native';

import {
  BranchSize,
  NodeSetProps,
  NodeSize,
  ProgressNodeProps,
} from '@common/interfaces/components';
import BText from './BText';

function ProgressNode({ page, size, current }: ProgressNodeProps) {
  const nodes = [];
  nodes.push(<Node size={size} color={colors.main} num={1} />);
  for (let i = 0; i < page - 1; i++) {
    nodes.push(<NodeSet size={size} active={current >= i + 2} num={i + 2} />);
  }
  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>{nodes}</View>
  );
}

function Node({ size, color, num }: NodeSize) {
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
function Branch({ size, color }: BranchSize) {
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
function NodeSet({ size, active, num }: NodeSetProps) {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Branch size={size} color={active ? colors.main : colors.disabled} />
      <Node size={size} color={active ? colors.main : colors.disabled} num={num} />
    </View>
  );
}

export default ProgressNode;
