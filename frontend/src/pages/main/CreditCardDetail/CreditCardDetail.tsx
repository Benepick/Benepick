import React from 'react';
import { View, Button, Text } from 'react-native';

import { CreditCardDetailNavigationProps } from 'interfaces/navigation';
import Page from '@common/components/Page';

function CreditCardDetail({ navigation }: CreditCardDetailNavigationProps) {
  return (
    <Page>
      <Text>내 카드 상세</Text>
    </Page>
  );
}

export default CreditCardDetail;
