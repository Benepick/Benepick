import React from 'react';
import { Text, View, Button } from 'react-native';

import Consumption from './Container/Consumption';
import Recommendation from './Container/Recommendation';
import { HomeNavigationProps } from '../../common/interfaces/navigation';

function Home({ navigation }: HomeNavigationProps) {
  return (
    <View>
      <Button onPress={() => navigation.push('Test')} title="Test" color="#000000"></Button>
      <Recommendation />
      <Consumption />
    </View>
  );
}

export default Home;
