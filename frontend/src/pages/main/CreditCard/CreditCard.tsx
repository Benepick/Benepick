import React from 'react';
import { View, Button, Text, StyleSheet, ScrollView } from 'react-native';

import { CreditCardNavigationProps } from 'interfaces/navigation';
import Page from '@common/components/Page';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import CreditCardItem from './Container/CreditCardItem';
import { Spacing } from '@common/components/Spacing';

function CreditCard({ navigation }: CreditCardNavigationProps) {
  const sampleData = {
    cardName: '롯데카드',
    cardType: 'LOCA 365 카드',
    image: require('@common/assets/images/cardImg.png'),
    benefitAmount: [200000, 400000, 600000, 800000],
    usedAmount: 500000,
    currentSection: 2,
    nextSection: 600000,
  };

  const params = {
    cardId: 3,
  };
  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.title}>
          <BText type="h2" color={colors.main}>
            김성용님
          </BText>
        </View>
        <Spacing rem="0.25" />
        <BText type="h2">카드 보여드림</BText>
        <Spacing />
        <View>
          <CreditCardItem
            image={sampleData.image}
            cardName={sampleData.cardName}
            cardType={sampleData.cardType}
            benefitAmount={sampleData.benefitAmount}
            usedAmount={sampleData.usedAmount}
            currentSection={sampleData.currentSection}
            nextSection={sampleData.nextSection}
            // cardId를 바탕으로 카드 상세보기로 이동
            onPress={() => navigation.push('CreditCardDetail', { params })}
          />
          <Spacing />
        </View>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  title: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default CreditCard;
