import React from 'react';
import { Text, View } from 'react-native';
import AlarmButton from '../../common/components/AlarmButton';

import IconButton from '@common/components/IconButton';
import SubmitButton from '@common/components/SubmitButton';
import BText from '@common/components/BText';

function Test() {
  return (
    <View>
      <AlarmButton isAlarmed={false} onPress={() => console.log('알람크릭')} />
      <IconButton name="ChatBot" size={100} />
      <SubmitButton title="제출버튼입니다" />
      <BText type="h1">제목입니다.</BText>
      <BText type="h2">부제목입니다.</BText>
      <BText type="h3">부부제목입니다.</BText>
      <BText type="bold">볼드체입니다.</BText>
      <BText type="p">볼드체입니다.</BText>
    </View>
  );
}

export default Test;
