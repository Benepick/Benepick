import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { globalStyles } from '@common/design/globalStyles';
import { PageProps } from '@interfaces/common';

function WhitePage({ children, style, ...rest }: PageProps) {
  return (
    <View style={[globalStyles.whitePage, style]} {...rest}>
      {children}
    </View>
  );
}

export default WhitePage;
