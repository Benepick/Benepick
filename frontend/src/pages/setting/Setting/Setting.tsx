import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

import { SettingNavigationProps } from 'interfaces/navigation';
import WhitePage from '@common/components/WhitePage';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import AuthSetting from './Container/AuthSetting';
import CardSetting from './Container/CardSetting';
import AppSetting from './Container/AppSetting';
import FlatButton from '@common/components/FlatButton';

function Setting({ navigation }: SettingNavigationProps) {
  return (
    <WhitePage>
      <Spacing />
      <BText type="h3">사용자 설정</BText>
      <Spacing />
      <AuthSetting navigation={navigation} />
      <Spacing />
      <BText type="h3">카드 설정</BText>
      <Spacing />
      <CardSetting navigation={navigation} />
      <Spacing />
      <BText type="h3">앱 설정</BText>
      <Spacing />
      <AppSetting />
      <Spacing />
      <View>{/* <FlatButton text={''} onPress={onPress} /> */}</View>
    </WhitePage>
  );
}

export default Setting;
