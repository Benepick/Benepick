import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TouchableHighlight, View, Image } from 'react-native';

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
          <TouchableHighlight
            onPress={() => navigation.push('BottomTab')}
            underlayColor={'transparent'}
          >
            <Image source={require('@common/assets/images/logo/navLogo.png')} />
          </TouchableHighlight>
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
          title: '홈',
          tabBarLabelStyle: {
            fontFamily: 'IBMPlexSansKR-SemiBold',
            marginTop: -5,
            marginBottom: -5,
          },
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
          title: '내 카드',
          tabBarLabelStyle: {
            fontFamily: 'IBMPlexSansKR-SemiBold',
            marginTop: -5,
            marginBottom: -5,
          },
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
          title: '혜택 찾기',
          tabBarLabelStyle: {
            fontFamily: 'IBMPlexSansKR-SemiBold',
            marginTop: -5,
            marginBottom: -5,
          },
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
          unmountOnBlur: true,
          title: '내 소비',
          tabBarLabelStyle: {
            fontFamily: 'IBMPlexSansKR-SemiBold',
            marginTop: -5,
            marginBottom: -5,
          },
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
          title: '챗봇',
          tabBarLabelStyle: {
            fontFamily: 'IBMPlexSansKR-SemiBold',
            marginTop: -5,
            marginBottom: -5,
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SvgIcons name="Whale" fill={colors.main} size={30} />
            ) : (
              <SvgIcons name="Whale" fill={colors.disabled} size={30} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
