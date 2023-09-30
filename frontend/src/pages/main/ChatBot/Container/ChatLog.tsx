import React from 'react';
import SvgIcons from '@common/assets/SvgIcons';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import colors from '@common/design/colors';
import { ChatLogProps } from '@interfaces/chatBot';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

function ChatLog({ keyword, type, message, onCardClick }: ChatLogProps) {
  if (type === 'request' && typeof message === 'string') {
    return (
      <View>
        <View style={styles.request}>
          <BText color={colors.white}>{message}</BText>
        </View>
        <Spacing />
      </View>
    );
  } else {
    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '10%' }}>
            <SvgIcons name="Whale" size={30} />
          </View>
          <View style={styles.response}>
            {typeof message === 'string' ? (
              <BText color={colors.white}>{message}</BText>
            ) : (
              <View>
                <BText color={colors.white}>{keyword}에 어울리는 카드 추천해드릴게요!</BText>
                <Spacing />
                {message.map((card, idx) => (
                  <View key={idx}>
                    <TouchableOpacity
                      onPress={() => {
                        if (onCardClick) {
                          onCardClick(card.cardname, card.benefitId);
                        }
                      }}
                    >
                      <BText color={colors.white}>{card.cardname}</BText>
                      <BText color={colors.white}>{card.benefit}</BText>
                    </TouchableOpacity>
                    <Spacing />
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
        <Spacing />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  request: {
    padding: 12,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    backgroundColor: colors.main,
    maxWidth: '80%',
    minWidth: '20%',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  response: {
    padding: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    backgroundColor: colors.main2,
    color: colors.white,
    maxWidth: '80%',
    minWidth: '20%',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default ChatLog;
