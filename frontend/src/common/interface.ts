import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Start: undefined;
  Alarm: undefined;
  Test: undefined;
  BottomTab: undefined;
  CreditCard: undefined;
};

export interface HomeNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export interface StartNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Start'>;
}

export interface CreditCardNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreditCard'>;
}
