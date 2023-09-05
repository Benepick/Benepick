import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CheckPassword from '@pages/setting/CheckPassword/CheckPassword';
import ChangePassword from '@pages/setting/ChangePassword/ChangePassword';

import IconButton from '@common/components/IconButton';

const Stack = createNativeStackNavigator();

const PasswordStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <IconButton onPress={() => navigation.goBack()} name="Back" />,
        headerTitle: '',
      })}
    >
      <Stack.Screen name="CheckPassword" component={CheckPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default PasswordStack;
