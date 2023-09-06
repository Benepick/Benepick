import React, { useState } from 'react';
import { Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView, View } from 'react-native';
import AlarmButton from '../../common/components/AlarmButton';

import IconButton from '@common/components/IconButton';
import SubmitButton from '@common/components/SubmitButton';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import BInput from '@common/components/BInput';
import ProgressNode from '@common/components/progress/ProgressNode';
import RequestButton from '@common/components/RequestButton';
import CompanySelectBox from '@common/components/CompanySelectBox';
import BSwitch from '@common/components/BSwitch';
import BCheckBox from '@common/components/BCheckBox';

function Test() {
  const [text, setText] = useState('글씨를 입력하세요');

  const [value, setValue] = useState(false);

  const [checkValue, setCheckValue] = useState(false);

  const onPress = () => {
    setValue(!value);
  };

  const checkPress = () => {
    setCheckValue(!checkValue);
  };

  return (
    <ScrollView>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <AlarmButton isAlarmed={false} onPress={() => console.log('알람크릭')} />
        <Spacing rem="5" dir="row" />
        <IconButton name="ChatBot" />
      </View>
      <SubmitButton title="제출버튼입니다" onPress={() => console.log('제출크릭')} />
      <BText type="h1">제목입니다.</BText>
      <BText type="h2">부제목입니다.</BText>
      <BText type="h3">부부제목입니다.</BText>
      <BText type="bold">볼드체입니다.</BText>
      <BText type="p">{text}</BText>
      <Spacing rem="1" />

      <BInput label="인풋입니다" onChangeText={(e) => setText(e)} />
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ width: '77%' }}>
          <BInput label="인풋2입니다" />
        </View>
        <View style={{ width: '20%', alignSelf: 'center' }}>
          <RequestButton title="재요청" />
        </View>
      </View>
      <BText type="p" style={{ alignSelf: 'center' }}>
        볼드체입니다.
      </BText>
      <ProgressNode size={30} page={3} current={1} />
      <ProgressNode size={30} page={3} current={2} />
      <ProgressNode size={30} page={3} current={3} />
      <CompanySelectBox
        name="카카오뱅크"
        size={30}
        state="linked"
        image="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99BCB0335D089C1434"
      />
      <Spacing rem="1" />
      <BSwitch size={1} onPress={onPress} value={value} />
      <Spacing rem="1" />
      <Spacing rem="1" />
      <BCheckBox size={1} onPress={checkPress} value={checkValue} />
    </ScrollView>
  );
}

export default Test;
