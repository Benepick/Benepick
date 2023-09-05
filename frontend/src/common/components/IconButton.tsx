import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import SvgIcons from '@common/assets/SvgIcons';
import { IconButtonProps } from '../interfaces/components';
import colors from '@common/design/colors';

function IconButton({ onPress, name, size }: IconButtonProps) {
  const [iconColor, setIconColor] = useState(colors.disabled);
  const handlePress = () => {
    setIconColor(iconColor === colors.disabled ? colors.main : colors.disabled);

    if (onPress) {
      onPress;
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <SvgIcons name={name} size={size} fill={iconColor} />
    </TouchableOpacity>
  );
}

export default IconButton;
