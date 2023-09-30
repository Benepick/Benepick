import React from 'react';
import { StyleSheet, View } from 'react-native';

import MonthlyConsumption from './Container/MonthlyConsumption';
import Recommendation from './Container/Recommendation';

import { Spacing } from '@common/components/Spacing';
import BText from '@common/components/BText';
import Page from '@common/components/Page';
import colors from '@common/design/colors';

import { HomeNavigationProps } from 'interfaces/navigation';
import { useAppSelector } from '@store/hooks';

function Home({ navigation }: HomeNavigationProps) {
  const userName = useAppSelector((state) => state.user.userName);
  return (
    <Page>
      <View style={styles.title}>
        <BText type="h2" color={colors.main}>
          {userName}님
        </BText>
        <BText type="h2"> 위치에서</BText>
      </View>
      <View>
        <Spacing rem="0.5" dir="row" />
        <BText type="h2">사용할 카드를 추천해드려요</BText>
      </View>
      <Spacing rem="0.25" />
      <Recommendation />
      <Spacing />
      <View style={styles.title}>
        <BText type="h2">이번달</BText>
        <BText type="h2" color={colors.main}>
          {' '}
          소비
        </BText>
      </View>
      <Spacing rem="0.25" />
      <MonthlyConsumption />
    </Page>
  );
}

const styles = StyleSheet.create({
  title: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Home;
