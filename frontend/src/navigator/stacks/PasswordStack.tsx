import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CheckPassword from '@pages/setting/CheckPassword/CheckPassword';
import ChangePassword from '@pages/setting/ChangePassword/ChangePassword';

const Stack = createNativeStackNavigator();

const PasswordStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CheckPassword"
        component={CheckPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default PasswordStack;
