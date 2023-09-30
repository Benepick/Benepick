import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';

import { CompanyConnectionNavigationProps } from 'interfaces/navigation';
import { Spacing } from '@common/components/Spacing';
import WhitePage from '@common/components/WhitePage';
import ConnectedCompany from './Container/ConnectedCompany';
import SubmitButton from '@common/components/SubmitButton';
import user from '@api/user';
import cardCompany, { CardCompany } from '@api/cardCompany';
import BText from '@common/components/BText';
import Loading from '@pages/Loading/Loading';

function CompanyConnection({ navigation }: CompanyConnectionNavigationProps) {
  const [cardCompanys, setCardCompanys] = useState<CardCompany[] | []>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    user
      .cardCompany()
      .then((res) => {
        if (res.statusCode === 200) {
          setCardCompanys(res.data);
          setLoading(false);
        } else {
          Alert.alert('카드사 조회에 실패하였습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 연결끊기
  const deleteCompany = (cardCompanyId: number) => {
    cardCompany
      .delete(cardCompanyId)
      .then((res) => {
        if (res.statusCode === 200) {
          setCardCompanys((prevCardCompanys) => {
            return prevCardCompanys.filter((company) => company.cardCompanyId !== cardCompanyId);
          });
        } else if (res.statusCode === 451) {
          Alert.alert('이미 연결이 해제되어있습니다.');
        } else {
          Alert.alert('연결 끊기에 실패하였습니다');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <WhitePage>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacing />
        {isLoading && (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Loading />
            <BText type="h3">연결된 카드를 가져오고 있어요...</BText>
          </View>
        )}
        {!isLoading && cardCompanys.length === 0 && (
          <View>
            <BText type="h2">연결된 카드가 없습니다</BText>
          </View>
        )}
        {!isLoading &&
          cardCompanys &&
          cardCompanys.map((cardCompany) => {
            return (
              <ConnectedCompany
                key={cardCompany.cardCompanyId}
                name={cardCompany.cardCompanyName}
                cardId={cardCompany.cardCompanyId}
                deleteCompany={() => deleteCompany(cardCompany.cardCompanyId)}
                image={cardCompany.cardCompanyImgUrl}
              />
            );
          })}
        <View style={styles.button}>
          {!isLoading && (
            <SubmitButton
              title="자산 연결하러가기"
              onPress={() => {
                navigation.push('CompanyManagement');
              }}
            />
          )}
          <Spacing />
        </View>
      </ScrollView>
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
