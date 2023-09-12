import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Button, View } from 'react-native';

import Home from '@pages/main/Home/Home';
import Consumption from '@pages/main/Consumption/Consumption';
import Benefit from '@pages/main/Benefit/Benefit';
import ChatBot from '@pages/main/ChatBot/ChatBot';
import CreditCard from '@pages/main/CreditCard/CreditCard';

import colors from '@common/design/colors';
import IconButton from '@common/components/IconButton';
import AlarmButton from '@common/components/AlarmButton';
import SvgIcons from '@common/assets/SvgIcons';
import { Spacing } from '@common/components/Spacing';
import { RootStackParamList } from '@interfaces/navigation';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Button onPress={() => navigation.push('BottomTab')} title="Go Home" color="#000000" />
        ),
        headerRight: () => (
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <AlarmButton onPress={() => navigation.push('Notification')} isAlarmed={false} />
            <Spacing rem="0.5" dir="row" />
            <IconButton onPress={() => navigation.push('SettingStack')} name="Menu" />
            <Spacing rem="0.5" dir="row" />
          </View>
        ),
        tabBarStyle: {
          backgroundColor: colors.white,
        },
        headerTitle: '',
        headerStyle: { backgroundColor: 'none' },
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SvgIcons name="Home" fill={colors.main} size={30} />
            ) : (
              <SvgIcons name="Home" fill={colors.disabled} size={30} />
            ),
        }}
      />
      <Tab.Screen
        name="CreditCard"
        component={CreditCard}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SvgIcons name="Card" fill={colors.main} size={30} />
            ) : (
              <SvgIcons name="Card" fill={colors.disabled} size={30} />
            ),
        }}
      />
      <Tab.Screen
        name="Benefit"
        component={Benefit}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SvgIcons name="Diamond" fill={colors.main} size={30} />
            ) : (
              <SvgIcons name="Diamond" fill={colors.disabled} size={30} />
            ),
        }}
      />
      <Tab.Screen
        name="Consumption"
        component={Consumption}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SvgIcons name="Payment" fill={colors.main} size={30} />
            ) : (
              <SvgIcons name="Payment" fill={colors.disabled} size={30} />
            ),
        }}
      />
      <Tab.Screen
        name="ChatBot"
        component={ChatBot}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SvgIcons name="ChatBot" fill={colors.main} size={30} />
            ) : (
              <SvgIcons name="ChatBot" fill={colors.disabled} size={30} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
