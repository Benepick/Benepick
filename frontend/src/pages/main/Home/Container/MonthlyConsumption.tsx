import React from 'react';
import { MonthlyConsumptionProps } from './interfaces';

import BText from '@common/components/BText';
import { Image, StyleSheet, View } from 'react-native';
import { Spacing } from '../../../../common/components/Spacing';
import colors from '@common/design/colors';

function MonthlyConsumption({ image, money, benefit }: MonthlyConsumptionProps) {
  const styles = StyleSheet.create({
    container: {
      margin: 10,
      justifyContent: 'center',
    },
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
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <BText type="h2">이번달</BText>
        <Spacing rem="0.5" dir="row" />
        <BText type="h2" color={colors.main}>
          소비
        </BText>
      </View>

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

export default MonthlyConsumption;
