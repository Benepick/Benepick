import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import WhitePage from '@common/components/WhitePage';
import BText from '@common/components/BText';
import CompanySelectBox from '@common/components/CompanySelectBox';
import { Spacing } from '@common/components/Spacing';
import SubmitButton from '@common/components/SubmitButton';
import BCheckBox from '@common/components/BCheckBox';
import colors from '@common/design/colors';

import { SelectCompanyNavigationProps } from '@interfaces/navigation';
import cardCompany, { CardCompany } from '@api/cardCompany';
import Loading from '@pages/Loading/Loading';

function SelectCompany({ navigation }: SelectCompanyNavigationProps) {
  const [boxStates, setBoxStates] = useState<CardCompany[] | []>([]);
  const [isAllselected, setAllSelected] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoading, setLoading] = useState(false);

  // 카드사 정보 가져오기
  useEffect(() => {
    setLoading(true);
    cardCompany
      .get(1)
      .then((res) => {
        if (res.statusCode === 200) {
          setBoxStates(res.data);
          setLoading(false);
        } else {
          Alert.alert('전체 카드사 조회에 실패하였습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 전체 선택
  const selectAll = () => {
    if (boxStates) {
      setBoxStates((prevBoxStates) =>
        prevBoxStates.map((box) => {
          return { ...box, selected: !isAllselected };
        }),
      );
      setAllSelected(!isAllselected);
    }
  };

  // 선택된 카드 갯수 가져오기
  const getSelectedCount = () => {
    if (boxStates) {
      const selectedCount = boxStates.filter((box) => box.selected).length;
      return selectedCount;
    }
  };

  // 박스선택
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

  // 카드사 연동
  const submitCompany = () => {
    if (boxStates) {
      setLoading(true);
      const selectedCompanies = boxStates.filter((box) => box.selected);
      const selectedCompaniesId = selectedCompanies.map((company) => company.cardCompanyId);
      cardCompany
        .post(selectedCompaniesId)
        .then((res) => {
          if (res.statusCode === 200) {
            setLoading(false);
            navigation.reset({
              index: 0,
              routes: [{ name: 'BottomTab' }],
            });
          } else {
            Alert.alert('카드사 연동에 실패하였습니다');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <WhitePage>
      {isLoading && (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Loading />
          <BText type="h3">잠시만 기다려주세요!</BText>
        </View>
      )}
      <Spacing rem="3" />
      {!isLoading && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <BText type="h2">자주 사용하는 금융사를</BText>
          <BText type="h2">선택해보세요</BText>
          <Spacing />
          <View style={styles.checkBox}>
            <BCheckBox value={isAllselected} size={1} onPress={selectAll} />
            <Spacing rem="0.5" dir="row" />
            <BText>
              {boxStates && getSelectedCount() === boxStates.length ? '전체해제' : '전체선택'}
            </BText>
          </View>
          <Spacing />
          <View style={styles.container}>
            {boxStates &&
              boxStates.slice(0, visibleCount).map((box, index) => (
                <View key={box.cardCompanyId} style={styles.box}>
                  <CompanySelectBox
                    name={box.cardCompanyName}
                    // image={box.cardCompanyImgUrl}
                    image={box.cardCompanyImgUrl}
                    size={30}
                    isLinked={box.linked}
                    isSelected={box.selected}
                    onPress={() => handleSelectBox(index)}
                  />
                </View>
              ))}
          </View>

          {boxStates &&
            visibleCount < boxStates.length && ( // 더 볼 회사가 있으면 "더보기" 버튼을 표시
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
            <Spacing rem="4" />
          </View>
        </ScrollView>
      )}
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
