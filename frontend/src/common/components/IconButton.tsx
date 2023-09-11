import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import SvgIcons from '@common/assets/SvgIcons';
import { IconButtonProps } from '@interfaces/common';
import colors from '@common/design/colors';

function IconButton({ name, size = 30, onPress }: IconButtonProps) {
  const [iconColor, setIconColor] = useState(colors.disabled);

  return (
    <TouchableOpacity onPress={onPress}>
      <SvgIcons name={name} size={size} fill={iconColor} />
    </TouchableOpacity>
  );
}

export default IconButton;
