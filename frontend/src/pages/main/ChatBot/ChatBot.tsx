import React from 'react';
import { View, Button, Text } from 'react-native';

import { ChatBotNavigationProps } from 'interfaces/navigation';
import Page from '@common/components/Page';

function ChatBot({ navigation }: ChatBotNavigationProps) {
  return (
    <Page>
      <Text>챗봇</Text>
    </Page>
  );
}

export default ChatBot;
