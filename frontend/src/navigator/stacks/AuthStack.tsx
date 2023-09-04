import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from '../../pages/Start/Start';
import Terms from '../../pages/Terms/Terms';
import PersonalAuth from '../../pages/PersonalAuth/PersonalAuth';
import PhoneAuth from '../../pages/PhoneAuth/PhoneAuth';
import PasswordSetting from '../../pages/auth/PasswordSetting/PasswordSetting';
import SelectCompany from '../../pages/SelectCompany/SelectCompany';
import SelectCard from '../../pages/SelectCard/SelectCard';
import LogIn from '../../pages/LogIn/LogIn';
import RegistrationComplete from '../../pages/RegistrationComplete/RegistrationComplete';

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
      <Stack.Screen name="PasswordSetting" component={PasswordSetting} />
      <Stack.Screen name="SelectCompany" component={SelectCompany} />
      <Stack.Screen name="SelectCard" component={SelectCard} />
      <Stack.Screen name="RegistrationComplete" component={RegistrationComplete} />
      <Stack.Screen name="LogIn" component={LogIn} />
    </Stack.Navigator>
  );
};

export default AuthStack;
