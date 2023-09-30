import React, { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { ReadTermsNavigationProps } from 'interfaces/navigation';
import SubmitButton from '@common/components/SubmitButton';
import WhitePage from '@common/components/WhitePage';

import { Spacing } from '@common/components/Spacing';
import BText from '@common/components/BText';
import BHr from '@common/components/BHr';

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
        <View>
          <BText type="h2">서비스 이용약관</BText>
          <Spacing />
          <BText type="h3">제 1장 총칙</BText>
          <Spacing />

          <BText type="bold">제 1조 (목적)</BText>
          <BText>
            이 약관은 “베네픽”(이하 “회사”라 합니다)가 제공하는 “베네픽”(이하 ‘서비스’라 합니다)를
            회사와 이용계약을 체결한 ‘고객’이 이용함에 있어 필요한 회사와 고객의 권리 및 의무, 기타
            제반 사항을 정함을 목적으로 합니다.
          </BText>
          <Spacing />

          <BText type="bold">제 2조 (약관 외 준칙)</BText>
          <BText>
            이 약관에 명시되지 않은 사항에 대해서는 위치 정보의 보호 및 이용 등에 관한 법률,
            전기통신사업법, 정보통신망 이용 촉진및 보호 등에 관한 법률 등 관계법령 및 회사가 정한
            서비스의 세부이용지침 등의 규정에 따릅니다.
          </BText>
          <Spacing />

          <BText type="h3">제 2장 서비스의 이용</BText>
          <Spacing />

          <BText type="bold">제 3조 (가입자격)</BText>
          <BText>① 서비스에 가입할 수 있는 자는 Application 이 설치가능한 모든 사람 입니다.</BText>
          <Spacing />

          <BText type="bold">제 4조 (서비스 가입)</BText>
          <BText>
            ① “Application 관리자”가 정한 본 약관에 고객이 동의하면 서비스 가입의 효력이 발생합니다.
          </BText>
          <BText>
            ②“Application 관리자”는 다음 각 호의 고객 가입신청에 대해서는 이를 승낙하지 아니할 수
            있습니다.
          </BText>
          <BText>1. 고객 등록 사항을 누락하거나 오기하여 신청하는 경우</BText>
          <BText>2. 공공질서 또는 미풍양속을 저해하거나 저해할 목적으로 신청한 경우</BText>
          <BText>3. 기타 회사가 정한 이용신청 요건이 충족되지 않았을 경우</BText>
          <Spacing />

          <BText type="bold">제 5조 (서비스의 탈퇴)</BText>
          <BText>
            서비스 탈퇴를 희망하는 고객은 “Application 담당자”가 정한 소정의 절차(설정메뉴의 탈퇴)를
            통해 서비스 해지를 신청할 수 있습니다.
          </BText>
          <Spacing />

          <BText type="bold">제 6조 (서비스의 수준)</BText>
          <BText>
            ① 서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 단, 회사의 업무상이나 기술상의
            이유로 서비스가 일시 중지될 수 있으며, 운영상의 목적으로 회사가 정한 기간에는 서비스가
            일시 중지될 수 있습니다. 이러한 경우 회사는 사전 또는 사후에 이를 공지합니다.
          </BText>
          <BText>② 위치정보는 관련 기술의 발전에 따라 오차가 발생할 수 있습니다.</BText>
          <Spacing />

          <BText type="bold">제 7조 (서비스 이용의 제한 및 정지)</BText>
          <BText>
            회사는 고객이 다음 각 호에 해당하는 경우 사전 통지 없이 고객의 서비스 이용을 제한 또는
            정지하거나 직권 해지를 할 수 있습니다.
          </BText>
          <BText>1. 타인의 서비스 이용을 방해하거나 타인의 개인정보를 도용한 경우</BText>
          <BText>2. 서비스를 이용하여 법령, 공공질서, 미풍양속 등에 반하는 행위를 한 경우</BText>
          <Spacing />

          <BText type="bold">제 8조 (서비스의 변경 및 중지)</BText>
          <BText>
            ① 회사는 다음 각 호의 1에 해당하는 경우 고객에게 서비스의 전부 또는 일부를 제한,
            변경하거나 중지할 수 있습니다.
          </BText>
          <BText>1. 서비스용 설비의 보수 등 공사로 인한 부득이한 경우</BText>
          <BText>
            2. 정전, 제반 설비의 장애 또는 이용량의 폭주 등으로 정상적인 서비스 이용에 지장이 있는
            경우
          </BText>
          <BText>
            3. 서비스 제휴업체와의 계약 종료 등과 같은 회사의 제반 사정 또는 법률상의 장애 등으로
            서비스를 유지할 수 없는 경우
          </BText>
          <BText>4.기타 천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우</BText>
          <BText>
            ② 제1항에 의한 서비스 중단의 경우에는 회사는 인터넷 등에 공지하거나 고객에게 통지합니다.
            다만, 회사가 통제할 수 없는 사유로 인한 서비스의 중단 (운영자의 고의, 과실이 없는 디스크
            장애, 시스템 다운 등)으로 인하여 사전 통지가 불가능한 경우에는 사후에 통지합니다.
          </BText>
          <Spacing />

          <BText type="h3">제 5장 기타</BText>
          <Spacing />

          <BText type="bold">제 19조 (회사의 연락처)</BText>
          <BText>회사의 상호 다음과 같습니다.</BText>
          <BText>1. 상호: “베네픽”</BText>
          <Spacing />

          <BText type="bold">제 20조 (양도금지)</BText>
          <BText>
            고객 및 회사는 고객의 서비스 가입에 따른 본 약관상의 지위 또는 권리,의무의 전부 또는
            일부를 제3자에게 양도, 위임하거나 담보제공 등의 목적으로 처분할 수 없습니다.
          </BText>
          <Spacing />

          <BText type="bold">제 21조 (손해배상)</BText>
          <BText>
            ① 고객의 고의나 과실에 의해 이 약관의 규정을 위반함으로 인하여 회사에 손해가 발생하게
            되는 경우, 이 약관을 위반한 고객은 회사에 발생하는 모든 손해를 배상하여야 합니다.
          </BText>
          <BText>
            ② 고객이 서비스를 이용함에 있어 행한 불법행위나 고객의 고의나 과실에 의해 이 약관
            위반행위로 인하여 회사가 당해 고객 이외의 제3자로부터 손해배상청구 또는 소송을 비롯한
            각종 이의제기를 받는 경우 당해 고객은 그로 인하여 회사에 발생한 손해를 배상하여야
            합니다.
          </BText>
          <BText>
            ③ 회사가 위치정보의 보호 및 이용 등에 관한 법률 제 15조 내지 제26조의 규정을 위반한 행위
            혹은 회사가 제공하는 서비스로 인하여 고객에게 손해가 발생한 경우, 회사가 고의 또는 과실
            없음을 입증하지 아니하면, 고객의 손해에 대하여 책임을 부담합니다.
          </BText>
          <Spacing />

          <BText type="bold">제 22조 (면책사항)</BText>
          <BText>
            ① 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는
            서비스 제공에 관한 책임이 면제됩니다.
          </BText>
          <BText>
            ② 회사는 고객의 귀책사유로 인한 서비스의 이용장애에 대하여 책임을 지지 않습니다.
          </BText>
          <BText>
            ③ 회사는 고객이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며,
            그 밖에 서비스를 통하여 얻은 자료로 인한 손해 등에 대하여도 책임을 지지 않습니다.
          </BText>
          <BText>
            ④ 회사에서 제공하는 서비스 및 서비스를 이용하여 얻은 정보에 대한 최종판단은 고객이 직접
            하여야 하고, 그에 따른 책임은 전적으로 고객 자신에게 있으며, 회사는 그로 인하여 발생하는
            손해에 대해서 책임을 부담하지 않습니다.
          </BText>
          <BText>
            ⑤ 회사의 업무상 또는 기술상의 장애로 인하여 서비스를 개시하지 못하는 경우 회사는 인터넷
            홈페이지 등에 이를 공지하거나 E-mail 등의 방법으로 고객에게 통지합니다. 단, 회사가
            통제할 수 없는 사유로 인하여 사전 공지가 불가능한 경우에는 사후에 공지합니다.
          </BText>
          <Spacing />

          <BText type="bold">제 23조 (분쟁의 해결 및 관할법원)</BText>
          <BText>
            ① 서비스 이용과 관련하여 회사와 고객 사이에 분쟁이 발생한 경우, 회사와 고객은 분쟁의
            해결을 위해 성실히 협의합니다.
          </BText>
          <BText>
            ② 제1항의 협의에서도 분쟁이 해결되지 않을 경우 양 당사자는 정보통신망 이용촉진 및
            정보보호 등에 관한 법률 제33조의 규정에 의한 개인정보분쟁조정위원회에 분쟁조정을 신청할
            수 있습니다.
          </BText>
          <Spacing />
          <BHr />
          <Spacing />
          <BText type="h2">개인정보의 항목 및 수집방법 및 수집하는 개인정보의 수집·이용 목적</BText>
          <Spacing />

          <BText type="bold">■ 개인정보 수집 항목</BText>
          <BText>
            회사는 회원가입, 서비스 신청을 위해 아래와 같은 개인정보를 수집하고 있습니다.
          </BText>
          <BText>- 수집항목: 전화번호, 간편 비밀번호, 이름, 기기 위치</BText>
          <BText>- 개인정보 수집방법: 앱 설치 후 회원가입 메뉴를 통해서 가입</BText>
          <Spacing />

          <BText type="bold">■ 주민번호 앞자리 및 통신사 정보 안내</BText>
          <BText>
            - 주민번호 앞자리 및 통신사 정보는 서비스의 형식상 요구되는 정보입니다. 회사는 이러한
            정보를 수집하지만 실질적인 서비스 제공이나 다른 목적으로 사용하지 않습니다. 이 정보는
            보안적으로 안전하게 처리되며, 기타 용도로 사용되거나 제3자와 공유되지 않습니다.
          </BText>
          <Spacing />

          <BText type="bold">■ 앱 접근 권한 안내</BText>
          <BText>
            - 위치 접근 권한: 위의 "위치 정보 관련 세부 사항"에서 설명한 바와 같이, 사용자의 현 위치
            정보를 수집하여 서비스 제공을 위한 목적으로 활용합니다.
          </BText>
          <Spacing />

          <BText type="bold">■ 위치 정보 관련 세부 사항</BText>
          <BText>
            - 위치 정보의 정확성: 회사는 서비스 제공을 위해 사용자의 정확한 위치 정보를 수집합니다.
            이 위치 정보는 주변 가맹점 또는 상점에서 제공하는 신용카드 혜택 추천을 위해 필요합니다.
          </BText>

          <BText>
            - 백그라운드 위치 정보: 회사는 포그라운드와 백그라운드에서의 앱 사용 중에만 위치 정보를
            수집합니다. 백그라운드에서의 위치 정보 수집은 특별한 경우, 즉 사용자가 디바이스를
            흔들었을 때 자이로스코프 센서를 통해 인식하고, 해당 흔들린 위치를 기반으로 알람 기능을
            통해 현재 위치에서의 최적의 신용카드 혜택을 추천하기 위해 필요합니다.
          </BText>
          <BText>
            - 데이터 저장 및 보호: 수집된 위치 정보는 회사의 안전한 서버에 저장됩니다. 위치 데이터는
            서비스 제공을 위한 목적 이외로는 사용되지 않습니다.
          </BText>
          <BText>- 제3자 공유: 회사는 수집된 위치 정보를 제3자와 공유하지 않습니다.</BText>
          <Spacing />

          <BText type="bold">■ 개인정보 수집 및 이용목적</BText>
          <BText>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</BText>
          <BText>1) 회원 서비스에 이용에 따른 본인 확인 절차에 이용</BText>
          <BText>
            2) 현재 사용자의 위치를 기반으로 주변 가맹점 또는 상점에서 제공하는 신용카드 중 최적의
            혜택을 가진 카드를 추천하기 위해 이용
          </BText>
          <Spacing />

          <BText type="bold">■ 개인정보 수집에 대한 동의</BText>
          <BText>회사는 회원님의 개인정보 수집에 대하여 동의를 받고 있으며,</BText>
          <BText>
            회원가입시 이용약관 및 개인정보취급방침에 개인정보 수집 동의절차를 마련해 두고 있습니다.
          </BText>
          <BText>
            회원님께서 ‘회원가입 및 이용약관에 동의하겠습니까’란에 체크하시면 개인정보 수집에 대해
            동의한 것으로 봅니다.
          </BText>
          <BText>
            가입 후, 설정 메뉴에서도 이용약관 및 개인정보 취급방침 내용을 다시 확인할 수 있습니다.
          </BText>
          <Spacing />
          <BHr />
          <Spacing />

          <BText type="h2">앱 실행에서 사용되는 권한</BText>
          <Spacing />

          <BText>
            모바일 앱 실행을 위해서 선택적으로 위치, 저장, 카메라, 파일 및 미디어 권한이 필요합니다.
          </BText>

          <BText type="bold">[선택 허용 권한]</BText>
          <BText>
            - 위치 접근 권한: 위의 "위치 정보 관련 세부 사항"에서 설명한 바와 같이, 사용자의 현 위치
            정보를 수집하여 서비스 제공을 위한 목적으로 활용합니다.
          </BText>
          <Spacing />
          <BHr />
          <Spacing />
          <BText type="h2">개인정보 제3자 제공</BText>
          <Spacing />

          <BText type="bold">■ 개인정보 제3자 제공</BText>
          <BText>※회사는 고객님의 동의없이 고객님의 정보를 제3자에게 제공하지 않습니다.</BText>
          <BText>
            개인정보를 ‘개인정보의 수집 및 활용 목적, 수집하는 개인정보 항목’에서 고지한 범위 내에서
            활용합니다
          </BText>
          <BText>
            수탁자에 공유되는 정보는 당해 목적을 달성하기 위하여 필요한 최소한의 정보에 국한됩니다.
          </BText>
          <BText>
            또한 고객의 서비스 요청에 따라 해당하는 업체에 선택적으로 개인 정보가 제공되고 있습니다.
          </BText>
          <Spacing />
          <BHr />
          <Spacing />
          <BText type="h2">개인정보의 보유 및 이용 기간, 개인정보의 파기절차 및 파기방법</BText>
          <Spacing />

          <BText>
            - 고객의 개인정보는 회원탈퇴 등 수집 및 이용목적이 달성되거나 동의철회 요청이 있는 경우
            지체없이 파기됩니다.
          </BText>
          <Spacing />

          <BText type="bold">■ 개인정보 보유 및 이용기간</BText>
          <BText>
            회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 파기합니다.
          </BText>
          <Spacing />

          <BText type="bold">■ 개인정보 파기절차 및 파기방법</BText>
          <BText>
            회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 파기합니다.
            파기절차 및 파기방법은 다음과 같습니다.
          </BText>

          <BText>- 개인정보의 보유 및 이용 기간, 개인정보의 파기절차 및 파기방법</BText>
          <Spacing />

          <BText type="bold">파기절차</BText>
          <BText>
            회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의
            경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및
            이용기간 참조) 일정 기간 저장된 후 파기되어집니다. 별도 DB로 옮겨진 개인정보는 법률에
            의한 경우가 아니고서는 보유되어지는 이외의 다른 목적으로 이용되지 않습니다.
          </BText>
          <Spacing />

          <BText type="bold">파기방법</BText>
          <BText>
            종이에 출력된 개인정보는 분쇄기로 분쇄 또는 소각하여 파기합니다. 전자적 파일형태로
            저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
          </BText>
          <Spacing />
          <BHr />
          <Spacing />
          <BText type="h2">개인정보 취급 위탁 및 개인정보 제3자 제공</BText>
          <Spacing />

          <BText type="bold">■ 개인정보 취급 위탁 업체</BText>
          <BText>
            회사는 나은 서비스 제공, 고객편의 제공 등 원활한 업무 수행을 위하여 아래와 같이
            개인정보를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수
            있도록 필요한 사항을 규정하고 있습니다.
          </BText>
          <BText>회사의 개인정보 위탁처리 기관 및 위탁업무 내용은 아래와 같습니다.</BText>
          <Spacing />

          <BText>[위탁업체정보]</BText>
          <BText>수탁 업체명: ㈜베네픽</BText>
          <BText>위탁업무내용 : 전산 시스템 구축 및 유지</BText>
          <BText>개인정보 보유 및 이용기간 : 회원탈퇴 시 혹은 위탁 계약 종료 시까지</BText>
          <Spacing />
          <BHr />
          <Spacing />
          <BText type="h2">이용자 및 법정대리인의 권리와 그 행사방법</BText>
          <Spacing />

          <BText type="bold">■ 이용자 및 법정대리인의 권리와 그 행사방법</BText>
          <BText>
            이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지
            및 계정삭제를 요청할 수 있습니다.
          </BText>
          <Spacing />

          <BText>
            이용자의 개인정보 조회, 수정을 위해서는 앱 내 – 설정- 회원정보 수정 메뉴에서 정보 수정이
            가능합니다.
          </BText>
          <BText>가입 해지는 앱 내 – 설정 - 회원탈퇴’를 선택할 수 있습니다.</BText>
          <Spacing />

          <BText>
            개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체없이 변경된 개인정보에
            대하여 정정 및 철회의 조치를 하겠습니다.
          </BText>
          <BText>
            귀하가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해
            개인정보를 이용 또는 제공하지 않습니다.
          </BText>
          <BText>
            또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이
            통지하여 정정이 이루어지도록 하겠습니다.
          </BText>
          <BText>
            회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 회사가 수집하는
            “개인정보의 보유 및 이용기간” 에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는
            이용할 수 없도록 처리하고 있습니다.
          </BText>
          <Spacing />
          <BHr />
          <Spacing />
          <BText type="h2">개인정보 자동수집 장치의 설치·운영 및 거부에 관한 사항</BText>
          <Spacing />

          <BText type="bold">■개인정보 자동수집 장치의 설치·운영 및 거부에 관한 사항</BText>
          <BText>
            쿠키, 인터넷 서비스 이용 시 자동 생성되는 개인정보를 수집하는 장치를 운영하지 않습니다.
          </BText>
          <Spacing />
          <BHr />
          <Spacing />
          <BText type="h2">개인정보 보호책임자</BText>
          <Spacing />

          <BText type="bold">■개인정보 보호책임자</BText>
          <BText>
            회원님의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련
            부서 및 개인정보관리책임자를 지정하고 있습니다. 개인정보와 관련하여 민원이나 문의가
            있으시면, 연락주시기 바랍니다. 성심성의껏 응대하겠습니다.
          </BText>
          <Spacing />

          <BText>개인정보 책임자: 김성용</BText>
          <BText>담당부서: 서비스팀</BText>
          <BText>전화번호: 010-9380-1663</BText>
          <BText>이메일: ancjs369@naver.com</BText>
          <Spacing />

          <BText>
            회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자
            혹은 담당부서로 신고하실 수 있습니다.
          </BText>
          <BText>회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.</BText>

          <BText>
            기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기
            바랍니다.
          </BText>
          <Spacing />

          <BText>1.개인분쟁조정위원회 (http://www.1336.or.kr/1336)</BText>
          <BText>2.정보보호마크인증위원회 (www.eprivacy.or.kr/02-580-0533~4)</BText>
          <BText>3.대검찰청 인터넷범죄수사센터 (http://icic.sppo.go.kr/02-3480-3600)</BText>
          <BText>4.경찰청 사이버테러대응센터(http://www.ctrc.go.kr/)</BText>
          <Spacing />
          <BHr />
          <Spacing />
          <BText type="h2">베네픽 앱 사용자 계정 정보 삭제 방법</BText>
          <Spacing />

          <BText type="bold">■ 사용자 계정 삭제 요청 방법</BText>
          <BText>사용자는 계정 삭제를 요청할 수 있습니다.</BText>
          <BText>*앱 실행 -로그인 후 - 설정 메뉴 - '회원탈퇴'를 선택할 수 있습니다.</BText>
          <BText>회원탈퇴시 계정이 삭제 처리되며, 사용자의 가입 정보 모두 삭제 처리됩니다.</BText>
          <BText>탈퇴시 이후 해당 계정은 다시 사용 불가하며, 계정 복구 불가합니다.</BText>
          <Spacing />

          <BText type="bold">■ 사용자 데이터 일부 또는 전체 삭제 요청방법</BText>
          <BText>
            사용자는 앱 내 - 메뉴 - 간편비밀번호 수정을 통해 간편 비밀번호를 수정할 수 있습니다.
          </BText>
          <BText>그 외 데이터 정보 삭제는 아래 방법으로 관리자에게 요청할 수 있습니다.</BText>
          <BText>
            사용자는 계정 삭제 외에 가입한 정보 일부 또는 전체 정보를 삭제하도록 관리자에게 요청할
            수 있습니다.
          </BText>
          <BText>사용자 아이디, 이름을 기재하여 삭제가 필요한 정보를 메일로 보내주세요</BText>
          <Spacing />

          <BText>담당자 이메일: ancjs369@naver.com</BText>
          <BText>담당자가 확인하여 사용자가 요청하는 정보를 삭제할 수 있습니다.</BText>
          <Spacing />
          <BHr />
          <Spacing />
          <BText type="h2">부칙</BText>
          <Spacing />

          <BText type="bold">■ 정책 변경에 따른 공지의무</BText>
          <BText>
            이 개인정보보호방침은 2023년 9월 29일에 제정되었으며 법령·정책 또는 보안기술의 변경에
            따라 내용의 추가·삭제 및 수정이 있을 시에는 변경되는 개인정보보호정책을 시행하기 최소
            7일전에 고지하겠습니다.
          </BText>
          <Spacing />
        </View>
        <Spacing />
      </ScrollView>
      <Spacing />
      <SubmitButton title="확인" onPress={onPress} />
      <Spacing />
    </WhitePage>
  );
}

export default ReadTerms;
