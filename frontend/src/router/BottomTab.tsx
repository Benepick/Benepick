import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native';

import Home from '../pages/Home/Home';
import CreditCard from '../pages/CreditCard/CreditCard';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button onPress={() => navigation.push('BottomTab')} title="Go Home" color="#000000" />
          ),
          headerRight: () => (
            <Button onPress={() => navigation.push('Alarm')} title="Alarm" color="#000000" />
          ),
        })}
      />
      <Tab.Screen
        name="CreditCard"
        component={CreditCard}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button onPress={() => navigation.push('BottomTab')} title="Go Home" color="#000000" />
          ),
          headerRight: () => (
            <Button onPress={() => navigation.push('Alarm')} title="Alarm" color="#000000" />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
