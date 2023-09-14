import React from 'react';
import { Text, View, Button, StatusBar } from 'react-native';

import { StartNavigationProps } from 'interfaces/navigation';
import colors from '@common/design/colors';
import { Spacing } from '@common/components/Spacing';

function Start({ navigation }: StartNavigationProps) {
  return (
    <View>
      {/* <Spacing rem="10" /> */}
      <Button
        title="BenePick 시작하기"
        onPress={() => navigation.push('Terms', { isRead: false })}
      />
      <Button title="간편 로그인 페이지로 이동하기" onPress={() => navigation.push('LogIn')} />
      <Button title="홈페이지로 이동하기" onPress={() => navigation.push('BottomTab')} />
      <Button title="테스트 페이지로 이동하기" onPress={() => navigation.push('Test')} />
      <Button title="익근" />
    </View>
  );
}

export default Start;
