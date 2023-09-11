import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ConsumptionNavigationProps } from 'interfaces/navigation';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import { Spacing } from '@common/components/Spacing';
import CircleChart from './CircleChart';
import CategoryText from './CategoryText';
import WhiteBox from '@common/components/WhiteBox';

function ConsumptionHistory() {
  return (
    <WhiteBox>
      <BText style={{ alignSelf: 'flex-start' }} type="h3">
        8월 소비내역
      </BText>
      <Spacing />
      <View style={styles.chart}>
        <CircleChart
          segments={[
            { percent: 30, color: colors.graphRed },
            { percent: 10, color: colors.graphOrange },
            { percent: 14, color: colors.graphYellow },
            { percent: 16, color: colors.graphGreen },
            { percent: 10, color: colors.graphBlue },
            { percent: 10, color: colors.graphDarkBlue },
            { percent: 10, color: colors.graphPurple },
          ]}
        />
      </View>
      <Spacing />
      <View style={styles.text}>
        <CategoryText category="쇼핑" value="10,000원(10. 0%)" />
        <CategoryText category="생활" value="10,000원(10. 0%)" />
        <CategoryText category="식비" value="10,000원(10. 0%)" />
        <CategoryText category="여가" value="10,000원(10. 0%)" />
        <CategoryText category="편의점" value="10,000원(10. 0%)" />
        <CategoryText category="카페" value="10,000원(10. 0%)" />
        <CategoryText category="온라인" value="10,000원(10. 0%)" />
      </View>
    </WhiteBox>
  );
}

const styles = StyleSheet.create({
  chart: {
    alignSelf: 'center',
  },
  text: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default ConsumptionHistory;
