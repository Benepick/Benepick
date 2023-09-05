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
