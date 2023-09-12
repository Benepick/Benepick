import React from 'react';
import WhiteBox from '@common/components/WhiteBox';
import CardConsumptionItem from './CardConsumption/CardConsumptionItem';
import { Spacing } from '@common/components/Spacing';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CardConsumptionItemProps } from '@interfaces/creditCard';

// {}: CardConsumptionItemProps[]
interface CardConsumptionProps {}
function CardConsumption({}: CardConsumptionProps) {
  return (
    <WhiteBox>
      <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
        <View>
          <CardConsumptionItem item="에이셉피자" price="100,000" benefit="1,000" />
          <Spacing />
        </View>
        <View>
          <CardConsumptionItem item="에이셉피자" price="100,000" benefit="1,000" />
          <Spacing />
        </View>
        <View>
          <CardConsumptionItem item="에이셉피자" price="100,000" benefit="1,000" />
          <Spacing />
        </View>
        <View>
          <CardConsumptionItem item="에이셉피자" price="100,000" benefit="1,000" />
          <Spacing />
        </View>
        <View>
          <CardConsumptionItem item="에이셉피자" price="100,000" benefit="1,000" />
          <Spacing />
        </View>
        <View>
          <CardConsumptionItem item="에이셉피자" price="100,000" benefit="1,000" />
          <Spacing />
        </View>
        <View>
          <CardConsumptionItem item="에이셉피자" price="100,000" benefit="1,000" />
          <Spacing />
        </View>
        <View>
          <CardConsumptionItem item="에이셉피자" price="100,000" benefit="1,000" />
          <Spacing />
        </View>
      </ScrollView>
    </WhiteBox>
  );
}

export default CardConsumption;
