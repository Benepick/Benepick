import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { TermsNavigationProps } from 'interfaces/navigation';
import WhitePage from '@common/components/WhitePage';
import SubmitButton from '@common/components/SubmitButton';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import BCheckBox from '@common/components/BCheckBox';
import { Spacing } from '@common/components/Spacing';

function Terms({ navigation, route }: TermsNavigationProps) {
  const [isChecked, setIsChecked] = useState<boolean>(route.params.isRead);

  const moveToNext = () => {
    if (isChecked) {
      navigation.push('PersonalAuth');
    }
  };
  return (
    <WhitePage>
      <View style={styles.container}>
        <View>
          <View style={styles.row}>
            <BText type="h2" color={colors.main}>
              베네픽
            </BText>
            <BText type="h2"> 사용을 위한</BText>
          </View>
          <BText type="h2">이용약관을 확인해 주세요</BText>
        </View>
        <View>
          <SubmitButton title="이용약관 확인하기" onPress={() => navigation.push('ReadTerms')} />
          <Spacing rem="1" />
          <View style={styles.rowCenter}>
            <BCheckBox size={1} value={isChecked} />
            <Spacing dir="row" />
            <BText type="p">모든 사항에 동의합니다</BText>
          </View>
        </View>
        <View>
          <SubmitButton
            title="완료"
            color={isChecked ? colors.main : colors.disabled}
            onPress={moveToNext}
          />
          <Spacing rem="1" />
        </View>
      </View>
    </WhitePage>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Terms;
