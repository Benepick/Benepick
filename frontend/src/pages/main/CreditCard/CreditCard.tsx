import React from 'react';
import { View, Button, Text } from 'react-native';

import { CreditCardNavigationProps } from 'interfaces/navigation';
import Page from '@common/components/Page';

function CreditCard({ navigation }: CreditCardNavigationProps) {
  return (
    <Page>
      <Text>내 카드</Text>
      <Button title="카드 상세" onPress={() => navigation.push('CreditCardDetail')} />
    </Page>
  );
}

export default CreditCard;
