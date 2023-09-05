import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import colors from '@common/design/colors';

import Alarm from '@pages/Alarm/Alarm';
import BottomTab from './stacks/BottomTab';
import Test from '@pages/Test/Test';
import AuthStack from './stacks/AuthStack';
import SettingStack from './stacks/SettingStack';
import CreditCardDetail from '@pages/main/CreditCardDetail/CreditCardDetail';

const Stack = createNativeStackNavigator();

const BTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.backgroundColor,
  },
};

const RootStack = () => {
  return (
    <NavigationContainer theme={BTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
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
        />
        <Stack.Screen
          name="CreditCardDetail"
          component={CreditCardDetail}
          options={{
            headerShown: true,
          }}
        />
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
        <Stack.Screen
          name="SettingStack"
          component={SettingStack}
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
