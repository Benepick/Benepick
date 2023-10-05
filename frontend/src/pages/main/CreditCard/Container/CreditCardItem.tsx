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
  cardId,
}: CreditCardItemProps) {
  return (
    <WhiteBox>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => navigation.push('CreditCardDetail', { cardId: cardId })}
      >
        <View>
          <View style={styles.cardHeader}>
            <Image style={styles.image} source={{ uri: cardImgUrl }} borderRadius={3} />
            <Spacing dir="row" />
            <View style={styles.cardTitle}>
              <BText type="h3">{cardName}</BText>
              {/* <BText>{cardCompanyName} </BText> */}
              <View style={styles.serialNumber}>
                <BText type="p">{serialNumber.slice(15, 19)}</BText>
              </View>
            </View>
          </View>
          <Spacing rem="2" />
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
  cardHeader: {
    flexDirection: 'row',
  },
  cardTitle: {
    justifyContent: 'space-between',
  },
  image: {
    width: '12%',
    aspectRatio: 1 / 1.58,
  },
  serialNumber: {
    width: 55,
    borderWidth: 1.5,
    borderColor: colors.placeholder,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 2,
    color: colors.placeholder,
  },
});

export default CreditCardItem;
