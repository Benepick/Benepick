import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CompanyConnection from '@pages/setting/CompanyConnection/CompanyConnection';
import CompanyManagement from '@pages/setting/CompanyConnection/CompanyManagement';

import IconButton from '@common/components/IconButton';
import { RootStackParamList } from '@interfaces/navigation';
import colors from '@common/design/colors';
import BText from '@common/components/BText';

const Stack = createNativeStackNavigator<RootStackParamList>();

const CompanyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CompanyConnection"
        component={CompanyConnection}
        options={({ navigation }) => ({
          headerLeft: () => <IconButton onPress={() => navigation.goBack()} name="Back" />,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerTitle: () => (
            <BText type="h3" color={colors.black}>
              자산연결 관리
            </BText>
          ),
        })}
      />
      <Stack.Screen
        name="CompanyManagement"
        component={CompanyManagement}
        options={({ navigation }) => ({
          headerLeft: () => <IconButton onPress={() => navigation.goBack()} name="Back" />,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerTitle: () => null,
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default CompanyStack;
