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
import { queryBenefits, retrieveCardDetails } from '@api/chatGPT';

function ChatBot({ navigation }: ChatBotNavigationProps) {
  const [value, setValue] = useState('');
  const [chatLogs, setChatLogs] = useState<ChatLogProps[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyword, setKeyword] = useState('');

  const handleInput = async () => {
    if (value.trim() === '') {
      return;
    }
    const newLogs: ChatLogProps[] = [{ type: 'request', message: value }];
    // API 호출
    try {
      const benefits = await queryBenefits(value);
      if (benefits && benefits.length > 0) {
        const cardData = benefits.map((b) => ({
          cardname: b.cardname,
          benefitId: b.benefitId,
          benefit: b.benefit,
        }));
        newLogs.push({ type: 'response', message: cardData });
        console.log(benefits);
      } else {
        newLogs.push({ type: 'response', message: '검색 결과가 없습니다.' });
      }
    } catch (error) {
      console.log(error);
      newLogs.push({ type: 'response', message: '오류가 발생했습니다. 다시 시도해주세요.' });
    }

    setChatLogs([...chatLogs, ...newLogs]);
    scrollViewRef.current?.scrollToEnd({ animated: true });
    setValue('');
    setKeyword(value);
  };

  const handleCardClick = async (cardname: string, benefitId: string) => {
    try {
      const message = await retrieveCardDetails(cardname, benefitId);
      // 상태를 업데이트하여 새로운 메시지를 추가
      setChatLogs([...chatLogs, { type: 'response', message }]);
    } catch (error) {
      console.error('Failed to retrieve card details', error);
    }
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
                <ChatLog
                  onCardClick={handleCardClick}
                  keyword={keyword}
                  key={index}
                  type={log.type}
                  message={log.message}
                />
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
