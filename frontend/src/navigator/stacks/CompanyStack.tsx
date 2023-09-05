import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CompanyConnection from '@pages/setting/CompanyConnection/CompanyConnection';
import CompanyManagement from '@pages/setting/CompanyConnection/CompanyManagement';

const Stack = createNativeStackNavigator();

const CompanyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CompanyConnection"
        component={CompanyConnection}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="CompanyManagement" component={CompanyManagement} />
    </Stack.Navigator>
  );
};

export default CompanyStack;
