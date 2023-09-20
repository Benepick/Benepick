import React from 'react';
import WhiteBox from '@common/components/WhiteBox';
import CardConsumptionItem from './CardConsumption/CardConsumptionItem';
import { Spacing } from '@common/components/Spacing';
import { ScrollView, View } from 'react-native';
import { DayTransactionResponseDto } from '@api/myData';
import BText from '@common/components/BText';
import BHr from '@common/components/BHr';

function CardConsumption({
  transactionDate,
  transcationInfoResponseDtoList,
}: DayTransactionResponseDto) {
  const day = transactionDate.slice(8, 10);

  return (
    <View style={{ width: '95%' }}>
      <View style={{ flexDirection: 'row' }}>
        <Spacing rem="0.5" dir="row" />
        <BText type="h3">{day}일</BText>
      </View>
      <Spacing rem="0.5" />
      {transcationInfoResponseDtoList.map((value, index) => (
        <View key={index}>
          <CardConsumptionItem
            category={value.category}
            merchantName={value.merchantName}
            payAmount={value.payAmount}
            benefitAmount={value.benefitAmount}
            transactionTime={value.transactionTime}
          />
          <Spacing rem="1" />
        </View>
      ))}
      <BHr />
      <Spacing rem="0.5" />
    </View>
  );
}

export default CardConsumption;
