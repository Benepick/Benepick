import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreditCard from '../../pages/CreditCard/CreditCard';
import CreditCardDetail from '../../pages/CreditCard/CreditCardDetail';

const Stack = createNativeStackNavigator();

const CreditCardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreditCard"
        component={CreditCard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreditCardDetail"
        component={CreditCardDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CreditCardStack;
