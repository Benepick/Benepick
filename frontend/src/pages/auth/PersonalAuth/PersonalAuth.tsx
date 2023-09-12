import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PersonalAuthNavigationProps } from 'interfaces/navigation';
import WhitePage from '@common/components/WhitePage';
import BText from '@common/components/BText';
import colors from '@common/design/colors';
import SubmitButton from '@common/components/SubmitButton';
import BInput from '@common/components/BInput';
import CoveringPoints from '@common/components/CoveringPoints';
import SvgIcons from '@common/assets/SvgIcons';

function PersonalAuth({ navigation }: PersonalAuthNavigationProps) {
  const [userName, setUserName] = useState('');
  const [userSocialNumber, setUserSocialNumber] = useState('');
  const [userGenderAndGenerationCode, setUserGenderAndGenerationCode] = useState('');

  const userData = {
    userName: userName,
    userSocialNumber: userSocialNumber,
    userGenderAndGenerationCode: userGenderAndGenerationCode,
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
        <BText type="h2">본인인증을 진행할게요</BText>
      </View>
      <BInput label="이름" onChangeText={setUserName} value={userName} />
      <View style={styles.rowCenter}>
        <BInput
          label="주민등록번호"
          style={{ width: '38%' }}
          maxLength={6}
          inputMode="numeric"
          onChangeText={setUserSocialNumber}
          value={userSocialNumber}
        />
        <SvgIcons name="Remove" />
        <BInput
          style={{ width: '7%' }}
          maxLength={1}
          inputMode="numeric"
          onChangeText={setUserGenderAndGenerationCode}
          value={userGenderAndGenerationCode}
        />
        <CoveringPoints num={6} size={18} />
      </View>
      <SubmitButton
        title="다음"
        onPress={() => navigation.push('PhoneAuth', { userData: userData })}
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
});

export default PersonalAuth;
