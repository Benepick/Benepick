import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';

import WhitePage from '@common/components/WhitePage';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import BInput from '@common/components/BInput';
import SubmitButton from '@common/components/SubmitButton';
import RequestButton from '@common/components/RequestButton';
import SelectModal from './Components/SelectModal';

import { PhoneAuthNavigationProps } from 'interfaces/navigation';
import { Spacing } from '@common/components/Spacing';
import user from '@api/user';

function PhoneAuth({ navigation, route }: PhoneAuthNavigationProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [mobileCarrier, setMobileCarrier] = useState(' ');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authenticationNumber, setAuthenticationNumber] = useState('');
  const [responseNumber, setResponseNumber] = useState('');
  const [requestButtonTitle, setRequestButtonTitle] = useState('요청');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authButtonTitle, setAuthButtonTitle] = useState('인증하기');

  const userData = {
    userName: route.params.userData.userName,
    userSocialNumber: route.params.userData.userSocialNumber,
    userPhoneNumber: phoneNumber,
    userGenderAndGenerationCode: route.params.userData.userGenderAndGenerationCode,
  };

  const requestAuth = () => {
    user.phone(phoneNumber).then((response) => {
      setResponseNumber(response.data);
    });
    setRequestButtonTitle('요청완료');
  };

  const authComplete = () => {
    if (responseNumber === authenticationNumber) {
      setIsAuthenticated(true);
      Alert.alert('인증이 완료되었습니다.');
      setAuthButtonTitle('인증완료');
    } else {
      console.log(responseNumber);
      console.log(authenticationNumber);
      Alert.alert('인증번호를 확인해주세요');
    }
  };

  const moveToNext = () => {
    navigation.push('SetPassword', { userData: userData });
  };

  return (
    <WhitePage>
      <SelectModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setMobileCarrier={setMobileCarrier}
      />
      <View>
        <View style={styles.row}>
          <BText type="h2" color={colors.main}>
            베네픽
          </BText>
          <BText type="h2"> 사용을 위한</BText>
        </View>
        <BText type="h2">휴대폰 인증을 진행할게요</BText>
      </View>
      <Spacing rem="2" />
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.mobileCarrier}>
          <BText type="p" style={styles.title}>
            통신사 선택하기
          </BText>
          <BText type="h3" style={styles.content}>
            {mobileCarrier}
          </BText>
        </View>
      </TouchableWithoutFeedback>
      <Spacing />
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ width: '70%' }}>
          <BInput
            label="휴대폰번호"
            maxLength={11}
            inputMode="numeric"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
          />
        </View>
        <View style={{ width: '30%', alignSelf: 'center' }}>
          <RequestButton
            title={requestButtonTitle}
            onPress={requestAuth}
            color={requestButtonTitle === '요청' ? colors.main : colors.disabled}
          />
        </View>
      </View>
      <BInput
        label="인증번호 6자리"
        maxLength={6}
        inputMode="numeric"
        onChangeText={setAuthenticationNumber}
        value={authenticationNumber}
      />
      <SubmitButton
        title={authButtonTitle}
        onPress={authComplete}
        color={
          mobileCarrier.length >= 2 &&
          phoneNumber.length === 11 &&
          responseNumber &&
          authenticationNumber.length === 6 &&
          authButtonTitle === '인증하기'
            ? colors.main
            : colors.disabled
        }
      />
      <Spacing />
      <SubmitButton
        title="다음"
        onPress={moveToNext}
        color={isAuthenticated ? colors.main : colors.disabled}
      />
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
  modalView: {
    width: '70%',
    height: '50%',
    backgroundColor: 'white',
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    backgroundColor: colors.white,
    borderColor: colors.disabled,
    borderWidth: 1,
    justifyContent: 'center',
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mobileCarrier: {
    alignSelf: 'center',
    width: '93%',
    borderColor: colors.disabled,
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
  },
  title: {
    color: colors.placeholder,
  },
  content: {
    color: colors.main,
    marginLeft: 5,
  },
});

export default PhoneAuth;
