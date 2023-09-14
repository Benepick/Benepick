import React from 'react';
import BText from '@common/components/BText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import SvgIcons from '@common/assets/SvgIcons';
import colors from '@common/design/colors';

interface PasswordNumpadProps {
  enterPassword: (pad: string) => void;
}

function PasswordNumpad({ enterPassword }: PasswordNumpadProps) {
  const numpadData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Clear', '0', 'remove'];

  return (
    <View style={styles.numpad}>
      {numpadData.map((pad, index) => (
        <View key={index} style={styles.pad}>
          {pad === 'remove' ? (
            <TouchableOpacity onPress={() => enterPassword(pad)}>
              <View style={styles.text}>
                <SvgIcons name="ArrowBack" size={35} />
              </View>
            </TouchableOpacity>
          ) : pad === 'Clear' ? (
            <TouchableOpacity onPress={() => enterPassword(pad)}>
              <View style={styles.text}>
                <BText type="h2">{pad}</BText>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => enterPassword(pad)}>
              <View style={styles.text}>
                <BText type="h1">{pad}</BText>
              </View>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '50%',
  },
  pad: {
    width: '33.33%',
    height: '25%',
  },
  text: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PasswordNumpad;
