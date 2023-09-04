import { GestureResponderEvent } from 'react-native';

export interface AlarmButtonProps {
  isAlarmed: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}
