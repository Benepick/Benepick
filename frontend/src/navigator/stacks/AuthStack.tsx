import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from '@pages/auth/Start/Start';
import Terms from '@pages/auth/Terms/Terms';
import PersonalAuth from '@pages/auth/PersonalAuth/PersonalAuth';
import PhoneAuth from '@pages/auth/PhoneAuth/PhoneAuth';
import SetPassword from '@pages/auth/SetPassword/SetPassword';
import SelectCompany from '@pages/auth/SelectCompany/SelectCompany';
import SelectCard from '@pages/auth/SelectCard/SelectCard';
import LogIn from '@pages/auth/LogIn/LogIn';
import RegistrationComplete from '@pages/auth/RegistrationComplete/RegistrationComplete';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start"
        component={Start}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="PersonalAuth" component={PersonalAuth} />
      <Stack.Screen name="PhoneAuth" component={PhoneAuth} />
      <Stack.Screen name="SetPassword" component={SetPassword} />
      <Stack.Screen name="SelectCompany" component={SelectCompany} />
      <Stack.Screen name="SelectCard" component={SelectCard} />
      <Stack.Screen name="RegistrationComplete" component={RegistrationComplete} />
      <Stack.Screen name="LogIn" component={LogIn} />
    </Stack.Navigator>
  );
};

export default AuthStack;
