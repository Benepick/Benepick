import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import BText from '@common/components/BText';
import colors from '@common/design/colors';
import { Spacing } from '@common/components/Spacing';
import CircleChart from './ConsumptionHistory/CircleChart';
import CategoryText from '../../../../common/components/CategoryText';
import WhiteBox from '@common/components/WhiteBox';
import myData, { CategoryResultResponseDto } from '@api/myData';
import SvgIcons from '@common/assets/SvgIcons';

function ConsumptionHistory() {
  const [categoryData, setCategoryData] = useState<CategoryResultResponseDto[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [month] = useState(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    return currentMonth;
  });

  useEffect(() => {
    myData
      .category()
      .then((res) => {
        setCategoryData(res.data.categoryResultResponseDtoList);
        setTotalAmount(res.data.totalAmount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const colorMap: Record<string, string> = {
    생활: colors.graphRed,
    쇼핑: colors.graphOrange,
    식비: colors.graphYellow,
    여가: colors.graphGreen,
    편의점: colors.graphBlue,
    카페: colors.graphDarkBlue,
    온라인: colors.graphPurple,
  };

  const segments = categoryData.map((data) => {
    return {
      percent: data.amountRate,
      color: colorMap[data.categoryName] || colors.main,
    };
  });

  return (
    <WhiteBox>
      <BText style={{ alignSelf: 'flex-start' }} type="h3">
        {`${month}월 소비내역`}
      </BText>
      {!categoryData && (
        <View style={{ alignSelf: 'center' }}>
          <Spacing rem="3" />
          <BText type="bold">카드사 연동이 필요해요!</BText>
          <Spacing rem="3" />
        </View>
      )}
      {categoryData && (
        <View>
          <Spacing />
          <View style={styles.chart}>
            <CircleChart totalAmount={totalAmount} segments={segments} />
          </View>
          <Spacing />
          <View style={styles.text}>
            {categoryData.map((data, index) => (
              <View key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View style={{ width: '10%' }}>
                    <SvgIcons
                      name={data.categoryName}
                      fill={colorMap[data.categoryName] || colors.main}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <CategoryText
                      category={data.categoryName}
                      value={`${data.amount}원(${data.amountRate}%)`}
                    />
                  </View>
                </View>
                <Spacing rem="0.5" />
              </View>
            ))}
          </View>
        </View>
      )}
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
