import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import BText from '@common/components/BText';
import colors from '@common/design/colors';
import { Spacing } from '@common/components/Spacing';
import ConsumptionChart from './MonthlyBenefit/ConsunptionChart';
import WhiteBox from '@common/components/WhiteBox';
import BenefitChart from './MonthlyBenefit/BenefitChart';
import SvgIcons from '@common/assets/SvgIcons';
import myData, { RecentData } from '@api/myData';

function MonthlyBenefit() {
  const [data, setData] = useState<RecentData[]>();

  useEffect(() => {
    myData
      .recent()
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

  const payAmounts: Array<number> = [];
  const benefitAmounts: Array<number> = [];
  const benefitRates: Array<number> = [];
  const months: Array<string> = [];

  data?.forEach((value) => {
    payAmounts.unshift(value.payAmount);
    benefitAmounts.unshift(value.benefitAmount);
    benefitRates.unshift(value.benefitRate);
    months.unshift(value.month);
  });

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
            {data && data[0].year}년 {data && data[0].month}월 총 받은 혜택
          </BText>
          <BText type="p">{data && data[0].benefitAmount} 원</BText>
        </View>
        <View style={styles.text}>
          <BText type="bold">
            {data && data[0].year}년 {data && data[0].month}월 총 사용 금액
          </BText>
          <BText type="p">{data && data[0].payAmount} 원</BText>
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
          <BenefitChart benefits={benefitRates} />
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
          <ConsumptionChart consumptions={payAmounts} />
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
