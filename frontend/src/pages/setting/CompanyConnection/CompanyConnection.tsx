import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

import { CompanyConnectionNavigationProps } from 'interfaces/navigation';
import { Spacing } from '@common/components/Spacing';
import WhitePage from '@common/components/WhitePage';
import ConnectedCompany from './Container/ConnectedCompany';
import BHr from '@common/components/BHr';
import SubmitButton from '@common/components/SubmitButton';

function CompanyConnection({ navigation }: CompanyConnectionNavigationProps) {
  return (
    <WhitePage>
      <Spacing />
      <ConnectedCompany
        name="카카오뱅크"
        cardId={1}
        image="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99BCB0335D089C1434"
      />
      <ConnectedCompany
        name="카카오뱅크"
        cardId={1}
        image="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99BCB0335D089C1434"
      />
      <View style={styles.button}>
        <SubmitButton
          title="자산 연결하러가기"
          onPress={() => {
            navigation.push('CompanyManagement');
          }}
        />
      </View>
    </WhitePage>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default CompanyConnection;
