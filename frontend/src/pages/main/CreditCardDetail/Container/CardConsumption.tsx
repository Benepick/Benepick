import React from 'react';
import { View } from 'react-native';

import CardConsumptionItem from './CardConsumption/CardConsumptionItem';

import { Spacing } from '@common/components/Spacing';
import BText from '@common/components/BText';
import BHr from '@common/components/BHr';
import { DayTransactionResponseDto } from '@api/myData';

function CardConsumption({
  transactionDate,
  transcationInfoResponseDtoList,
}: DayTransactionResponseDto) {
  const day = transactionDate.slice(8, 10);

  return (
    <View>
      <BText type="h3">{day}일</BText>
      <View style={{ width: '88%' }}>
        <View style={{ flexDirection: 'row' }}>
          <Spacing rem="0.5" dir="row" />
        </View>
        <Spacing rem="0.5" />
        {transcationInfoResponseDtoList.map((value, index) => (
          <View key={index}>
            <Spacing rem="1" />
            <CardConsumptionItem
              category={value.category}
              merchantName={value.merchantName}
              payAmount={value.payAmount}
              benefitAmount={value.benefitAmount}
              transactionTime={value.transactionTime}
            />
            <Spacing rem="1" />
            <BHr />
          </View>
        ))}
        <Spacing rem="0.5" />
      </View>
    </View>
  );
}

export default CardConsumption;
