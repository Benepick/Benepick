import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native';

import Home from '../pages/Home/Home';

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
            <Button onPress={() => navigation.push('Alarm')} title="Alarm" color="#000000" />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
