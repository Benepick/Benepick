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
import { queryBenefits, retrieveCardDetails, retrieveCardBenefits } from '@api/chatGPT';

function ChatBot({ navigation }: ChatBotNavigationProps) {
  const [value, setValue] = useState('');
  const [chatLogs, setChatLogs] = useState<ChatLogProps[]>([
    { type: 'response', message: '안녕하세요 \n궁금하신 혜택을 말씀해주세요\nex) 스타벅스' },
  ]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = async () => {
    if (value.trim() === '') {
      return;
    }
    const newLogs: ChatLogProps[] = [{ type: 'request', message: value }];
    setIsLoading(true);
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
        setIsLoading(false);
      } else {
        newLogs.push({ type: 'response', message: '검색 결과가 없습니다.' });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      newLogs.push({ type: 'response', message: '오류가 발생했습니다. 다시 시도해주세요.' });
      setIsLoading(false);
    }

    setChatLogs([...chatLogs, ...newLogs]);
    scrollViewRef.current?.scrollToEnd({ animated: true });
    setValue('');
    setKeyword(value);
  };

  const handleLocationClick = async (cardname: string, benefitId: string) => {
    setIsLoading(true);
    try {
      const message = await retrieveCardDetails(cardname, benefitId);
      setChatLogs([...chatLogs, { type: 'response', message }]);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to retrieve card details', error);
      setIsLoading(false);
    }
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleCardClick = async (cardname: string) => {
    setIsLoading(true);
    try {
      const message = await retrieveCardBenefits(cardname);

      setChatLogs([...chatLogs, { type: 'response', message }]);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to retrieve card details', error);
      setIsLoading(false);
    }
    scrollViewRef.current?.scrollToEnd({ animated: true });
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
          {chatLogs.length !== 0 && (
            <View style={{ alignSelf: 'flex-start' }}>
              <Spacing />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BText type="h2" color={colors.main}>
                  챗봇
                </BText>
                <BText type="h2">과 대화중</BText>
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
                  isLoading={isLoading}
                  onCardClick={handleCardClick}
                  onLocationClick={handleLocationClick}
                  keyword={keyword}
                  key={index}
                  type={log.type}
                  message={log.message}
                />
              ))}
            </View>
          </ScrollView>
          <ChatInput
            isLoading={isLoading}
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
