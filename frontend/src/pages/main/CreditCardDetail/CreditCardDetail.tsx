import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';

import CautionModal from './Container/CautionModal';
import DateOption from './Container/DateOption';
import CardConsumption from './Container/CardConsumption';

import Page from '@common/components/Page';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';

import { CreditCardDetailNavigationProps } from 'interfaces/navigation';
import useDateOption from 'hooks/useDateOption';
import myData, { CardDetailData } from '@api/myData';

import colors from '@common/design/colors';
import WhiteBox from '@common/components/WhiteBox';
import card, { Benefit } from '@api/card';
import SvgIcons from '@common/assets/SvgIcons';
import Loading from '@pages/Loading/Loading';

function CreditCardDetail({ navigation, route }: CreditCardDetailNavigationProps) {
  const cardId = route.params.cardId;
  const {
    selectedDate,
    showModal,
    setShowModal,
    selectDate,
    setSelectedDate,
    showBenefit,
    setShowBenefit,
  } = useDateOption();
  const [showCautionModal, setShowCautionModal] = useState(false);

  const [data, setData] = useState<CardDetailData>();
  const [cardBenefitData, setCardBenefitData] = useState<Benefit[]>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    myData
      .cardDetail({ cardId: cardId, year: selectedDate.year, month: selectedDate.month })
      .then((response) => {
        if (response.statusCode === 200) {
          setData(response.data);
          setLoading(false);
        } else {
          console.log(response.statusCode);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedDate]);

  useEffect(() => {
    if (showBenefit) {
      card
        .benefit(cardId)
        .then((res) => {
          if (res.statusCode === 200) {
            setCardBenefitData(res.data);
          } else {
            console.log(res.statusCode);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showBenefit]);

  return (
    <Page>
      {!isLoading && (showModal || showCautionModal) && <View style={styles.overlay} />}
      {isLoading && (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Loading />
          <BText type="h3">카드를 불러오고 있어요!...</BText>
        </View>
      )}
      {!isLoading && (
        <View>
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

            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor={'transparents'}
              onPress={() => setShowBenefit(!showBenefit)}
            >
              <BText>{showBenefit ? '소비내역보기' : '혜택보기'}</BText>
            </TouchableHighlight>
          </View>
          <Spacing rem="1" />
          {showBenefit && (
            <WhiteBox style={{ justifyContent: 'center' }}>
              <Spacing />
              {cardBenefitData?.map((data) => {
                const totalDiscount = data.cardBenefitDiscountResponseDtoList.reduce(
                  (sum, dto) => sum + dto.discountPercent,
                  0,
                );
                const totalCount = data.cardBenefitDiscountResponseDtoList.length;

                const averageDiscount = (totalDiscount / totalCount).toFixed(1);

                return (
                  <View key={data.category1Name}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <SvgIcons
                        name={data.category1Name === '카페/간식' ? '카페' : data.category1Name}
                        size={30}
                      />
                      <Spacing dir="row" />
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <BText>{data.category1Name} 구간별 평균 </BText>
                        <BText type="h3">{averageDiscount}% </BText>
                        <BText>할인</BText>
                      </View>
                    </View>
                    <Spacing />
                  </View>
                );
              })}
            </WhiteBox>
          )}
          {!showBenefit && (
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
                      Number(b.transactionDate.slice(8, 10)) -
                      Number(a.transactionDate.slice(8, 10))
                    );
                  })
                  .map((value, idx) => (
                    <CardConsumption
                      key={idx}
                      transactionDate={value.transactionDate}
                      transcationInfoResponseDtoList={value.transcationInfoResponseDtoList}
                    />
                  ))
              ) : (
                <BText>해당 월에는 결제 내역이 없어요</BText>
              )}
            </ScrollView>
          )}
        </View>
      )}
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
    width: '500%',
    height: '500%',
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
