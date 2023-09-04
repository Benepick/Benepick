import React from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { AlarmButtonProps } from '../interfaces/commonComponents';
import AlarmOn from '../assets/icons/AlarmOn.svg';
import AlarmOff from '../assets/icons/AlarmOff.svg';

function AlarmButton({ isAlarmed, onPress }: AlarmButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>{isAlarmed ? <AlarmOn /> : <AlarmOff />}</TouchableOpacity>
  );
}

export default AlarmButton;
