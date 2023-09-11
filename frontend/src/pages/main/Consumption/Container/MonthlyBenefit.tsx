import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import BText from '@common/components/BText';
import colors from '@common/design/colors';
import { Spacing } from '@common/components/Spacing';
import ConsumptionChart from './MonthlyBenefit/ConsunptionChart';
import WhiteBox from '@common/components/WhiteBox';
import BenefitChart from './MonthlyBenefit/BenefitChart';
import SvgIcons from '@common/assets/SvgIcons';

function MonthlyBenefit() {
  const consumptions = [1547340, 1193491, 1233214, 1112340];
  const benefits = [1.3, 1.2, 0, 1.4];
  const months = [6, 7, 8, 9];

  const [view, setView] = useState('Benefit');

  const changeChart = () => {
    if (view === 'Benefit') {
      setView('Consumption');
    } else {
      setView('Benefit');
    }
  };

  return (
    <View>
      <WhiteBox>
        <View style={styles.text}>
          <BText type="bold">
            {}년 {}월 총 받은 혜택
          </BText>
          <BText type="p">{} 원</BText>
        </View>
        <View style={styles.text}>
          <BText type="bold">
            {}년 {}월 총 사용 금액
          </BText>
          <BText type="p">{} 원</BText>
        </View>
      </WhiteBox>
      <Spacing />
      {view === 'Benefit' ? (
        <WhiteBox>
          <View style={styles.text}>
            <BText type="h3">혜택 그래프</BText>
            <TouchableWithoutFeedback onPress={changeChart}>
              <View style={styles.change}>
                <BText type="p">소비 그래프</BText>
                <SvgIcons name="Right" />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <BenefitChart benefits={benefits} />
          <Spacing rem="0.25" />
          <View style={styles.month}>
            {months.map((month) => (
              <BText type="bold" key={month}>
                {month} 월
              </BText>
            ))}
          </View>
        </WhiteBox>
      ) : (
        <WhiteBox>
          <View style={styles.text}>
            <BText type="h3">소비 그래프</BText>
            <TouchableWithoutFeedback onPress={changeChart}>
              <View style={styles.change}>
                <BText type="p">혜택 그래프</BText>
                <SvgIcons name="Right" />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <ConsumptionChart consumptions={consumptions} />
          <Spacing rem="0.25" />
          <View style={styles.month}>
            {months.map((month) => (
              <BText type="bold" key={month}>
                {month} 월
              </BText>
            ))}
          </View>
        </WhiteBox>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: 20,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  change: {
    flexDirection: 'row',
  },
  month: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default MonthlyBenefit;
