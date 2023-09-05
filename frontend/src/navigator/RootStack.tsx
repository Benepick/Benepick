import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';

import Alarm from '@pages/Alarm/Alarm';
import BottomTab from './stacks/BottomTab';
import Test from '@pages/Test/Test';
import AuthStack from './stacks/AuthStack';
import SettingStack from './stacks/SettingStack';

import colors from '@common/design/colors';

import CreditCardDetail from '@pages/main/CreditCardDetail/CreditCardDetail';
import IconButton from '@common/components/IconButton';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.backgroundColor,
    },
  };

  return (
    <NavigationContainer theme={theme}>
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
            headerRight: () => <IconButton onPress={() => navigation.goBack()} name="Close" />,
          })}
        />
        <Stack.Screen
          name="SettingStack"
          component={SettingStack}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
