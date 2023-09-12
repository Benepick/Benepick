import SvgIcons from '@common/assets/SvgIcons';
import BHr from '@common/components/BHr';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import colors from '@common/design/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardConsumptionItemProps } from '@interfaces/creditCard';

function CardConsumptionItem({ item, price, benefit }: CardConsumptionItemProps) {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SvgIcons name="Menu" size={30} />
        <Spacing rem="1" dir="row" />
        <View style={styles.description}>
          <View style={styles.item}>
            <BText type="h3">{item}</BText>
            <BText type="h3">{price}원</BText>
          </View>
          <View style={styles.item}>
            <BText type="p">예상혜택</BText>
            <BText color={colors.main}>{benefit}원</BText>
          </View>
        </View>
      </View>
      <Spacing rem="0.5" />
      <BHr />
    </View>
  );
}

const styles = StyleSheet.create({
  description: { flexDirection: 'column', width: '80%' },
  item: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default CardConsumptionItem;
