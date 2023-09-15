import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import WhitePage from '@common/components/WhitePage';
import BText from '@common/components/BText';
import CompanySelectBox from '@common/components/CompanySelectBox';
import { Spacing } from '@common/components/Spacing';
import SubmitButton from '@common/components/SubmitButton';
import BCheckBox from '@common/components/BCheckBox';
import colors from '@common/design/colors';

import { CompanyBoxProps } from '@interfaces/companyConnection';
import { SelectCompanyNavigationProps } from '@interfaces/navigation';

function SelectCompany({ navigation }: SelectCompanyNavigationProps) {
  const [boxStates, setBoxStates] = useState<CompanyBoxProps[]>([
    {
      id: 0,
      name: '카카오뱅크',
      isLinked: false,
      selected: true,
      img: 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99BCB0335D089C1434',
    },
    {
      id: 1,
      name: '신한은행',
      isLinked: false,
      selected: true,
      img: 'https://yt3.googleusercontent.com/zexsdgdwprL4FwYyI5D7RXJf084UAhJAH5AOvSf_767rpcouYwxdLiKYqjMiO-aAJ8ivMliyCA=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      id: 2,
      name: '하나은행',
      isLinked: false,
      selected: true,
      img: 'https://tistory1.daumcdn.net/tistory/1464752/attach/a4f69d91512142089ec6bcae50a0f672',
    },

    {
      id: 3,
      name: '우리은행',
      isLinked: false,
      selected: true,
      img: 'data:image/jpeg;base64,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',
    },
    {
      id: 4,
      name: '농협은행',
      isLinked: false,
      selected: true,
      img: 'data:image/png;base64,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',
    },
    {
      id: 5,
      name: '기업은행',
      isLinked: false,
      selected: true,
      img: 'https://yt3.googleusercontent.com/zZg2axjXO9n1-KYsb-m3SQUVMHOPqKVRayyEmFgeRV1esvDOVC9Zhl1HwYi1TDniq7SjWk5s=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      id: 6,
      name: '국민은행',
      isLinked: false,
      selected: true,
      img: 'https://yt3.googleusercontent.com/ytc/AOPolaT0Z42KAYvSAMXdOrf859cr-9vCwFDoOxMq3WV54Q=s900-c-k-c0x00ffffff-no-rj',
    },

    {
      id: 7,
      name: '수협',
      isLinked: false,
      selected: true,
      img: 'https://yt3.googleusercontent.com/w4GqXyWod2RkdSIPXLPDia-unbH7HuDQ7OM2Vyxq0tQpuoCzh_PcHf74FM9_swWaAKjBBFm1CQ=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      id: 8,
      name: '대구은행',
      isLinked: false,
      selected: true,
      img: 'https://yt3.googleusercontent.com/ytc/AOPolaSbdkoyQjpvkFjAvNzjKdq419NDbJanXDJ4uVjP=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      id: 9,
      name: '부산은행',
      isLinked: false,
      selected: true,
      img: 'data:image/png;base64,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',
    },
    {
      id: 10,
      name: '제주은행',
      isLinked: false,
      selected: true,
      img: 'https://newsimg.sedaily.com/2022/12/15/26EWVYJ28H_2.png',
    },
  ]);

  const [isAllselected, setAllSelected] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  const selectAll = () => {
    setBoxStates((prevBoxStates) =>
      prevBoxStates.map((box) => {
        return { ...box, selected: !isAllselected };
      }),
    );
    setAllSelected(!isAllselected);
  };

  const getSelectedCount = () => {
    const selectedCount = boxStates.filter((box) => box.selected).length;
    return selectedCount;
  };

  const handleSelectBox = (index: number) => {
    const newBoxStates = [...boxStates];
    newBoxStates[index].selected = !newBoxStates[index].selected;
    setBoxStates(newBoxStates);

    // 전체 선택 체크박스의 상태를 업데이트
    const allSelected = newBoxStates.every((box) => box.selected);
    setAllSelected(allSelected);
  };

  // 더보기
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const submitCompany = () => {
    const selectedCompanies = boxStates.filter((box) => box.selected);
    console.log(selectedCompanies);
    navigation.push('BottomTab');
  };

  return (
    <WhitePage>
      <Spacing rem="3" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BText type="h2">자주 사용하는 금융사를</BText>
        <BText type="h2">선택해보세요</BText>
        <Spacing />
        <View style={styles.checkBox}>
          <BCheckBox value={isAllselected} size={1} onPress={selectAll} />
          <Spacing rem="0.5" dir="row" />
          <BText>{getSelectedCount() === boxStates.length ? '전체해제' : '전체선택'}</BText>
        </View>
        <Spacing />
        <View style={styles.container}>
          {boxStates.slice(0, visibleCount).map((box, index) => (
            <View key={box.id} style={styles.box}>
              <CompanySelectBox
                name={box.name}
                image={box.img}
                size={30}
                isLinked={box.isLinked}
                isSelected={box.selected}
                onPress={() => handleSelectBox(index)}
              />
            </View>
          ))}
        </View>

        {visibleCount < boxStates.length && ( // 더 볼 회사가 있으면 "더보기" 버튼을 표시
          <View>
            <Spacing />
            <TouchableOpacity onPress={loadMore} style={{ alignSelf: 'center' }}>
              <BText type="bold">더보기</BText>
            </TouchableOpacity>
          </View>
        )}

        <Spacing />
        <View style={styles.button}>
          <SubmitButton
            color={getSelectedCount() === 0 ? colors.disabled : colors.main}
            title={
              getSelectedCount() === 0 ? '금융사를 선택해주세요' : `${getSelectedCount()}개 연결`
            }
            onPress={submitCompany}
          />
          <Spacing />
        </View>
      </ScrollView>
    </WhitePage>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    padding: 5,
    width: '33.3%',
  },
  checkBox: {
    flexDirection: 'row',
    borderRadius: 6,
    borderColor: colors.disabled,
    borderWidth: 1,
    padding: 10,
    width: '98%',
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default SelectCompany;
