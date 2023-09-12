import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { globalStyles } from '@common/design/globalStyles';
import { PageProps } from '@interfaces/common';

function WhiteBox({ children, style, ...rest }: PageProps) {
  return (
    <View style={[globalStyles.container, style]} {...rest}>
      {children}
    </View>
  );
}

export default WhiteBox;
