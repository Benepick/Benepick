import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import BText from '@common/components/BText';
import IconButton from '@common/components/IconButton';
import { Spacing } from '@common/components/Spacing';
import SubmitButton from '@common/components/SubmitButton';
import colors from '@common/design/colors';

import { CautionModalProps } from '@interfaces/creditCard';

function CautionModal({ showCautionModal, setShowCautionModal }: CautionModalProps) {
  return (
    <View>
      <IconButton name="Error" onPress={() => setShowCautionModal(!showCautionModal)} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={showCautionModal}
        onRequestClose={() => setShowCautionModal(false)}
      >
        <View style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.description}>
              <BText type="h3">카드사에서 일부 내역을 전달하지 않아요</BText>
              <Spacing rem="0.25" />
              <BText>
                매입 취소, 정기결제, 교통비 등의 카드 사용 내역은 카드사에서 제공해주는 시점에 따라
                달라요.
              </BText>
              <Spacing rem="0.25" />
              <BText>카드사 별 이벤트, 프로모션 등의 할인 내용은 반영되지 않을 수 있어요.</BText>
            </View>
            <View style={{ width: '100%', backgroundColor: colors.main }}>
              <SubmitButton title="확인" onPress={() => setShowCautionModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.white,
    height: 'auto',
    borderRadius: 10,
  },
  description: { padding: 15 },
});
export default CautionModal;
