import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import WhiteBox from '@common/components/WhiteBox';

import myData, { PaymentData } from '@api/myData';

function MonthlyConsumption() {
  const [data, setData] = useState<PaymentData>();

  useEffect(() => {
    myData
      .payment()
      .then((response) => {
        if (response.statusCode === 200) {
          setData(response.data);
        } else {
          console.log('Error Code: ', response.statusCode);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);

  return (
    <WhiteBox>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Image
          style={styles.image}
          source={{
            uri: data?.imgUrl
              ? data.imgUrl
              : 'https://api.card-gorilla.com:8080/storage/card/422/card_img/20920/422card.png',
          }}
        />
        <View style={{ width: '75%', justifyContent: 'center' }}>
          <View style={styles.description}>
            <BText type="bold">사용금액</BText>
            <BText>{data?.payAmount.toLocaleString()} 원</BText>
          </View>
          <Spacing rem="0.5" />
          <View style={styles.description}>
            <BText type="bold">받은혜택</BText>
            <BText>{data?.benefitAmount.toLocaleString()} 원</BText>
          </View>
        </View>
      </View>
    </WhiteBox>
  );
}
const styles = StyleSheet.create({
  title: {
    display: 'flex',
    flexDirection: 'row',
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '10%',
    aspectRatio: 1 / 1.58,
    borderRadius: 3,
    marginLeft: -10,
    marginRight: 10,
  },
});

export default MonthlyConsumption;
