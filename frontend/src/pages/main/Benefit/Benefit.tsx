import React from 'react';
import { View, Button, Text, StyleSheet, ScrollView } from 'react-native';

import { BenefitNavigationProps } from 'interfaces/navigation';

import SearchInput from '@common/components/SearchInput';
import BenfitCard from './Container/BenfitCard';
import { globalStyles } from '@common/design/globalStyles';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import { Spacing } from '@common/components/Spacing';
import Page from '@common/components/Page';
import WhiteBox from '@common/components/WhiteBox';

function Benefit({ navigation }: BenefitNavigationProps) {
  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchInput />
        <Spacing />
        <WhiteBox>
          <BText style={{ alignSelf: 'flex-start' }} type="h3">
            스타벅스에서 사용할 카드 추천드려요
          </BText>
          <Spacing />
          <BenfitCard image={require('@common/assets/images/cardImg.png')} />
          <Spacing />
          <BenfitCard image={require('@common/assets/images/cardImg.png')} />
          <Spacing />
          <BenfitCard image={require('@common/assets/images/cardImg.png')} />
          <Spacing />
        </WhiteBox>
        <Spacing />
        <WhiteBox>
          <BText style={{ alignSelf: 'flex-start' }} type="h3">
            이런 카드는 어때요?
          </BText>
          <Spacing />
          <BenfitCard image={require('@common/assets/images/cardImg.png')} />
          <Spacing />
          <BenfitCard image={require('@common/assets/images/cardImg.png')} />
          <Spacing />
          <BenfitCard image={require('@common/assets/images/cardImg.png')} />
          <Spacing />
        </WhiteBox>
      </ScrollView>
    </Page>
  );
}

export default Benefit;
