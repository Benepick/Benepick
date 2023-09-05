import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, View } from 'react-native';

import Home from '@pages/main/Home/Home';
import Consumption from '@pages/main/Consumption/Consumption';
import Benefit from '@pages/main/Benefit/Benefit';
import ChatBot from '@pages/main/ChatBot/ChatBot';
import CreditCard from '@pages/main/CreditCard/CreditCard';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button onPress={() => navigation.push('BottomTab')} title="Go Home" color="#000000" />
          ),
          headerRight: () => (
            <View>
              <Button onPress={() => navigation.push('Alarm')} title="Alarm" color="#000000" />
              <Button
                onPress={() => navigation.push('SettingStack')}
                title="SettingStack"
                color="#000000"
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="CreditCard"
        component={CreditCard}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button onPress={() => navigation.push('BottomTab')} title="Go Home" color="#000000" />
          ),
          headerRight: () => (
            <View>
              <Button onPress={() => navigation.push('Alarm')} title="Alarm" color="#000000" />
              <Button
                onPress={() => navigation.push('SettingStack')}
                title="SettingStack"
                color="#000000"
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Consumption"
        component={Consumption}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button onPress={() => navigation.push('BottomTab')} title="Go Home" color="#000000" />
          ),
          headerRight: () => (
            <View>
              <Button onPress={() => navigation.push('Alarm')} title="Alarm" color="#000000" />
              <Button
                onPress={() => navigation.push('SettingStack')}
                title="SettingStack"
                color="#000000"
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Benefit"
        component={Benefit}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button onPress={() => navigation.push('BottomTab')} title="Go Home" color="#000000" />
          ),
          headerRight: () => (
            <View>
              <Button onPress={() => navigation.push('Alarm')} title="Alarm" color="#000000" />
              <Button
                onPress={() => navigation.push('SettingStack')}
                title="SettingStack"
                color="#000000"
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="ChatBot"
        component={ChatBot}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button onPress={() => navigation.push('BottomTab')} title="Go Home" color="#000000" />
          ),
          headerRight: () => (
            <View>
              <Button onPress={() => navigation.push('Alarm')} title="Alarm" color="#000000" />
              <Button
                onPress={() => navigation.push('SettingStack')}
                title="SettingStack"
                color="#000000"
              />
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
