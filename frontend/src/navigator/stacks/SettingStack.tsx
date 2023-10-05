import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Setting from '@pages/setting/Setting/Setting';
import CompanyStack from './CompanyStack';
import PasswordStack from './PasswordStack';

import IconButton from '@common/components/IconButton';
import { RootStackParamList } from '@interfaces/navigation';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import CheckPasswordToAutoLogin from '@pages/setting/Setting/Container/CheckPasswordToAutoLogin';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: () => (
          <BText type="h3" color={colors.black}>
            메뉴
          </BText>
        ),
      }}
    >
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton onPress={() => navigation.push('BottomTab')} name="Close" />
          ),
          headerBackVisible: false,
        })}
      />
      <Stack.Screen
        name="CheckPasswordToAutoLogin"
        component={CheckPasswordToAutoLogin}
        options={{ headerShadowVisible: false, headerTitle: '' }}
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
