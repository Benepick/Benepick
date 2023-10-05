import React from 'react';
import { StyleSheet, View } from 'react-native';

import SvgIcons from '@common/assets/SvgIcons';
import BText from '@common/components/BText';

import { Spacing } from '@common/components/Spacing';
import colors from '@common/design/colors';

import { TransactionInfoResponseDto } from '@api/myData';

function CardConsumptionItem({
  category,
  merchantName,
  payAmount,
  benefitAmount,
  transactionTime,
}: TransactionInfoResponseDto) {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {category && <SvgIcons name={category === '카페/간식' ? '카페' : category} size={30} />}
        <Spacing rem="1" dir="row" />
        <View style={styles.description}>
          <View style={styles.item}>
            <BText type="bold" numberOfLines={1} ellipsizeMode="tail">
              {merchantName}
            </BText>
            <BText type="bold">{payAmount.toLocaleString()}원</BText>
          </View>
          <View style={styles.item}>
            <BText type="p">받은혜택</BText>
            <BText color={colors.main}>{benefitAmount}원</BText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  description: { flexDirection: 'column', width: '85%' },
  item: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default CardConsumptionItem;
