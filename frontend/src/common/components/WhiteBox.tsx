import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { globalStyles } from '@common/design/globalStyles';

interface PageProps extends ViewProps {
  children?: ReactNode;
}

function WhiteBox({ children, ...rest }: PageProps) {
  return (
    <View style={globalStyles.container} {...rest}>
      {children}
    </View>
  );
}

export default WhiteBox;
