import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

import { ChatBotNavigationProps } from 'interfaces/navigation';
import Page from '@common/components/Page';
import colors from '@common/design/colors';

function ChatBot({ navigation }: ChatBotNavigationProps) {
  return (
    <View>
      <View style={styles.chatRoom}>{/* <Text>챗봇</Text> */}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatRoom: {
    width: '100%',
    backgroundColor: colors.white,
    height: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexShrink: 1,
  },
});

export default ChatBot;
