import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';

import colors from '@common/design/colors';
import { Spacing } from '@common/components/Spacing';
import BText from '@common/components/BText';

import ChatInput from './Container/ChatInput';
import ChatLog from './Container/ChatLog';

import { ChatBotNavigationProps } from 'interfaces/navigation';
import { ChatLogProps } from '@interfaces/chatBot';

function ChatBot({ navigation }: ChatBotNavigationProps) {
  const [value, setValue] = useState('');
  const [chatLogs, setChatLogs] = useState<ChatLogProps[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleInput = () => {
    const newLog = { request: value, response: '안녕하신가요' };
    setChatLogs([...chatLogs, newLog]);
    scrollViewRef.current?.scrollToEnd({ animated: true });
    setValue('');
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  // 애니메이션 로직
  const translateY = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    >
      <Animated.View
        style={[
          {
            transform: [{ translateY: translateY }],
          },
        ]}
      >
        <View style={[styles.chatRoom]}>
          {chatLogs.length === 0 && (
            <View style={{ alignSelf: 'center' }}>
              <Spacing rem="2" />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BText type="h2" color={colors.main}>
                  김성용님
                </BText>
                <BText type="h2">을 위한 카드추천 챗봇입니다</BText>
              </View>
            </View>
          )}
          <ScrollView
            style={styles.chatLog}
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Spacing />
              {chatLogs.map((log, index) => (
                <View key={index}>
                  <ChatLog requestMessage={log.request} responseMessage={log.response} />
                </View>
              ))}
            </View>
          </ScrollView>
          <ChatInput
            inputProps={{
              onChangeText: (e) => setValue(e),
              placeholder: '무엇이든 물어보세요',
              value: value,
              onSubmitEditing: () => handleInput(),
            }}
            touchableOpacityProps={{
              onPress: () => handleInput(),
            }}
          />
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chatRoom: {
    backgroundColor: colors.white,
    height: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexShrink: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },

  chatLog: {
    width: '100%',
    height: '75%',
    alignSelf: 'center',
  },
});

export default ChatBot;
