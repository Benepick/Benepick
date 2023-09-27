import colors from '@common/design/colors';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, TouchableHighlight, View, Image, StyleSheet } from 'react-native';
import BText from './BText';
import myData from '@api/myData';
import SvgIcons from '@common/assets/SvgIcons';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setRenewalTimeStamp } from '@store/slices/userSlice';

function MainLogo({ navigation }: any) {
  const renewalTimeStamp = useAppSelector((state) => state.user.renewalTimeStamp);
  const dispatch = useAppDispatch();
  const [timeAgo, setTimeAgo] = useState('');

  const translateX = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: 5,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: -5,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => startAnimation());
  };

  useEffect(() => {
    startAnimation();
    return () => translateX.stopAnimation();
  }, []);

  const getMydataRenew = () => {
    myData
      .renewal()
      .then((res) => {
        if (res.statusCode === 200) {
          dispatch(setRenewalTimeStamp(new Date().getTime()));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (renewalTimeStamp) {
      const timeDifference = new Date().getTime() - renewalTimeStamp;
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) {
        setTimeAgo(`${days}일 전 업데이트`);
      } else if (hours > 0) {
        setTimeAgo(`${hours}시간 전 업데이트`);
      } else if (minutes > 0) {
        setTimeAgo(`${minutes}분 전 업데이트`);
      } else setTimeAgo('방금 전 업데이트');
    }
  }, [renewalTimeStamp, timeAgo, navigation]);

  return (
    <TouchableHighlight onPress={getMydataRenew} underlayColor={'transparent'}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('@common/assets/images/logo/navLogo.png')} />
        {!renewalTimeStamp && (
          <Animated.View style={[styles.balloonContainer, { transform: [{ translateX }] }]}>
            <View style={styles.triangle} />
            <View style={styles.myData}>
              <BText color={colors.white}>마이데이터 갱신</BText>
            </View>
          </Animated.View>
        )}
        {renewalTimeStamp && (
          <View style={styles.balloonContainer}>
            <BText color={colors.main}>{timeAgo}</BText>
            <View
              style={{
                backgroundColor: colors.main,
                borderRadius: 100,
                padding: 2,
                justifyContent: 'center',
                marginLeft: '5%',
              }}
            >
              <SvgIcons name="Refresh" size={20} fill={colors.white} />
            </View>
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  balloonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderRightWidth: 10,
    borderBottomWidth: 5,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: colors.main,
    borderBottomColor: 'transparent',
  },
  myData: {
    backgroundColor: colors.main,
    padding: 5,
    borderRadius: 5,
  },
});

export default MainLogo;
