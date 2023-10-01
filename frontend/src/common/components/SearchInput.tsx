import SvgIcons from '@common/assets/SvgIcons';
import colors from '@common/design/colors';
import { globalStyles } from '@common/design/globalStyles';
import React, { useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

function SearchInput({ ...rest }: TextInputProps) {
  const input = useRef<TextInput>(null);

  const onPress = () => {
    input.current?.focus();
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderStyle: 'solid',
      borderColor: colors.main2,
      borderWidth: 1,

      borderRadius: 10,
    },
    icon: {
      marginLeft: 15,
      marginRight: 5,
    },
    content: {
      fontFamily: 'IBMPlexSansKR-Regular',
      width: '85%',
      marginTop: 5,
      color: colors.black,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <SvgIcons name="Search" fill={colors.main2} style={styles.icon} />
        <TextInput
          {...rest}
          ref={input}
          style={styles.content}
          placeholder="결제하려는 곳을 입력해보세요"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SearchInput;
