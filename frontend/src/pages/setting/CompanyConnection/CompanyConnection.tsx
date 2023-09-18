import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { CompanyConnectionNavigationProps } from 'interfaces/navigation';
import { Spacing } from '@common/components/Spacing';
import WhitePage from '@common/components/WhitePage';
import ConnectedCompany from './Container/ConnectedCompany';
import SubmitButton from '@common/components/SubmitButton';
import user from '@api/user';
import cardCompany, { CardCompany } from '@api/cardCompany';

function CompanyConnection({ navigation }: CompanyConnectionNavigationProps) {
  const [cardCompanys, setCardCompanys] = useState<CardCompany[] | []>([]);
  useEffect(() => {
    user
      .cardCompany()
      .then((res) => {
        setCardCompanys(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 연결끊기
  const deleteCompany = (cardCompanyId: number) => {
    cardCompany
      .delete(cardCompanyId)
      .then(() => {
        setCardCompanys((prevCardCompanys) => {
          return prevCardCompanys.filter((company) => company.cardCompanyId !== cardCompanyId);
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <WhitePage>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacing />
        {cardCompanys &&
          cardCompanys.map((cardCompany) => {
            return (
              <ConnectedCompany
                key={cardCompany.cardCompanyId}
                name={cardCompany.cardCompanyName}
                cardId={cardCompany.cardCompanyId}
                deleteCompany={() => deleteCompany(cardCompany.cardCompanyId)}
                image="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99BCB0335D089C1434"
              />
            );
          })}
        <View style={styles.button}>
          <SubmitButton
            title="자산 연결하러가기"
            onPress={() => {
              navigation.push('CompanyManagement');
            }}
          />
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
