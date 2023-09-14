import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import WhitePage from '@common/components/WhitePage';
import BText from '@common/components/BText';
import CompanySelectBox from '@common/components/CompanySelectBox';
import { Spacing } from '@common/components/Spacing';
import SubmitButton from '@common/components/SubmitButton';
import BCheckBox from '@common/components/BCheckBox';
import colors from '@common/design/colors';

import { CompanyManagementNavigationProps } from 'interfaces/navigation';
import { CompanyBoxProps } from '@interfaces/companyConnection';

function CompanyManagement({ navigation }: CompanyManagementNavigationProps) {
  const [boxStates, setBoxStates] = useState<CompanyBoxProps[]>([
    {
      id: 0,
      name: '카카오뱅크0',
      state: 'add',
      selected: false,
      img: 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99BCB0335D089C1434',
    },
    {
      id: 1,
      name: '카카오뱅크1',
      state: 'add',
      selected: false,
      img: 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99BCB0335D089C1434',
    },
  ]);

  const [isAllselected, setAllSelected] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  const selectAll = () => {
    setBoxStates((prevBoxStates) =>
      prevBoxStates.map((box) => {
        if (box.state === 'linked') {
          return { ...box, selected: !isAllselected };
        } else {
          return {
            ...box,
            selected: !isAllselected,
            state: !isAllselected ? 'selected' : 'add',
          };
        }
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

    // linked 상태일 경우 state는 'linked'로 유지
    if (newBoxStates[index].state !== 'linked') {
      newBoxStates[index].state = newBoxStates[index].selected ? 'selected' : 'add';
    }

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
    console.log('클릭');
  };

  return (
    <WhitePage>
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
                state={box.state}
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

export default CompanyManagement;
