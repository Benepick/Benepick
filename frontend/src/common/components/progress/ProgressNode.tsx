import colors from '@common/design/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ProgressNodeProps } from 'interfaces/common';
import Node from './childs/Node';
import Branch from './childs/Branch';

function ProgressNode({ page, size, current }: ProgressNodeProps) {
  const nodes = [];
  nodes.push(<Node size={size} color={colors.main} num={1} key={0} />);
  for (let i = 1; i < page; i++) {
    nodes.push(
      <View style={styles.flexBox} key={i}>
        <Branch size={size} color={current >= i + 1 ? colors.main : colors.disabled} />
        <Node size={size} color={current >= i + 1 ? colors.main : colors.disabled} num={i + 1} />
      </View>,
    );
  }
  return <View style={styles.flexBox}>{nodes}</View>;
}

const styles = StyleSheet.create({
  flexBox: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
});

export default ProgressNode;
