import React from 'react';
import { Text, View, Button } from 'react-native';

import Consumption from './Container/Consumption';
import Recommendation from './Container/Recommendation';

function Home({ navigation }) {
  return (
    <View>
      <Recommendation />
      <Consumption />
    </View>
  );
}

export default Home;
