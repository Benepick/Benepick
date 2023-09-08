import React from 'react';
import { View, Button, Text, StyleSheet, ScrollView } from 'react-native';

import { BenefitNavigationProps } from 'interfaces/navigation';

import SearchInput from '@common/components/SearchInput';
import BenfitCard from './Container/BenfitCard';
import { globalStyles } from '@common/design/globalStyles';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import { Spacing } from '@common/components/Spacing';

function Benefit({ navigation }: BenefitNavigationProps) {
  return (
    <View style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchInput />
        <Spacing />
        <View style={styles.box}>
          <BText type="h3">스타벅스에서 사용할 카드 추천드려요</BText>
          <Spacing />
          <BenfitCard image={require('@common/assets/images/cardImg.png')} />
          <Spacing />
          <BenfitCard image={require('@common/assets/images/cardImg.png')} />
          <Spacing />
          <BenfitCard image={require('@common/assets/images/cardImg.png')} />
          <Spacing />
        </View>
        <Spacing />
        <View style={styles.box}>
          <BText type="h3">이런 카드는 어때요?</BText>
          <Spacing />
          <BenfitCard image={require('@common/assets/images/cardImg.png')} />
          <Spacing />
          <BenfitCard image={require('@common/assets/images/cardImg.png')} />
          <Spacing />
          <BenfitCard image={require('@common/assets/images/cardImg.png')} />
          <Spacing />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    borderRadius: 12,
    padding: 20,
    backgroundColor: colors.white,
  },
});

export default Benefit;
