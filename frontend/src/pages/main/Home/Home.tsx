import React from 'react';
import { Text, View, Button } from 'react-native';

import MonthlyConsumption from './Container/MonthlyConsumption';
import Recommendation from './Container/Recommendation';
import { HomeNavigationProps } from '@common/interfaces/navigation';

function Home({ navigation }: HomeNavigationProps) {
  return (
    <View>
      <Recommendation />
      <MonthlyConsumption
        image={require('@common/assets/images/cardImg.png')}
        money="10000원"
        benefit="10000원"
      />
    </View>
  );
}

export default Home;
