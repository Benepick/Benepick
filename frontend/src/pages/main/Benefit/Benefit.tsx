import React from 'react';
import { View, Button, Text, StyleSheet, ScrollView } from 'react-native';

import { BenefitNavigationProps } from 'interfaces/navigation';

import SearchInput from '@common/components/SearchInput';
import BenfitCard from './Container/BenfitCard';
import BText from '@common/components/BText';
import BHr from '@common/components/BHr';
import { Spacing } from '@common/components/Spacing';
import Page from '@common/components/Page';
import WhiteBox from '@common/components/WhiteBox';

function Benefit({ navigation }: BenefitNavigationProps) {
  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacing rem="0.5" />
        <SearchInput />
        <Spacing />
        <WhiteBox>
          <BText style={{ alignSelf: 'flex-start' }} type="h3">
            스타벅스에서 사용할 카드 추천드려요
          </BText>
          <View>
            <Spacing />
            <BenfitCard image={require('@common/assets/images/cardImg.png')} />
            <Spacing rem="0.5" />
            <BHr />

            <Spacing />
            <BenfitCard image={require('@common/assets/images/cardImg.png')} />
            <Spacing rem="0.5" />
            <BHr />

            <Spacing />
            <BenfitCard image={require('@common/assets/images/cardImg.png')} />
            <Spacing rem="0.5" />
            <BHr />
          </View>
        </WhiteBox>
        <Spacing />
        <WhiteBox>
          <BText style={{ alignSelf: 'flex-start' }} type="h3">
            이런 카드는 어때요?
          </BText>
          <View>
            <Spacing />
            <BenfitCard image={require('@common/assets/images/cardImg.png')} />
            <Spacing rem="0.5" />
            <BHr />

            <Spacing />
            <BenfitCard image={require('@common/assets/images/cardImg.png')} />
            <Spacing rem="0.5" />
            <BHr />

            <Spacing />
            <BenfitCard image={require('@common/assets/images/cardImg.png')} />
            <Spacing rem="0.5" />
            <BHr />
          </View>
        </WhiteBox>
      </ScrollView>
    </Page>
  );
}

export default Benefit;
