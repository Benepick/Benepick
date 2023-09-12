import React from 'react';
import WhiteBox from '@common/components/WhiteBox';
import CardConsumptionItem from './CardConsumption/CardConsumptionItem';
import { Spacing } from '@common/components/Spacing';
import { ScrollView, View } from 'react-native';
import { CardConsumptionItemProps } from '@interfaces/creditCard';

// {}: CardConsumptionItemProps[]
function CardConsumption() {
  return (
    <WhiteBox>
      <ScrollView style={{ maxHeight: 500 }}>
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
