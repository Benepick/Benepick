import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import SvgIcons from '@common/assets/SvgIcons';
import colors from '@common/design/colors';
import BSwitch from '@common/components/BSwitch';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setShakePick } from '@store/slices/appSlice';

function AppSetting() {
  const notification = useAppSelector((state) => state.app.shakePick);
  const dispatch = useAppDispatch();

  const setNotification = () => {
    dispatch(setShakePick());
  };

  return (
    <View>
      {/* 푸시 알림 설정 */}
      <View style={styles.container}>
        <View style={styles.option}>
          <View style={styles.text}>
            <SvgIcons name="Notification" fill={colors.disabled} size={30} />
            <Spacing rem="0.5" dir="row" />
            <BText>푸시 알림 ON/OFF</BText>
          </View>
          <View>
            <BSwitch size={1} value={notification} onPress={setNotification} />
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

export default AppSetting;
