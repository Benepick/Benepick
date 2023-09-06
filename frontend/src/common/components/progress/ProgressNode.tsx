import colors from '@common/design/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ProgressNodeProps } from '@common/interfaces/components';
import Node from './childs/Node';
import Branch from './childs/Branch';

function ProgressNode({ page, size, current }: ProgressNodeProps) {
  const nodes = [];
  nodes.push(<Node size={size} color={colors.main} num={1} />);
  for (let i = 0; i < page - 1; i++) {
    nodes.push(
      <View style={styles.flexBox} key={i}>
        <Branch size={size} color={current >= i + 2 ? colors.main : colors.disabled} />
        <Node size={size} color={current >= i + 2 ? colors.main : colors.disabled} num={i + 2} />
      </View>,
    );
  }
  return <View style={styles.flexBox}>{nodes}</View>;
}

export default ProgressNode;

const styles = StyleSheet.create({
  flexBox: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
});
