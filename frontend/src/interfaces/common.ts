import React, { ReactNode } from 'react';
import {
  GestureResponderEvent,
  TextInputProps,
  TouchableOpacityProps,
  TextProps,
  StyleProp,
  TextStyle,
  TouchableHighlightProps,
  ViewStyle,
} from 'react-native';
import * as Icons from '@common/assets/icons/iconIndex';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

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
  color?: string;
}

export interface RequestButtonProps extends TouchableOpacityProps {
  title: string;
  color?: string;
}

export interface BTextProps extends TextProps {
  children: ReactNode;
  type?: 'h1' | 'h2' | 'h3' | 'bold' | 'p';
  color?: string;
  style?: StyleProp<TextStyle>;
}

export interface BInputProps extends TextInputProps {
  label?: string;
  style?: StyleProp<ViewStyle | TextStyle>;
}

export interface CardProgressSectionProps {
  sectionCount: number;
  currentSection: number;
}

export interface CardProgressBarProps {
  percent: number;
}

export interface CardProgressProps {
  sections: Array<number>;
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

export interface BCheckBoxProps extends TouchableHighlightProps {
  size: number;
  value: boolean;
}

export interface PageProps extends ViewProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface CoveringPointsProps {
  num: number;
  size: number;
}

export interface CategoryTextProps {
  category: string;
  value: string;
}

export interface LineProps {
  size: number;
  progress: number;
}
