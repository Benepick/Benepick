import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RouteProp } from '@react-navigation/native';
import { CardIdProps } from './creditCard';

// Navigation Interface

type RootStackParamList = {
  // Auth Stack
  Start: undefined;
  Terms: undefined;
  ReadTerms: undefined;
  PersonalAuth: undefined;
  PhoneAuth: undefined;
  SetPassword: undefined;
  SelectCompany: undefined;
  SelectCard: undefined;
  RegistrationComplete: undefined;

  LogIn: undefined;

  // Bottom Tab
  BottomTab: undefined;

  Home: undefined;
  CreditCard: undefined;
  CreditCardDetail: { params: CardIdProps };
  Consumption: undefined;
  Benefit: undefined;
  ChatBot: undefined;

  // Setting Stack
  Setting: undefined;
  CompanyStack: undefined;
  CompanyManagement: undefined;
  CompanyConnection: undefined;
  PasswordStack: undefined;
  CheckPassword: undefined;
  ChangePassword: undefined;

  Test: undefined;
};

// Auth Stack

export interface StartNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Start'>;
}

export interface TermsNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Terms'>;
}

export interface ReadTermsNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReadTerms'>;
}

export interface PersonalAuthNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PersonalAuth'>;
}

export interface PhoneAuthNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PhoneAuth'>;
}

export interface SetPasswordNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SetPassword'>;
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
  navigation?: NativeStackNavigationProp<RootStackParamList, 'CreditCardDetail'>;
  route: RouteProp<RootStackParamList, 'CreditCardDetail'>;
}

export interface ConsumptionNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Consumption'>;
}

export interface BenefitNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Benefit'>;
}

export interface ChatBotNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ChatBot'>;
}

// Setting Stack

export interface SettingNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Setting'>;
}

export interface CompanyManagementNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CompanyManagement'>;
}

export interface CompanyConnectionNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CompanyConnection'>;
}

export interface CheckPasswordNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CheckPassword'>;
}

export interface ChangePasswordNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ChangePassword'>;
}
