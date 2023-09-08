import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import { CategoryTextProps } from '@interfaces/consumption';

function CategoryText({ category, value }: CategoryTextProps) {
  return (
    <View>
      <Spacing rem="0.5" />
      <View style={styles.description}>
        <BText type="bold">{category}</BText>
        <BText>{value}</BText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CategoryText;
