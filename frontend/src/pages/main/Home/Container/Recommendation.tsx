import React, { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';
import { View, StyleSheet, Image } from 'react-native';

import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import colors from '@common/design/colors';
import IconButton from '@common/components/IconButton';
import WhiteBox from '@common/components/WhiteBox';
import card, { PlaceResponse } from '@api/card';

function Recommendation() {
  const { EventListener } = NativeModules;
  const [data, setData] = useState<PlaceResponse>();
  const [loading, setLoading] = useState(true);

  const successCallback = (latitude: number, longitude: number) => {
    if (latitude && longitude) {
      console.log(latitude, longitude);
      card
        .place({ x: longitude, y: latitude })
        .then((response) => {
          setData(response);
          setLoading(false);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('Location is null');
    }
  };

  const errorCallback = (error: string) => {
    console.log(error);
  };

  useEffect(() => {
    EventListener.getLocation(successCallback, errorCallback);
  }, []);

  return (
    <WhiteBox style={styles.container}>
      {loading && (
        <View>
          <BText type="h2">현재 위치 정보 가져오는 중...</BText>
        </View>
      )}
      {!loading && (
        <View style={styles.col}>
          <View style={styles.title}>
            <BText type="h2">{data?.merchantName}에서 추천드려요</BText>
            <IconButton
              name="Refresh"
              onPress={() => {
                setLoading(true);
                EventListener.getLocation(successCallback, errorCallback);
              }}
            />
          </View>

          <View style={styles.description}>
            {data?.cardImgUrl && <Image style={styles.image} source={{ uri: data?.cardImgUrl }} />}
            <View>
              <BText type="h3">{data?.cardCompanyName}</BText>
              <BText type="h1">{data?.cardName}</BText>
              <BText type="h1" color={colors.main}>
                {data?.discountPercent}% 할인
              </BText>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.benefit}>
              <BText type="bold">혜택대상</BText>
              <BText>{data?.discountTarget}</BText>
            </View>
            <Spacing rem="0.25" />
            <View style={styles.benefit}>
              <BText type="bold">혜택종류</BText>
              <BText>% 할인</BText>
            </View>
            <Spacing rem="0.25" />
            <View style={styles.benefit}>
              <BText type="bold">잔여혜택</BText>
              <BText>{data?.remainLimitBenefit}원</BText>
            </View>
          </View>
        </View>
      )}
    </WhiteBox>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '55%',
  },
  col: {
    height: '100%',
    justifyContent: 'space-between',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  bottom: { width: '95%', alignSelf: 'center' },
  image: {
    width: '30%',
    aspectRatio: 1 / 1.58,
  },
  benefit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Recommendation;
