import React, { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';
import { View, StyleSheet, Image } from 'react-native';

import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import colors from '@common/design/colors';
import IconButton from '@common/components/IconButton';
import WhiteBox from '@common/components/WhiteBox';
import card, { PlaceResponse } from '@api/card';
import Loading from '@pages/Loading/Loading';

function Recommendation() {
  const { EventListener } = NativeModules;
  const [data, setData] = useState<PlaceResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const successCallback = (latitude: number, longitude: number) => {
    if (latitude && longitude) {
      card
        .place({ x: longitude, y: latitude })
        .then((response) => {
          setData(response);
          setLoading(false);
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
    setError(true);
  };

  useEffect(() => {
    EventListener.getLocation(successCallback, errorCallback);
  }, []);

  return (
    <WhiteBox style={styles.container}>
      {error && (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Image
            style={{ width: 200, height: 200, alignSelf: 'center' }}
            source={require('@common/assets/images/whaleSorry.png')}
          />
          <BText type="h3">위치권한이 꺼져있어요</BText>
        </View>
      )}
      {!error && loading && (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loading />
          <BText type="h3">현재 위치 정보 가져오는 중...</BText>
        </View>
      )}
      {!data && !loading && (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Image
            style={{ width: 200, height: 200, alignSelf: 'center' }}
            source={require('@common/assets/images/whaleSorry.png')}
          />
          <BText type="h3">보유하신 신용카드가 없어요</BText>
        </View>
      )}
      {data && !loading && !data.recommend && (
        <View style={styles.col}>
          <View style={styles.title}>
            <BText type="h3">아쉽게도 {data?.merchantName}에</BText>
            <IconButton
              name="Refresh"
              onPress={() => {
                setLoading(true);
                EventListener.getLocation(successCallback, errorCallback);
              }}
            />
          </View>
          <BText type="h3">혜택이 적용되는 카드가 없어요</BText>
          <Spacing />
          <BText type="h3">대신 아래 카드의 실적을 채워두는건 어때요?</BText>
          <Spacing rem="2" />

          <View style={styles.noneDescription}>
            {data.cardImgUrl && <Image style={styles.image} source={{ uri: data.cardImgUrl }} />}
            <Spacing dir="row" />
            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
              <BText type="h3" color={colors.main}>
                {data.cardCompanyName}
              </BText>
              <BText type="h3" color={colors.main}>
                {data.cardName}
              </BText>
            </View>
          </View>
        </View>
      )}
      {data && !loading && data.recommend && (
        <View style={styles.col}>
          <View style={styles.title}>
            <BText type="h2">{data.merchantName}</BText>
            <IconButton
              name="Refresh"
              onPress={() => {
                setLoading(true);
                EventListener.getLocation(successCallback, errorCallback);
              }}
            />
          </View>

          <View style={styles.description}>
            {data.cardImgUrl && <Image style={styles.image} source={{ uri: data.cardImgUrl }} />}
            <Spacing dir="row" />
            <View style={{ marginLeft: 10, width: '90%' }}>
              <BText type="h3">{data.cardCompanyName}</BText>
              <BText type="h2">{data.cardName}</BText>
              <BText type="h2" color={colors.main}>
                {data.discountPercent}% 할인
              </BText>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.benefit}>
              <BText type="bold">혜택대상</BText>
              <BText>{data.discountTarget}</BText>
            </View>
            <Spacing rem="0.25" />
            <View style={styles.benefit}>
              <BText type="bold">혜택종류</BText>
              <BText>{data.discountPercent}% 할인</BText>
            </View>
            <Spacing rem="0.25" />
            <View style={styles.benefit}>
              <BText type="bold">잔여혜택</BText>
              <BText>{data.remainLimitBenefit.toLocaleString()}원</BText>
            </View>
          </View>
        </View>
      )}
    </WhiteBox>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
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
  noneDescription: {
    display: 'flex',
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.main3,
    padding: 25,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bottom: { width: '95%', alignSelf: 'center' },
  image: {
    width: '20%',
    aspectRatio: 1 / 1.58,
    borderRadius: 3,
  },
  benefit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Recommendation;
