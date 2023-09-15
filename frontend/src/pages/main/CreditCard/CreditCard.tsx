import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { CreditCardNavigationProps } from 'interfaces/navigation';
import Page from '@common/components/Page';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import CreditCardItem from './Container/CreditCardItem';
import { Spacing } from '@common/components/Spacing';

function CreditCard({ navigation }: CreditCardNavigationProps) {
  const sampleData = [
    {
      cardName: '롯데카드',
      cardType: 'LOCA 365 카드',
      image: require('@common/assets/images/cardImg.png'),
      benefitAmount: [200000, 400000, 600000, 800000],
      usedAmount: 500000,
      currentSection: 2,
      nextSection: 600000,
    },
    {
      cardName: '카카오뱅크',
      cardType: '카카오뱅크 체크 카드',
      image: require('@common/assets/images/cardImg.png'),
      benefitAmount: [100000, 300000, 500000, 700000],
      usedAmount: 250000,
      currentSection: 1,
      nextSection: 300000,
    },
    {
      cardName: '카카오뱅크',
      cardType: '카카오뱅크 체크 카드',
      image: require('@common/assets/images/cardImg.png'),
      benefitAmount: [100000, 300000, 500000, 700000],
      usedAmount: 250000,
      currentSection: 1,
      nextSection: 300000,
    },
    {
      cardName: '카카오뱅크',
      cardType: '카카오뱅크 체크 카드',
      image: require('@common/assets/images/cardImg.png'),
      benefitAmount: [100000, 300000, 500000, 700000],
      usedAmount: 250000,
      currentSection: 1,
      nextSection: 300000,
    },
    {
      cardName: '카카오뱅크',
      cardType: '카카오뱅크 체크 카드',
      image: require('@common/assets/images/cardImg.png'),
      benefitAmount: [100000, 300000, 500000, 700000],
      usedAmount: 250000,
      currentSection: 1,
      nextSection: 300000,
    },
  ];

  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.title}>
          <BText type="h2" color={colors.main}>
            김성용님
          </BText>
        </View>
        <Spacing rem="0.25" />
        <BText type="h2">카드 보여드릴게요</BText>
        <Spacing />
        {sampleData.map((data, index) => (
          <View key={index}>
            <CreditCardItem
              image={data.image}
              cardName={data.cardName}
              cardType={data.cardType}
              benefitAmount={data.benefitAmount}
              usedAmount={data.usedAmount}
              currentSection={data.currentSection}
              nextSection={data.nextSection}
              onPress={() => navigation.push('CreditCardDetail', { params: { cardId: index } })}
            />
            <Spacing />
          </View>
        ))}
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
