import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '@common/design/colors';

import MonthlyConsumption from './Container/MonthlyConsumption';
import Recommendation from './Container/Recommendation';
import { HomeNavigationProps } from '@common/interfaces/navigation';
import { Spacing } from '@common/components/Spacing';
import { globalStyles } from '@common/design/globalStyles';
import BText from '@common/components/BText';

function Home({ navigation }: HomeNavigationProps) {
  return (
    <View style={globalStyles.container}>
      <Recommendation />
      <Spacing />
      <View style={styles.title}>
        <BText type="h2">이번달</BText>
        <BText type="h2" color={colors.main}>
          {' '}
          소비
        </BText>
      </View>
      <Spacing rem="0.25" />
      <MonthlyConsumption
        image={require('@common/assets/images/cardImg.png')}
        money="10000원"
        benefit="10000원"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Home;
