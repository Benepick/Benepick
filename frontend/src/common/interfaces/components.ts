import React from 'react';
import { GestureResponderEvent } from 'react-native';
import * as Icons from '@common/assets/icons/iconIndex';

export interface AlarmButtonProps {
  isAlarmed: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export interface IconButtonProps {
  name: keyof typeof Icons;
  onPress?: (event: GestureResponderEvent) => void;
  size?: number;
}

export interface SubmitButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export interface BTextProps {
  children: React.ReactNode;
  type?: 'h1' | 'h2' | 'h3' | 'bold' | 'p';
  color?: string;
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

export interface CompanySelectBoxProps {
  name: string;
  size: number;
  state: string;
  image: string;
}
