import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import SvgIcons from '@common/assets/SvgIcons';
import { IconButtonProps } from '@interfaces/common';
import colors from '@common/design/colors';

function IconButton({ name, size = 30, onPress, color = colors.disabled }: IconButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <SvgIcons name={name} size={size} fill={color} />
    </TouchableOpacity>
  );
}

export default IconButton;
