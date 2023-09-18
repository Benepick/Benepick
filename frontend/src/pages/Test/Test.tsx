import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import AlarmButton from '@common/components/AlarmButton';

import IconButton from '@common/components/IconButton';
import SubmitButton from '@common/components/SubmitButton';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import BInput from '@common/components/BInput';
import ProgressNode from '@common/components/progress/ProgressNode';
import RequestButton from '@common/components/RequestButton';
import CompanySelectBox from '@common/components/CompanySelectBox';
import BSwitch from '@common/components/BSwitch';
import SearchInput from '@common/components/SearchInput';
import PushAlert from '@common/utils/PushAlert';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setToken } from '@store/slices/userSlice';

function Test() {
  const [text, setText] = useState('글씨를 입력하세요');

  const [switchValue, setSwitchValue] = useState(false);
  const [search, setSearch] = useState('');

  const handleSwitch = () => {
    setSwitchValue(!switchValue);
  };

  console.log(search);

  return (
    <ScrollView>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <AlarmButton isAlarmed={false} onPress={() => console.log('알람크릭')} />
        <Spacing rem="5" dir="row" />
        <IconButton name="ChatBot" />
      </View>
      <SubmitButton
        title="제출버튼입니다"
        onPress={() => PushAlert({ channelId: 'shakePick', message: 'Message' })}
      />
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
      <SearchInput onChangeText={setSearch} />
      <BText type="p" style={{ alignSelf: 'center' }}>
        볼드체입니다.
      </BText>
      <ProgressNode size={30} page={3} current={1} />
      <ProgressNode size={30} page={3} current={2} />
      <ProgressNode size={30} page={3} current={3} />
      <Spacing rem="1" />
      <BSwitch size={1} onPress={handleSwitch} value={switchValue} />
    </ScrollView>
  );
}

export default Test;
