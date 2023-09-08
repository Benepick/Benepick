import React from 'react';
import { MonthlyConsumptionProps } from '@interfaces/home';

import BText from '@common/components/BText';
import { Image, StyleSheet, View } from 'react-native';
import { Spacing } from '@common/components/Spacing';
import colors from '@common/design/colors';

function MonthlyConsumption({ image, money, benefit }: MonthlyConsumptionProps) {
  return (
    <View>
      <View style={styles.box}>
        <Image style={styles.image} source={image} />
        <Spacing rem="1.5" dir="row" />
        <View style={{ width: '75%', justifyContent: 'center' }}>
          <View style={styles.description}>
            <BText type="bold">사용금액</BText>
            <BText>{money}</BText>
          </View>
          <Spacing rem="0.5" />
          <View style={styles.description}>
            <BText type="bold">받은혜택</BText>
            <BText>{benefit}</BText>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    display: 'flex',
    flexDirection: 'row',
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: 20,
  },
  image: {
    maxWidth: '15%',
    aspectRatio: 1 / 1.58,
  },
});

export default MonthlyConsumption;
