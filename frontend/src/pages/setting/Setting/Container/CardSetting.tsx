import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import SvgIcons from '@common/assets/SvgIcons';
import colors from '@common/design/colors';
import BSwitch from '@common/components/BSwitch';
import IconButton from '@common/components/IconButton';
import { SettingNavigationProps } from '@interfaces/navigation';

function CardSetting({ navigation }: SettingNavigationProps) {
  return (
    <View>
      {/* 자산연결관리 */}
      <View style={styles.container}>
        <View style={styles.option}>
          <View style={styles.text}>
            <SvgIcons name="Card" fill={colors.disabled} size={30} />
            <Spacing rem="0.5" dir="row" />
            <BText>자산연결관리</BText>
          </View>
          <View>
            <IconButton
              name="Right"
              onPress={() => {
                navigation.push('CompanyStack');
              }}
            />
          </View>
        </View>
        <Spacing rem="0.5" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CardSetting;
