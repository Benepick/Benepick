import React, { ReactNode } from 'react';
import { GestureResponderEvent, TextInputProps, TouchableOpacityProps } from 'react-native';
import * as Icons from '@common/assets/icons/iconIndex';

export interface AlarmButtonProps extends TouchableOpacityProps {
  isAlarmed: boolean;
}

export interface IconButtonProps {
  name: keyof typeof Icons;
  onPress?: (event: GestureResponderEvent) => void;
  size?: number;
}

export interface SubmitButtonProps extends TouchableOpacityProps {
  title: string;
}

export interface BTextProps {
  children: ReactNode;
  type?: 'h1' | 'h2' | 'h3' | 'bold' | 'p';
  color?: string;
}

export interface BInputProps extends TextInputProps {
  label?: string;
}
