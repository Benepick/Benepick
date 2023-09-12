import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet } from 'react-native';

import Page from '@common/components/Page';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import IconButton from '@common/components/IconButton';

import DateOption from './Container/DateOption';
import CardConsumption from './Container/CardConsumption';
import useDateOption from 'hooks/useDateOption';
import { CreditCardDetailNavigationProps } from 'interfaces/navigation';
import CautionModal from './Container/CautionModal';

function CreditCardDetail({ navigation, route }: CreditCardDetailNavigationProps) {
  const { params } = route.params;
  const { selectedDate, showModal, setShowModal, selectDate, setSelectedDate } = useDateOption();
  const [showCautionModal, setShowCautionModal] = useState(false);

  const sampleData = {
    cardName: '롯데카드',
    cardType: 'LOCA 365 카드',
    benefitAmount: '250,000',
    usedAmount: '500,000',
    nextSection: '0',
    image: require('@common/assets/images/cardImg.png'),
  };

  return (
    <Page>
      {(showModal || showCautionModal) && (
        <View
          style={{
            width: '120%',
            height: '120%',
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
          }}
        />
      )}

      <View style={styles.cardTitle}>
        <View>
          <BText type="h3">{sampleData.cardName}</BText>
          <BText>{sampleData.cardType}</BText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BText type="h1">{`${sampleData.usedAmount}원`}</BText>
            <CautionModal
              showCautionModal={showCautionModal}
              setShowCautionModal={setShowCautionModal}
            />
          </View>
        </View>
        <Image style={styles.image} source={sampleData.image} />
      </View>
      <Spacing />
      <View style={styles.dateOption}>
        <DateOption
          showModal={showModal}
          setShowModal={setShowModal}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectDate={selectDate}
        />
        <IconButton name="Refresh" />
      </View>
      <Spacing rem="0.5" />
      <CardConsumption />
    </Page>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
  image: {
    maxWidth: '15%',
    aspectRatio: 1 / 1.58,
  },
  dateOption: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default CreditCardDetail;
