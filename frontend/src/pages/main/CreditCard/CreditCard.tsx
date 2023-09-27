import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { CreditCardNavigationProps } from 'interfaces/navigation';
import Page from '@common/components/Page';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import CreditCardItem from './Container/CreditCardItem';
import { Spacing } from '@common/components/Spacing';
import myData, { CardListData } from '@api/myData';

function CreditCard({ navigation }: CreditCardNavigationProps) {
  const [data, setData] = useState<CardListData[]>();

  useEffect(() => {
    myData
      .cardList()
      .then((response) => {
        if (response.statusCode === 200) {
          setData(response.data);
        } else {
          console.log(response.statusCode);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        {data?.map((value, index) => (
          <View key={index}>
            <CreditCardItem
              cardImgUrl={value.cardImgUrl}
              cardName={value.cardName}
              cardCompanyName={value.cardCompanyName}
              performanceLevels={value.performanceLevels}
              currentPerformance={value.currentPerformance}
              currentLevel={value.currentLevel}
              nextLevelAmount={value.nextLevelAmount}
              cardCode={value.cardCode}
              serialNumber={value.serialNumber}
              navigation={navigation}
              cardId={index + 1}
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
