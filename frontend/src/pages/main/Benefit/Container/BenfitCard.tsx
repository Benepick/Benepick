import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableHighlight, View, Image, Animated, ScrollView } from 'react-native';

import SvgIcons from '@common/assets/SvgIcons';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import colors from '@common/design/colors';

import { BenfitCardProps } from '@interfaces/benefit';

function BenfitCard({
  cardName,
  category,
  cardImgUrl,
  cardCompanyName,
  discountPercent,
  discountTarget,
  remainedBenefit,
  benefitLimit,
}: BenfitCardProps) {
  const [showBenefit, setShowBenefit] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: showBenefit ? 0 : -20, // 원하는 높이로 설정
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [showBenefit]);

  return (
    <TouchableHighlight underlayColor="transparent" onPress={() => setShowBenefit(!showBenefit)}>
      <View style={{ justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.image} source={{ uri: cardImgUrl }} />
          <Spacing dir="row" />
          <View style={{ width: '80%', justifyContent: 'center' }}>
            <View style={styles.description}>
              <BText type="bold">{cardName}</BText>
              <SvgIcons name={showBenefit ? 'Down' : 'Up'} />
            </View>
            {/* <Spacing rem="0.5" />
            <View style={styles.description}>
              <BText type="bold">{cardCompanyName}</BText>
            </View> */}
            <Spacing rem="0.5" />
            <View style={styles.description}>
              <BText type="bold">예상혜택</BText>
              <BText>
                {category} {discountPercent}% 할인
              </BText>
            </View>
          </View>
        </View>
        {/* 아래는 클릭했을 때 공개되는 부분 */}
        {showBenefit && (
          <Animated.View
            style={{ transform: [{ translateY: animationValue }], overflow: 'hidden' }}
          >
            <Spacing rem="0.5" />
            <View>
              <BText type="bold">할인대상</BText>
              <BText>{discountTarget}</BText>
            </View>
            <Spacing rem="0.5" />
            <View style={styles.description}>
              <BText type="bold">{remainedBenefit ? '잔여혜택' : '혜택한도'}</BText>
              <BText>
                {remainedBenefit
                  ? remainedBenefit?.toLocaleString()
                  : benefitLimit?.toLocaleString()}{' '}
                원
              </BText>
            </View>
            <Spacing rem="0.5" />
          </Animated.View>
        )}
      </View>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  description: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '15%',
    aspectRatio: 1 / 1.58,
  },
});
export default BenfitCard;
