import React, { useRef, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ReadTermsNavigationProps } from 'interfaces/navigation';
import SubmitButton from '@common/components/SubmitButton';
import WhitePage from '@common/components/WhitePage';
import colors from '@common/design/colors';
import { Spacing } from '@common/components/Spacing';
import BText from '@common/components/BText';

function ReadTerms({ navigation }: ReadTermsNavigationProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [height, setHeight] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [isEndOfPage, setIsEndOfPage] = useState(false);

  const onPress = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: 0, y: currentHeight + height, animated: true });
    }
    if (isEndOfPage) {
      navigation.push('Terms', { isRead: true });
    }
  };

  return (
    <WhitePage
      style={{ flex: 1 }}
      onLayout={(event) => {
        setHeight(event.nativeEvent.layout.height);
      }}
    >
      <ScrollView
        ref={scrollRef}
        onScroll={(event) => {
          setCurrentHeight(event.nativeEvent.contentOffset.y);
          if (event.nativeEvent.contentOffset.y + height >= event.nativeEvent.contentSize.height) {
            setIsEndOfPage(true);
          } else {
            setIsEndOfPage(false);
          }
        }}
      >
        <BText type="bold">제 1 장 총 칙</BText>
        <Spacing />
        <BText>제 1 조 (목적)</BText>
        <Spacing />
        <BText>
          이 약관은 베네픽(이하 "사이트"라 합니다)에서 제공하는 인터넷서비스(이하 "서비스"라
          합니다)의 이용 조건 및 절차에 관한 기본적인 사항을 규정함을 목적으로 합니다.)
        </BText>
        <Spacing />
        <BText>제 2 조 (약관의 효력 및 변경)</BText>
        <Spacing />
        <BText>
          ① 이 약관은 서비스 화면이나 기타의 방법으로 이용고객에게 공지함으로써 효력을 발생합니다.
        </BText>
        <BText>
          ② 사이트는 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지
          또는 통지함으로써 효력을 발생합니다.
        </BText>
        <Spacing />

        <BText>제 3 조 (용어의 정의)</BText>
        <Spacing />

        <BText>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</BText>
        <Spacing />
        <BText>
          ① 회원 : 사이트와 서비스 이용계약을 체결하거나 이용자 아이디(ID)를 부여받은 개인 또는
          단체를 말합니다.
        </BText>
        <BText>② 신청자 : 회원가입을 신청하는 개인 또는 단체를 말합니다.</BText>
        <BText>
          ③ 아이디(ID) : 회원의 식별과 서비스 이용을 위하여 회원이 정하고 사이트가 승인하는 문자와
          숫자의 조합을 말합니다.
        </BText>
        <BText>⑤ 해지 : 사이트 또는 회원이 서비스 이용계약을 취소하는 것을 말합니다.</BText>
        <Spacing />
        <BText type="bold">제 2 장 서비스 이용계약</BText>
        <Spacing />

        <BText>제 4 조 (이용계약의 성립)</BText>
        <Spacing />

        <BText>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</BText>
        <Spacing />
        <BText>① 이용약관 하단의 동의 버튼을 누르면 이 약관에 동의하는 것으로 간주됩니다.</BText>
        <BText>
          ② 이용계약은 서비스 이용희망자의 이용약관 동의 후 이용 신청에 대하여 사이트가 승낙함으로써
          성립합니다.
        </BText>

        <Spacing />
        <BText>제 5 조 (이용신청)</BText>
        <Spacing />

        <BText>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</BText>
        <Spacing />
        <BText>
          ① 신청자가 본 서비스를 이용하기 위해서는 사이트 소정의 가입신청 양식에서 요구하는 이용자
          정보를 기록하여 제출해야 합니다.
        </BText>
        <BText>
          ② 가입신청 양식에 기재하는 모든 이용자 정보는 모두 실제 데이터인 것으로 간주됩니다.
          실명이나 실제 정보를 입력하지 않은 사용자는 법적인 보호를 받을 수 없으며, 서비스의 제한을
          받을 수 있습니다.
        </BText>

        <Spacing />

        <BText>제 6 조 (이용신청의 승낙)</BText>
        <Spacing />
        <BText>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</BText>
        <Spacing />
        <BText>
          ① 사이트는 신청자에 대하여 제2항, 제3항의 경우를 예외로 하여 서비스 이용신청을 승낙합니다.
        </BText>
        <BText>
          ② 사이트는 다음에 해당하는 경우에 그 신청에 대한 승낙 제한사유가 해소될 때까지 승낙을
          유보할 수 있습니다.
        </BText>
        <Spacing />

        <BText>제 7 조 (이용자정보의 변경)</BText>
        <Spacing />
        <BText>
          회원은 이용 신청시에 기재했던 회원정보가 변경되었을 경우에는, 온라인으로 수정하여야 하며
          변경하지 않음으로 인하여 발생되는 모든 문제의 책임은 회원에게 있습니다.
        </BText>
        <Spacing />

        <BText type="bold">제 3 장 계약 당사자의 의무</BText>
        <Spacing />

        <BText>제 8 조 (사이트의 의무)</BText>
        <Spacing />
        <BText>① 사이트는 회원에게 각 호의 서비스를 제공합니다.</BText>
        <BText>가. 신규서비스와 도메인 정보에 대한 뉴스레터 발송</BText>
        <BText>나. 추가 도메인 등록시 개인정보 자동 입력</BText>
        <BText>다. 도메인 등록, 관리를 위한 각종 부가서비스</BText>
        <BText>
          ② 사이트는 서비스 제공과 관련하여 취득한 회원의 개인정보를 회원의 동의없이 타인에게 누설,
          공개 또는 배포할 수 없으며, 서비스관련 업무 이외의 상업적 목적으로 사용할 수 없습니다. 단,
          다음 각 호의 1에 해당하는 경우는 예외입니다.
        </BText>
        <BText>가. 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우</BText>
        <BText>나. 범죄에 대한 수사상의 목적이 있거나 정보통신윤리 위원회의 요청이 있는 경우</BText>
        <BText>다. 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우</BText>
        <BText>
          ③ 사이트는 이 약관에서 정한 바에 따라 지속적, 안정적으로 서비스를 제공할 의무가 있습니다.
        </BText>
        <Spacing />
      </ScrollView>
      <Spacing />
      <SubmitButton title="확인" onPress={onPress} />
      <Spacing />
    </WhitePage>
  );
}

export default ReadTerms;
