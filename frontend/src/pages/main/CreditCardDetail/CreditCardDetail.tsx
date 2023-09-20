import React, { useEffect, useState } from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView } from 'react-native';

import Page from '@common/components/Page';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import IconButton from '@common/components/IconButton';

import DateOption from './Container/DateOption';
import CardConsumption from './Container/CardConsumption';
import useDateOption from 'hooks/useDateOption';
import { CreditCardDetailNavigationProps } from 'interfaces/navigation';
import CautionModal from './Container/CautionModal';
import myData, { CardDetailData } from '@api/myData';
import WhitePage from '@common/components/WhitePage';
import colors from '@common/design/colors';
import BHr from '@common/components/BHr';

function CreditCardDetail({ navigation, route }: CreditCardDetailNavigationProps) {
  const cardId = route.params.cardId;
  const { selectedDate, showModal, setShowModal, selectDate, setSelectedDate } = useDateOption();
  const [showCautionModal, setShowCautionModal] = useState(false);

  const [data, setData] = useState<CardDetailData>();

  useEffect(() => {
    myData
      .cardDetail({ cardId: cardId, year: selectedDate.year, month: selectedDate.month })
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
  }, [selectedDate]);

  console.log(data?.cardImgUrl);

  return (
    <Page>
      {(showModal || showCautionModal) && <View style={styles.overlay} />}

      <View style={styles.cardTitle}>
        <View>
          <BText type="h3">{data?.cardName}</BText>
          <BText>{data?.cardCompanyName}</BText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BText type="h1">{`${data?.totalAmount.toLocaleString()} 원`}</BText>
            <CautionModal
              showCautionModal={showCautionModal}
              setShowCautionModal={setShowCautionModal}
            />
          </View>
        </View>
        {data?.cardImgUrl && <Image style={styles.image} source={{ uri: data?.cardImgUrl }} />}
      </View>
      <Spacing rem="1.5" />
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
      <Spacing rem="1" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={
          data?.dayTransactionResponseDtoList.length !== 0
            ? styles.purchase
            : styles.noPurchaseMonth
        }
      >
        {data?.dayTransactionResponseDtoList.length !== 0 ? (
          data?.dayTransactionResponseDtoList
            .sort((a, b) => {
              return (
                Number(b.transactionDate.slice(8, 10)) - Number(a.transactionDate.slice(8, 10))
              );
            })
            .map((value) => (
              <CardConsumption
                transactionDate={value.transactionDate}
                transcationInfoResponseDtoList={value.transcationInfoResponseDtoList}
              />
            ))
        ) : (
          <BText>해당 월에는 결제 내역이 없어요</BText>
        )}
      </ScrollView>
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
    width: '15%',
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
    width: '150%',
    height: '150%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    alignSelf: 'center',
  },
  scroll: {
    width: '100%',
    backgroundColor: colors.white,
    maxHeight: '80%',
    borderRadius: 10,
  },
  purchase: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5,
  },
  noPurchaseMonth: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default CreditCardDetail;
