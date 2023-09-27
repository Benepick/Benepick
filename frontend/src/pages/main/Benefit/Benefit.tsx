import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';

import { BenefitNavigationProps } from 'interfaces/navigation';

import SearchInput from '@common/components/SearchInput';
import BenfitCard from './Container/BenfitCard';
import BText from '@common/components/BText';
import BHr from '@common/components/BHr';
import { Spacing } from '@common/components/Spacing';
import Page from '@common/components/Page';
import WhiteBox from '@common/components/WhiteBox';
import card, { BefitAllCard, BefitUserCard } from '@api/card';

function Benefit({ navigation, route }: BenefitNavigationProps) {
  const [keyword, setKeyword] = useState('');
  const [benefitUserData, setBenefitUserData] = useState<BefitUserCard[]>([]);
  const [benefitAllData, setBenefitAllData] = useState<BefitAllCard[]>([]);
  const [isError, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [isSearched, setSearched] = useState(false);

  useEffect(() => {
    if (route.params.place && route.params.place.length > 0) {
      searchBenefit(route.params.place);
      setKeyword(route.params.place);
    }
  }, [route.params.place]);

  useEffect(() => {
    return navigation.setParams({ place: '' });
  }, []);

  const searchBenefit = (keyword: string) => {
    if (keyword.length !== 0) {
      // 내 카드 조회
      card
        .benefitUser(keyword.trim())
        .then((res) => {
          if (res.statusCode === 200) {
            setBenefitUserData(res.data);
            setSearched(true);
          } else {
            setSearched(false);
          }
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });

      // 전체 카드 조회
      card
        .benefitAll(keyword.trim())
        .then((res) => {
          if (res.statusCode === 200) {
            setBenefitAllData(res.data);
            setSearched(true);
          } else {
            setSearched(false);
          }
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
      setTitle(keyword);
    } else {
      Alert.alert('검색어를 입력하세요');
    }
  };

  return (
    <Page>
      {!isError && (
        <ScrollView
          contentContainerStyle={{ height: isSearched ? null : '100%' }}
          showsVerticalScrollIndicator={false}
        >
          <Spacing rem="0.5" />
          <View
            style={{
              flex: isSearched ? 0 : 1,
              justifyContent: isSearched ? 'flex-start' : 'center',
            }}
          >
            <SearchInput
              value={keyword}
              onChangeText={(e) => setKeyword(e)}
              onSubmitEditing={() => searchBenefit(keyword)}
            />
          </View>
          {isSearched && (
            <View>
              <Spacing />
              <WhiteBox>
                <BText style={{ alignSelf: 'flex-start' }} type="h3">
                  {benefitUserData.length === 0
                    ? `${title}에서 혜택을 받을 수 있는 카드가 없어요`
                    : `${title}에서 사용할 카드 추천드려요`}
                </BText>

                {benefitUserData.length !== 0 &&
                  benefitUserData.map((data, idx) => {
                    return (
                      <View key={idx}>
                        <Spacing />
                        <BenfitCard
                          cardName={data.cardName}
                          category={data.category}
                          cardImgUrl={data.cardImgUrl}
                          cardCompanyName={data.cardCompanyName}
                          discountPercent={data.discountPercent}
                          discountTarget={data.discountTarget}
                          remainedBenefit={data.remainedBenefit}
                        />
                        <Spacing rem="0.5" />
                        <BHr />
                      </View>
                    );
                  })}
              </WhiteBox>
              <Spacing />
              <WhiteBox>
                <BText style={{ alignSelf: 'flex-start' }} type="h3">
                  이런 카드는 어때요?
                </BText>
                {benefitAllData.length !== 0 &&
                  benefitAllData.map((data, idx) => {
                    return (
                      <View key={idx}>
                        <Spacing />
                        <BenfitCard
                          cardName={data.cardName}
                          category={data.category}
                          cardImgUrl={data.cardImgUrl}
                          cardCompanyName={data.cardCompanyName}
                          discountPercent={data.discountPercent}
                          discountTarget={data.discountTarget}
                          benefitLimit={data.benefitLimit}
                        />
                        <Spacing rem="0.5" />
                        <BHr />
                      </View>
                    );
                  })}
                {benefitAllData.length === 0 && (
                  <BText style={{ alignSelf: 'flex-start' }} type="bold">
                    카드가 없어요
                  </BText>
                )}
              </WhiteBox>
              <Spacing rem="1" />
            </View>
          )}
        </ScrollView>
      )}
      {isError && (
        <View>
          <BText type="h1">잘못된 접근입니다</BText>
        </View>
      )}
    </Page>
  );
}

export default Benefit;
