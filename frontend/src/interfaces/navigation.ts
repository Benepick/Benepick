import { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Navigation Interface

export type RootStackParamList = {
  // Auth Stack
  AuthStack: undefined;

  Start: undefined;
  Terms: { isRead: boolean };
  ReadTerms: undefined;
  PersonalAuth: undefined;
  PhoneAuth: {
    userData: PhoneAuthParams;
  };
  SetPassword: {
    userData: SetPasswordParams;
  };
  SelectCompany: undefined;
  SelectCard: undefined;
  RegistrationComplete: undefined;

  Login: undefined;

  // Bottom Tab
  BottomTab: undefined;

  Home: undefined;
  CreditCard: undefined;
  CreditCardDetail: { cardId: number };
  Consumption: undefined;
  Benefit: { place: string };
  ChatBot: undefined;

  // Setting Stack
  SettingStack: undefined;

  Setting: undefined;
  CompanyStack: undefined;
  CompanyManagement: undefined;
  CompanyConnection: undefined;
  PasswordStack: undefined;
  CheckPassword: undefined;
  ChangePassword: undefined;

  CheckPasswordToAutoLogin: undefined;

  // 알림창

  Notification: undefined;

  Test: undefined;
};

// Auth Stack

export interface StartNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Start'>;
}

export interface TermsNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Terms'>;
  route: RouteProp<RootStackParamList, 'Terms'>;
}

export interface ReadTermsNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReadTerms'>;
}

export interface PersonalAuthNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PersonalAuth'>;
}

export interface PhoneAuthNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PhoneAuth'>;
  route: RouteProp<RootStackParamList, 'PhoneAuth'>;
}

export interface SetPasswordNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SetPassword'>;
  route: RouteProp<RootStackParamList, 'SetPassword'>;
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

export interface LoginNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
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
  route: RouteProp<RootStackParamList, 'Benefit'>;
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

export interface NotificationNavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Notification'>;
}

export interface CheckPasswordToAutoLoginProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CheckPasswordToAutoLogin'>;
}

// prop data

interface PhoneAuthParams {
  userName: string;
  userSocialNumber: string;
  userGenderAndGenerationCode: string;
}

interface SetPasswordParams {
  userName: string;
  userSocialNumber: string;
  userGenderAndGenerationCode: string;
  userPhoneNumber: string;
}
