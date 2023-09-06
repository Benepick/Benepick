import React from 'react';
import { TouchableOpacity, TouchableHighlight } from 'react-native';
import { AlarmButtonProps } from '../interfaces/components';
import AlarmOn from '@common/assets/icons/AlarmOn.svg';
import AlarmOff from '@common/assets/icons/AlarmOff.svg';

function AlarmButton({ isAlarmed, ...rest }: AlarmButtonProps) {
  return <TouchableOpacity {...rest}>{isAlarmed ? <AlarmOn /> : <AlarmOff />}</TouchableOpacity>;
}

export default AlarmButton;
