import React from 'react';
import { View } from 'react-native';

import { CardProgressSectionProps } from 'interfaces/common';
import BText from '@common/components/BText';
import colors from '@common/design/colors';

function CardProgressSection({ section, isFill }: CardProgressSectionProps) {
  return (
    <View
      style={{
        width: '25%',
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: isFill ? colors.main : colors.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '-1%',
        zIndex: 1,
      }}
    >
      <BText type="bold" color={isFill ? colors.white : colors.disabled} style={{ fontSize: 12 }}>
        {section}
      </BText>
    </View>
  );
}

export default CardProgressSection;
