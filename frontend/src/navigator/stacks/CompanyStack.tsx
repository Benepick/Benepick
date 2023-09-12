import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CompanyConnection from '@pages/setting/CompanyConnection/CompanyConnection';
import CompanyManagement from '@pages/setting/CompanyConnection/CompanyManagement';

import IconButton from '@common/components/IconButton';
import { RootStackParamList } from '@interfaces/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const CompanyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <IconButton onPress={() => navigation.goBack()} name="Back" />,
        headerTitle: '자산 연결 관리',
        headerTitleAlign: 'center',
      })}
    >
      <Stack.Screen name="CompanyConnection" component={CompanyConnection} />
      <Stack.Screen name="CompanyManagement" component={CompanyManagement} />
    </Stack.Navigator>
  );
};

export default CompanyStack;
