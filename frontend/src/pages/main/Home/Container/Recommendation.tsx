import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import colors from '@common/design/colors';
import IconButton from '@common/components/IconButton';

function Recommendation() {
  return (
    <View>
      <View style={styles.title}>
        <BText type="h2" color={colors.main}>
          김성용님
        </BText>
        <BText type="h2"> 위치에서</BText>
      </View>
      <View>
        <Spacing rem="0.5" dir="row" />
        <BText type="h2">사용할 카드를 추천해드려요</BText>
      </View>
      <Spacing rem="0.25" />
      <View style={styles.box}>
        <View style={styles.title}>
          <BText type="h3">스타벅스 역삼점에서 추천드려요</BText>
          <Spacing rem="3.5" dir="row" />
          <IconButton name="Refresh" />
        </View>
        <Spacing rem="1" />
        <View style={styles.description}>
          <Image style={styles.image} source={require('@common/assets/images/cardImg.png')} />
          <Spacing rem="1" dir="row" />
          <View style={{ width: '60%' }}>
            <View>
              <BText type="h3">카카오뱅크 프렌즈</BText>
              <BText type="bold">예상혜택</BText>
            </View>
            <Spacing rem="1" />

            <View style={{ alignSelf: 'center' }}>
              <BText type="h2" color={colors.main}>
                1000원 캐시백
              </BText>
            </View>
          </View>
        </View>
        <Spacing rem="1" />
        <BText type="bold" color={colors.white} style={styles.cardText}>
          이 카드를 사용하시면 실적 전체가 인정돼요
        </BText>
        <Spacing rem="1" />
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={styles.benefit}>
            <BText type="bold">할인대상</BText>
            <BText>1000원</BText>
          </View>
          <Spacing rem="0.25" />
          <View style={styles.benefit}>
            <BText type="bold">할인종류</BText>
            <BText>1000원 캐쉬백</BText>
          </View>
          <Spacing rem="0.25" />
          <View style={styles.benefit}>
            <BText type="bold">잔여혜택</BText>
            <BText>1000원</BText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: 20,
  },
  image: {
    width: '30%',
    aspectRatio: 1 / 1.58,
  },
  benefit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: { backgroundColor: colors.main2, borderRadius: 5, padding: 7 },
});

export default Recommendation;
