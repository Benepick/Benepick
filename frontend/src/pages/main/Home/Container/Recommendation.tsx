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
      {data && !loading && data.discountPercent === 0 && (
        <View style={{ justifyContent: 'center', alignSelf: 'center', height: '100%' }}>
          <Image
            style={{ width: 200, height: 200, alignSelf: 'center' }}
            source={require('@common/assets/images/whaleSorry.png')}
          />
          <BText type="bold">{data?.merchantName}에서 추천받을 수 있는 카드가 없어요</BText>
        </View>
      )}
      {data && !loading && data.discountPercent !== 0 && (
        <View style={styles.col}>
          <View style={styles.title}>
            <BText type="h3">{data.merchantName}에서 추천드려요</BText>
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
              <BText>{data.remainLimitBenefit}원</BText>
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
