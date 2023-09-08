import React from 'react';
import { StyleSheet, View } from 'react-native';

import MonthlyConsumption from './Container/MonthlyConsumption';
import Recommendation from './Container/Recommendation';
import { HomeNavigationProps } from '@common/interfaces/navigation';
import { Spacing } from '@common/components/Spacing';
import { globalStyles } from '@common/design/globalStyles';

function Home({ navigation }: HomeNavigationProps) {
  return (
    <View style={globalStyles.container}>
      <Recommendation />
      <Spacing />
      <MonthlyConsumption
        image={require('@common/assets/images/cardImg.png')}
        money="10000원"
        benefit="10000원"
      />
    </View>
  );
}

export default Home;
