import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';

import Start from '../pages/Start/Start';
import Alarm from '../pages/Alarm/Alarm';
import BottomTab from './BottomTab';
import Test from '../pages/Test/Test';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Alarm"
          component={Alarm}
          options={({ navigation }) => ({
            headerBackVisible: false,
            headerRight: () => (
              <Button onPress={() => navigation.goBack()} title="뒤로가기" color="#000000" />
            ),
          })}
        />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
