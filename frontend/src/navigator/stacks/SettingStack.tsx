import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Setting from '@pages/setting/Setting/Setting';
import CompanyStack from './CompanyStack';
import PasswordStack from './PasswordStack';

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CompanyStack"
        component={CompanyStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PasswordStack"
        component={PasswordStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
