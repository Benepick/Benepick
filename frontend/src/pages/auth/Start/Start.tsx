import React from 'react';
import { Text, View, Button } from 'react-native';

import { StartNavigationProps } from 'interfaces/navigation';

function Start({ navigation }: StartNavigationProps) {
  return (
    <View>
      <Text>BenePick</Text>
      <Button
        title="BenePick 시작하기"
        onPress={() => navigation.push('Terms', { isRead: false })}
      />
      <Button title="간편 로그인 페이지로 이동하기" onPress={() => navigation.push('LogIn')} />
      <Button title="홈페이지로 이동하기" onPress={() => navigation.push('BottomTab')} />
      <Button title="테스트 페이지로 이동하기" onPress={() => navigation.push('Test')} />
      <Button title="익근" onPress={() => navigation.push('SetPassword', { userData: {} })} />
    </View>
  );
}

export default Start;
