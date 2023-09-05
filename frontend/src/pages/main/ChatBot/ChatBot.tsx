import React from 'react';
import { View, Button, Text } from 'react-native';

import { ChatBotNavigationProps } from '@common/interfaces/navigation';

function ChatBot({ navigation }: ChatBotNavigationProps) {
  return (
    <View>
      <Text>챗봇</Text>
    </View>
  );
}

export default ChatBot;
