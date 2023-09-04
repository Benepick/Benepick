import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Navigation Interface

type RootStackParamList = {
  Start: undefined;
  Terms: undefined;
  PersonalAuth: undefined;
  PhoneAuth: undefined;
  PasswordSetting: undefined;
  SelectCompany: undefined;
  SelectCard: undefined;
  RegistrationComplete: undefined;

  LogIn: undefined;

  BottomTab: undefined;

  Home: undefined;

  CreditCard: undefined;
  CreditCardDetail: undefined;

  Test: undefined;
};

// Auth Stack

export interface StartNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Start'>;
}

export interface TermsNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Terms'>;
}

export interface PersonalAuthNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PersonalAuth'>;
}

export interface PhoneAuthNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PhoneAuth'>;
}

export interface PasswordSettingNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PasswordSetting'>;
}

export interface SelectCompanyNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SelectCompany'>;
}

export interface SelectCardNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SelectCard'>;
}

export interface RegistrationCompleteNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RegistrationComplete'>;
}

export interface LogInNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LogIn'>;
}

// Bottom Tab

export interface HomeNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export interface CreditCardNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreditCard'>;
}

export interface CreditCardDetailNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreditCardDetail'>;
}

// Setting Stack
