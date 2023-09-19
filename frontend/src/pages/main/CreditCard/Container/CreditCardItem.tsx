import React, { useState } from 'react';

import { StyleSheet, TouchableHighlight, View, Image } from 'react-native';

import WhiteBox from '@common/components/WhiteBox';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import CardProgress from './progress/CardProgress';
import CategoryText from '@common/components/CategoryText';
import { CreditCardItemProps } from '@interfaces/creditCard';
import colors from '@common/design/colors';

function CreditCardItem({
  cardName,
  cardCompanyName,
  cardImgUrl,
  currentPerformance,
  performanceLevels,
  currentLevel,
  nextLevelAmount,
  cardCode,
  serialNumber,
  navigation,
}: CreditCardItemProps) {
  return (
    <WhiteBox>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => navigation.push('CreditCardDetail', { params: { cardId: cardCode } })}
      >
        <View>
          <View style={styles.cardTitle}>
            <Image style={styles.image} source={{ uri: cardImgUrl }} />
            <Spacing dir="row" />
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BText type="h3">{cardName}</BText>
                <Spacing rem="0.5" dir="row" />
                <View style={styles.serialNumber}>
                  <BText type="p">{serialNumber.slice(15, 19)}</BText>
                </View>
              </View>
              <BText>{cardCompanyName}</BText>
            </View>
          </View>
          <Spacing />
          <CardProgress
            sections={performanceLevels}
            currentAmount={currentPerformance}
            currentSection={currentLevel}
            nextSectionAmont={nextLevelAmount}
          />
          <Spacing />
          <CategoryText
            category="사용/실적금액"
            value={`${currentPerformance.toLocaleString()}원 / ${nextLevelAmount.toLocaleString()}원`}
          />
          <CategoryText
            category="다음 구간까지"
            value={`${(nextLevelAmount - currentPerformance).toLocaleString()}원 남음`}
          />
        </View>
      </TouchableHighlight>
    </WhiteBox>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    flexDirection: 'row',
  },
  image: {
    maxWidth: '15%',
    aspectRatio: 1 / 1.58,
  },
  serialNumber: {
    borderWidth: 1,
    borderColor: colors.placeholder,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    color: colors.placeholder,
  },
});

export default CreditCardItem;
