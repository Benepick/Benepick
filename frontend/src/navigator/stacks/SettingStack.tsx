import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Setting from '@pages/setting/Setting/Setting';
import CompanyStack from './CompanyStack';
import PasswordStack from './PasswordStack';
import IconButton from '@common/components/IconButton';

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '환경설정',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={({ navigation }) => ({
          headerRight: () => <IconButton onPress={() => navigation.goBack()} name="Close" />,
          headerBackVisible: false,
        })}
      />
      <Stack.Screen name="CompanyStack" component={CompanyStack} options={{ headerShown: false }} />
      <Stack.Screen
        name="PasswordStack"
        component={PasswordStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
