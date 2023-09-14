import React, { useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle, View } from 'react-native';

import { CardProgressSectionProps } from 'interfaces/common';
import BText from '@common/components/BText';
import colors from '@common/design/colors';

function CardProgressSection({ section, isFill }: CardProgressSectionProps) {
  const [layout, setLayout] = useState<LayoutRectangle>();

  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  let width = 0;

  if (layout) {
    width = layout.width;
  }

  return (
    <View
      style={{
        width: '25%',
        aspectRatio: 1,
        borderRadius: width / 2,
        backgroundColor: isFill ? colors.main : colors.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '-1%',
        zIndex: 1,
      }}
      onLayout={onLayout}
    >
      <BText type="bold" color={isFill ? colors.white : colors.disabled} style={{ fontSize: 12 }}>
        {section}
      </BText>
    </View>
  );
}

export default CardProgressSection;
