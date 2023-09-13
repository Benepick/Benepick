import React from 'react';
import { ImageSourcePropType, StyleSheet, View, Image } from 'react-native';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import BHr from '@common/components/BHr';
import colors from '@common/design/colors';

function ConnectedCompany({ image, name, cardId }: ConnectedCompanyProps) {
  return (
    <View>
      <Spacing rem="0.5" />
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: image }} />
        <Spacing rem="0.5" dir="row" />
        <View style={styles.text}>
          <BText>{name}</BText>
          <BText color={colors.disabled}>({cardId})연결끊기</BText>
        </View>
      </View>
      <Spacing rem="0.5" />
      <BHr />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default ConnectedCompany;
