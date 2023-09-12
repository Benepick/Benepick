import BText from '@common/components/BText';
import { Spacing } from '@common/components/Spacing';
import colors from '@common/design/colors';
import React, { Dispatch, SetStateAction } from 'react';
import { Button, Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

interface SelectModalProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setMobileCarrier: Dispatch<SetStateAction<string>>;
}

function SelectModal({ modalVisible, setModalVisible, setMobileCarrier }: SelectModalProps) {
  const select = (mobileCarrier: string) => {
    setMobileCarrier(mobileCarrier);
    setModalVisible(!modalVisible);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <Spacing rem="1" />
          <BText type="p" style={{ marginLeft: 20 }}>
            이용 중이신 통신사를 선택하세요.
          </BText>
          <Spacing rem="1" />
          <View style={{ alignSelf: 'center' }}>
            <View style={styles.row}>
              <TouchableOpacity style={styles.modalText} onPress={() => select('KT')}>
                <View
                  style={{ width: 140, height: 80, justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image
                    source={require('@common/assets/images/KT.jpg')}
                    style={{ width: 140, height: 80 }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalText} onPress={() => select('SKT')}>
                <View
                  style={{ width: 140, height: 80, justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image
                    source={require('@common/assets/images/SKT.png')}
                    style={{ width: 75, height: 30 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.modalText} onPress={() => select('LG U+')}>
                <View
                  style={{ width: 140, height: 80, justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image
                    source={require('@common/assets/images/LG.png')}
                    style={{ width: 110, height: 60 }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalText} onPress={() => select('알뜰폰')}>
                <View
                  style={{ width: 140, height: 80, justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image
                    source={require('@common/assets/images/알뜰폰.png')}
                    style={{ width: 80, height: 45 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    height: '31%',
    backgroundColor: 'white',

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5,
  },
  modalText: {
    backgroundColor: colors.white,
    borderColor: colors.disabled,
    borderWidth: 1,
    justifyContent: 'center',
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default SelectModal;
