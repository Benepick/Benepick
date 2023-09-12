import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTab from './stacks/BottomTab';
import AuthStack from './stacks/AuthStack';
import SettingStack from './stacks/SettingStack';
import Notification from '@pages/Notification/Notification';
import CreditCardDetail from '@pages/main/CreditCardDetail/CreditCardDetail';
import Test from '@pages/Test/Test';

import colors from '@common/design/colors';
import IconButton from '@common/components/IconButton';

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
          name="Notification"
          component={Notification}
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
