import React, { useState } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import { PhoneAuthNavigationProps } from 'interfaces/navigation';
import WhitePage from '@common/components/WhitePage';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import BInput from '@common/components/BInput';
import SubmitButton from '@common/components/SubmitButton';
import RequestButton from '@common/components/RequestButton';

function PhoneAuth({ navigation, route }: PhoneAuthNavigationProps) {
  const [mobileCarrier, setMobileCarrier] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [authenticationNumber, setAuthenticationNumber] = useState('');

  const [requestButtonTitle, setRequestButtonTitle] = useState('요청');

  const userData = {
    userName: route.params.userData.userName,
    userSocialNumber: route.params.userData.userSocialNumber,
    userPhoneNumber: userPhoneNumber,
    userGenderAndGenerationCode: route.params.userData.userGenderAndGenerationCode,
  };

  const phoneAuthData = {
    mobileCarrier: mobileCarrier,
    userPhoneNumber: userPhoneNumber,
  };

  const requestAuth = () => {
    setRequestButtonTitle('재요청');
  };

  const authComplete = () => {
    console.log(userData);
  };

  return (
    <WhitePage>
      <View>
        <View style={styles.row}>
          <BText type="h2" color={colors.main}>
            베네픽
          </BText>
          <BText type="h2"> 사용을 위한</BText>
        </View>
        <BText type="h2">휴대폰 인증을 진행할게요</BText>
      </View>
      <BInput label="통신사" onChangeText={setMobileCarrier} value={mobileCarrier} />
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ width: '77%' }}>
          <BInput
            label="휴대폰번호"
            maxLength={11}
            inputMode="numeric"
            onChangeText={setUserPhoneNumber}
            value={userPhoneNumber}
          />
        </View>
        <View style={{ width: '20%', alignSelf: 'center' }}>
          <RequestButton title={requestButtonTitle} onPress={requestAuth} />
        </View>
      </View>
      <BInput
        label="인증번호 6자리"
        maxLength={6}
        inputMode="numeric"
        onChangeText={setAuthenticationNumber}
        value={authenticationNumber}
      />
      <SubmitButton title="인증하기" onPress={authComplete} />
    </WhitePage>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PhoneAuth;
