import SvgIcons from '@common/assets/SvgIcons';
import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import colors from '@common/design/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ChatLogProps {
  requestMessage: string;
  responseMessage: string;
}

function ChatLog({ requestMessage, responseMessage }: ChatLogProps) {
  return (
    <View>
      {requestMessage && (
        <View style={styles.requestMessage}>
          <BText color={colors.white}> {requestMessage}</BText>
        </View>
      )}
      {requestMessage && responseMessage && (
        <View>
          <Spacing />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <View style={{ width: '10%' }}>
              <SvgIcons name="Whale" size={30} />
            </View>
            <View style={styles.responseMessage}>
              <BText color={colors.white}> {responseMessage}</BText>
            </View>
          </View>
          <Spacing />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  requestMessage: {
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
  responseMessage: {
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
