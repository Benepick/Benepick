import React, { ReactNode } from 'react';
import {
  GestureResponderEvent,
  TextInputProps,
  TouchableOpacityProps,
  TextProps,
  StyleProp,
  TextStyle,
  TouchableHighlightProps,
} from 'react-native';
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

export interface RequestButtonProps extends TouchableOpacityProps {
  title: string;
}

export interface BTextProps extends TextProps {
  children: ReactNode;
  type?: 'h1' | 'h2' | 'h3' | 'bold' | 'p';
  color?: string;
  style?: StyleProp<TextStyle>;
}

export interface BInputProps extends TextInputProps {
  label?: string;
}
export interface NodeProps {
  size: number;
  color: string;
  num: number;
}

export interface BranchProps {
  size: number;
  color: string;
}

export interface ProgressNodeProps {
  page: number;
  size: number;
  current: number;
}

export interface CompanySelectBoxProps extends TouchableHighlightProps {
  name: string;
  size: number;
  state: string;
  image: string;
  isSelected: boolean;
}

export interface BSwitchProps extends TouchableHighlightProps {
  size: number;
  value: boolean;
}
