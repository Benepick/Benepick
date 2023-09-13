import React from 'react';

import { StyleSheet, TouchableHighlight, View, Image } from 'react-native';

import WhiteBox from '@common/components/WhiteBox';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import CardProgress from './progress/CardProgress';
import CategoryText from '@common/components/CategoryText';
import { CreditCardItemProps } from '@interfaces/creditCard';

function CreditCardItem({
  cardName,
  cardType,
  image,
  benefitAmount,
  usedAmount,
  currentSection,
  nextSection,
  ...rest
}: CreditCardItemProps) {
  return (
    <WhiteBox>
      <TouchableHighlight underlayColor="transparent" {...rest}>
        <View>
          <View style={styles.cardTitle}>
            <Image style={styles.image} source={image} />
            <Spacing dir="row" />
            <View>
              <BText type="h3">{cardName}</BText>
              <BText>{cardType}</BText>
            </View>
          </View>
          <Spacing />
          <CardProgress current={3} sections={[3]} />
          <Spacing />
          <CategoryText
            category="사용/실적금액"
            value={`${usedAmount.toLocaleString()}원 / ${nextSection.toLocaleString()}원`}
          />
          <CategoryText
            category="다음 구간까지"
            value={`${(nextSection - usedAmount).toLocaleString()}원 남음`}
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
});

export default CreditCardItem;
