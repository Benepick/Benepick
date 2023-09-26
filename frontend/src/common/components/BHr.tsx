import colors from '@common/design/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function BHr() {
  return <View style={styles.hr}></View>;
}

const styles = StyleSheet.create({
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: colors.disabled,
    width: '100%',
    alignSelf: 'center',
  },
});

export default BHr;
