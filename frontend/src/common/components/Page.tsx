import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { globalStyles } from '@common/design/globalStyles';
import { PageProps } from '@interfaces/common';

function Page({ children, style, ...rest }: PageProps) {
  return (
    <View style={[globalStyles.page, style]} {...rest}>
      {children}
    </View>
  );
}

export default Page;
