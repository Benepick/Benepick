import React from 'react';
import SvgIcons from '@common/assets/SvgIcons';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import colors from '@common/design/colors';
import { ChatLogProps } from '@interfaces/chatBot';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

function ChatLog({
  keyword,
  type,
  message,
  onLocationClick,
  onCardClick,
  isLoading,
}: ChatLogProps) {
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
                <BText color={colors.white}>카드를 클릭해서 카드 정보를 확인하세요</BText>
                <Spacing />
                {message.map((card, idx) => (
                  <View key={idx} style={{ alignSelf: 'center', width: '90%' }}>
                    <View
                      style={{
                        backgroundColor: colors.main,
                        borderRadius: 10,
                        padding: 5,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.5}
                        disabled={isLoading}
                        style={{
                          backgroundColor: colors.main,
                          borderRadius: 10,
                          padding: 5,
                          width: '100%',
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}
                        onPress={() => {
                          if (onCardClick) {
                            onCardClick(card.cardname);
                          }
                        }}
                      >
                        <SvgIcons name="Card" fill={colors.white} />
                        <Spacing dir="row" rem="0.5" />
                        <View style={{ width: '90%' }}>
                          <BText color={colors.white} numberOfLines={1} ellipsizeMode="tail">
                            {card.cardname}
                          </BText>
                        </View>
                      </TouchableOpacity>
                      <Spacing rem="0.5" />
                      <TouchableOpacity
                        style={{
                          backgroundColor: colors.white,
                          borderRadius: 5,
                          padding: 5,
                          width: '100%',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                        activeOpacity={0.5}
                        disabled={isLoading}
                        onPress={() => {
                          if (onLocationClick) {
                            onLocationClick(card.cardname, card.benefitId);
                          }
                        }}
                      >
                        <View style={{ width: '75%' }}>
                          <BText color={colors.main} numberOfLines={1} ellipsizeMode="tail">
                            {card.benefit}
                          </BText>
                        </View>
                        <View style={{ width: '25%' }}>
                          <BText color={colors.main2}>Click!</BText>
                        </View>
                      </TouchableOpacity>
                    </View>
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
    flexWrap: 'wrap',
    maxWidth: '80%',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default ChatLog;
