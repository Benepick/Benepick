# Benepick

<img src="./readme-asset/image/logo.png" width="100%" height="400px"/>

## 📖목차

- [Benepick](#benepick)
  - [📖목차](#목차)
  - [프로젝트 진행 기간](#프로젝트-진행-기간)
  - [❤ 팀 소개](#-팀-소개)
    - [팀명](#팀명)
    - [팀원 소개](#팀원-소개)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [🎉 프로젝트 요약](#-프로젝트-요약)
  - [✨주요 기능 및 구현](#주요-기능-및-구현)
  - [🖥 서비스 화면](#-서비스-화면)
  - [🏗️ 아키텍쳐](#️-아키텍쳐)
  - [🛠 기술 스택](#-기술-스택)
    - [기술 스택](#기술-스택)
  - [📂 파일 구조](#-파일-구조)
  - [📝 설계 문서](#-설계-문서)
    - [ERD](#erd)
    - [API](#api)
    - [FIGMA](#figma)
  - [📚 컨벤션](#-컨벤션)
    - [Ground Rule](#ground-rule)
  - [🥇 프로젝트 수칙](#-프로젝트-수칙)
    - [💻 회의 진행](#-회의-진행)
    - [💻 코드 리뷰](#-코드-리뷰)
    - [💻 코드 작성](#-코드-작성)
    - [💻 깃 관리](#-깃-관리)
  - [🥈 생활 수칙](#-생활-수칙)
    - [💻 개인 일정 관리 및 연락](#-개인-일정-관리-및-연락)
    - [💻 개인 건강 및 위생 관리](#-개인-건강-및-위생-관리)
  - [🥉 마인드셋 수칙](#-마인드셋-수칙)
    - [💻 마인드셋](#-마인드셋)
    - [Git Commit](#git-commit)
    - [Git Branch](#git-branch)
- [브랜치 명명 컨벤션](#브랜치-명명-컨벤션)
  - [Git flow](#git-flow)
    - [Codding](#codding)
    - [Jira](#jira)
  - [📄 문서 정리](#-문서-정리)
    - [회의록](#회의록)
    - [버그 리포트](#버그-리포트)
    - [지식 공유](#지식-공유)
  - [💻 구동 방법](#-구동-방법)
  - [💾 결과물](#-결과물)
    - [UCC](#ucc)
    - [시연 영상](#시연-영상)
    - [PPT](#ppt)

---

## 프로젝트 진행 기간

`2023.08.21 ~ 2023.10.06 (약 7주)`

---

## ❤ 팀 소개

<img src="./readme-asset/profile/../image/profile/team.jpg" width="300px" height="300px" />

### 팀명

> 📢 안녕하세요! 핀테크 주제로 프로젝트를 진행한 팀《현실에서는 신용불량자였던 내가 이세계에선 최강의 카드 혜택 마에스트로?》입니다.

### 팀원 소개

### Frontend

|                                                                                                                |                                                                                                            |
| :------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| <img src="./readme-asset/profile/../image/profile/seongYong.gif" width="200px" height="200px" /><br>**김성용** | <img src="./readme-asset/profile/../image/profile/ikGun.gif" width="200px" height="200px" /><br>**진익근** |

---

### Backend

|                                                                                                                |                                                                                                             |                                                                                                                |                                                                                                             |
| :------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: |
| <img src="./readme-asset/profile/../image/profile/dongGyeom.gif" width="200px" height="200px" /><br>**김동겸** | <img src="./readme-asset/profile/../image/profile/siGgun.gif" width="200px" height="200px" /><br>**박시균** | <img src="./readme-asset/profile/../image/profile/hyeonChul.gif" width="200px" height="200px" /><br>**박현철** | <img src="./readme-asset/profile/../image/profile/hyeJin.gif" width="200px" height="200px" /><br>**임혜진** |

---

## 🎉 프로젝트 요약

💡 **프로젝트 명**: 베네픽

**목적**: 보유 카드를 효율적으로 사용하여 혜택을 극대화하고, 더 좋은 카드를 추천 받을 수 있는 서비스

**기대효과**:

- 보유 카드 실적을 효과적으로 관리할 수 있다.
- 카드를 효율적으로 사용하여 최대 혜택을 받을 수 있다.
- 더 좋은 카드를 추천 받을 수 있다.  
  **차별점**:
- 위치 기반 결제 전 혜택 정보 확인(방향에 따른 사업장 선택)

---

## ✨주요 기능 및 구현

💡 **계정**:

1.  휴대폰 인증 (본인인증)

💡 **마이데이터(더미데이터)**:

1.  더미데이터 생성
    1. 사용자
    2. 카드
    3. 소비내역
2.  연동 카드사 선택

💡 **소비 습관**:

1.  카테고리 별 소비내역 조회
    1. 기간 별 소비내역
    2. 카테고리 별 소비내역
    3. 통계 그래프

💡 **내 카드**:

1.  실적 모아보기
2.  혜택 조회
    1. 받은 혜택 금액
    2. 받을 수 있는 혜택 금액
3.  소비내역 조회

💡 **검색(추천)**:

1.  위치 기반 추천
    1. 위치별 사업장 조회
    2. 제스처 기능을 통한 빠른 추천 알림 → 실사용성 고려
2.  혜택 기반 추천(챗봇)
    1. 가맹점에 따른 사용 카드 추천 (내 카드, 신규 카드)
    2. 소비패턴에 따른 신규 카드 추천

💡 **결제 테스트**:

1.  시연을 위한 결제 데이터 추가

---

## 🖥 서비스 화면

<summary>메인 페이지</summary>
<div markdown="1">

</div>

<summary>회원가입 페이지</summary>
<div markdown="1">

</div>

<summary>간편 로그인 페이지</summary>
<div markdown="1">

</div>

<summary>매칭페이지</summary>

<div markdown="1">

</div>

<summary>미팅페이지</summary>

<div markdown="1">

</div>

<summary>프로필페이지</summary>
<div markdown="1">

</div>

---

## 🏗️ 아키텍쳐

<!--
<img alt="Group 8" src="https://github.com/CalenDev/calendev/assets/60723373/893a5a73-cc6d-4b80-9842-940e4c3d46a6" /> -->

---

## 🛠 기술 스택

### 기술 스택

<div align=center>
    <img src="https://img.shields.io/badge/-GitLab-FCA121?style=flat-square&logo=gitlab&logoColor=white">
    <img src="https://img.shields.io/badge/-Jira-0052CC?style=flat-square&logo=jira&logoColor=white">
    <img src="https://img.shields.io/badge/-Notion-000000?style=flat-square&logo=notion&logoColor=white">
    <img src="https://img.shields.io/badge/-Figma-F24E1E?style=flat-square&logo=figma&logoColor=white">
    <img src="https://img.shields.io/badge/-IntelliJ_IDEA-000000?style=flat-square&logo=intellij-idea&logoColor=white">
    <img src="https://img.shields.io/badge/-VSCode-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white">
<img src="https://img.shields.io/badge/-Mattermost-00AEEF?style=flat-square">
    <img src="https://img.shields.io/badge/-Webex-00B140?style=flat-square">
    <img src="https://img.shields.io/badge/-Postman-FF6C37?style=flat-square&logo=postman">
    <img src="https://img.shields.io/badge/-MobaXterm-014E58?style=flat-square">
    <img src="https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white">
    <img src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white">
    <img src="https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white">
    <img src="https://img.shields.io/badge/-Prop_Types-FFA500?style=flat-square">
    <img src="https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/-Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/-Redux_Persist-764ABC?style=flat-square&logo=redux&logoColor=white">
    <img src="https://img.shields.io/badge/-Axios-0057B8?style=flat-square&logo=axios&logoColor=white">
    <img src="https://img.shields.io/badge/-Emotion.js-DB7093?style=flat-square&logo=emotion&logoColor=white">
    <img src="https://img.shields.io/badge/-Openvidu-4078C0?style=flat-square">
     <img src="https://img.shields.io/badge/-YJS-000000?style=flat-square">
    <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
    <img src="https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white">
    <img src="https://img.shields.io/badge/-Redis-DC382D?style=flat-square&logo=redis&logoColor=white">
    <img src="https://img.shields.io/badge/-Java-007396?style=flat-square&logo=java&logoColor=white">
    <img src="https://img.shields.io/badge/-JPA-FF5722?style=flat-square">
     <img src="https://img.shields.io/badge/-RabbitMQ-FF6600?style=flat-squar">
    <img src="https://img.shields.io/badge/-WebSocket-00BFFF?style=flat-square">
    <img src="https://img.shields.io/badge/-StompJS-008000?style=flat-square">
    <img src="https://img.shields.io/badge/-AWS_EC2-232F3E?style=flat-square&logo=amazon-aws&logoColor=white">
    <img src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white">
    <img src="https://img.shields.io/badge/-NGINX-269539?style=flat-square&logo=nginx&logoColor=white">
    <img src="https://img.shields.io/badge/-Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white">
    <img src="https://img.shields.io/badge/-AWS_S3-569A31?style=flat-square&logo=amazon-s3&logoColor=white">
    <img src="https://img.shields.io/badge/-Lambda-FF9900?style=flat-square">
</div>

---

## 📂 파일 구조

<details  style="margin-left: 5px;">
<summary><b>프론트 프로젝트 구조</b></summary>
<div>

```
📦src
 ┣ 📂api
 ┣ 📂common
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┣ 📂images
 ┃ ┃ ┃ ┣ 📂logo
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂progress
 ┃ ┃ ┃ ┣ 📂childs
 ┃ ┣ 📂design
 ┃ ┗ 📂utils
 ┣ 📂hooks
 ┣ 📂interfaces
 ┣ 📂navigator
 ┃ ┣ 📂stacks
 ┣ 📂pages
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂Login
 ┃ ┃ ┣ 📂PersonalAuth
 ┃ ┃ ┣ 📂PhoneAuth
 ┃ ┃ ┃ ┣ 📂Components
 ┃ ┃ ┣ 📂ReadTerms
 ┃ ┃ ┣ 📂RegistrationComplete
 ┃ ┃ ┣ 📂SelectCard
 ┃ ┃ ┣ 📂SelectCompany
 ┃ ┃ ┣ 📂SetPassword
 ┃ ┃ ┣ 📂Start
 ┃ ┃ ┗ 📂Terms
 ┃ ┣ 📂Loading
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂Benefit
 ┃ ┃ ┃ ┣ 📂Container
 ┃ ┃ ┣ 📂ChatBot
 ┃ ┃ ┃ ┣ 📂Container
 ┃ ┃ ┣ 📂Consumption
 ┃ ┃ ┃ ┣ 📂Container
 ┃ ┃ ┃ ┃ ┣ 📂ConsumptionHistory
 ┃ ┃ ┃ ┃ ┣ 📂MonthlyBenefit
 ┃ ┃ ┣ 📂CreditCard
 ┃ ┃ ┃ ┣ 📂Container
 ┃ ┃ ┃ ┃ ┣ 📂progress
 ┃ ┃ ┃ ┃ ┃ ┣ 📂childs
 ┃ ┃ ┣ 📂CreditCardDetail
 ┃ ┃ ┃ ┣ 📂Container
 ┃ ┃ ┃ ┃ ┣ 📂CardConsumption
 ┃ ┃ ┃ ┃ ┣ 📂DateOption
 ┃ ┃ ┗ 📂Home
 ┃ ┃ ┃ ┣ 📂Container
 ┃ ┣ 📂Notification
 ┃ ┃ ┣ 📂Container
 ┃ ┣ 📂setting
 ┃ ┃ ┣ 📂ChangePassword
 ┃ ┃ ┣ 📂CheckPassword
 ┃ ┃ ┣ 📂CompanyConnection
 ┃ ┃ ┃ ┣ 📂Container
 ┃ ┃ ┗ 📂Setting
 ┃ ┃ ┃ ┣ 📂Container
 ┣ 📂store
 ┃ ┣ 📂slices
 ┗ 📜README.md
```

</div>
</details>
<br>
<details  style="margin-left: 5px;">
<summary><b>백엔드 프로젝트 구조</b></summary>
<div>

```
📦benepick
 ┣ 📂domain
 ┃ ┣ 📂card
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┗ 📂service
 ┃ ┣ 📂mydata
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┗ 📂service
 ┃ ┗ 📂user
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┣ 📂entity
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┗ 📂service
 ┣ 📂global
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┗ 📂service
 ┃ ┣ 📂config
 ┃ ┣ 📂exception
 ┃ ┣ 📂interceptor
 ┃ ┣ 📂log
 ┃ ┃ ┣ 📂annotation
 ┃ ┃ ┣ 📂logTrace
 ┃ ┣ 📂response
 ┃ ┗ 📂util
 ┗ 📜BenepickApplication.java
```

</div>
</details>

---

## 📝 설계 문서

### ERD

<details>
<summary>ERD</summary>
<div markdown="1">       
    <img src="https://hackmd.io/_uploads/SJKl2Mj32.png" alt="ERD 페이지"/>
</div>
</details>

### API

<details>
<summary>전체 문서</summary>
<div markdown="1">       
    <img src="https://hackmd.io/_uploads/S1OrpMsn2.png" alt="전체 문서 페이지"/>
</div>
</details>

<details>
<summary>Request</summary>
<div markdown="1">       
    <img     src="https://hackmd.io/_uploads/SJ3r6Mihh.png" alt="Request 페이지"/>
</div>
</details>

<details>
<summary>Response</summary>
<div markdown="1">       
    <img     src="https://hackmd.io/_uploads/H1J86Gjh3.png" alt="Response 페이지"/>
</div>
</details>

### FIGMA

<details>
<summary>FIGMA</summary>
<div markdown="1">       
    <img     src="https://hackmd.io/_uploads/BkGm0zs23.png" alt="피그마 페이지"/>
</div>
</details>

---

## 📚 컨벤션

### Ground Rule

<details>
  <summary>클릭하여 내용 표시/숨기기</summary>

> GROUND RULE

## 🥇 프로젝트 수칙

### 💻 회의 진행

1. 매일 오전 9시, 오후 5시 2회에 걸쳐 **데일리 스크럼(Daily Scrum)**을 진행해, 개인별 당일 목표를 설정하고 진행 상황을 공유합니다.
2. 매주 금요일 오후 5시에 **스프린트 세션(Sprint Session)**을 진행해 일주일간 프로젝트의 진행 상황 및 추후 진행 목표를 설정합니다.
3. 데일리 스크럼과 스프린트 세션은 팀장이 회의를 주재하고, 다른 팀원들이 돌아가며 회의록을 작성합니다.
4. 회의에 적극적으로 참여하고, 팀장의 지목에 따라 본인의 의견을 반드시 제시합니다.

### 💻 코드 리뷰

1. **코드 리뷰(Code Review)**는 점심시간을 활용해 필요한 부분만 간단히 30분 동안 진행합니다.
2. 서로 다른 코드 스타일을 합의한 **코딩 컨벤션(Coding Convention)**에 따라 일원화합니다.
3. 코드 리뷰는 우선순위에 따라 빠르게 진행하며, 사소한 의견을 반영할 지에 대한 부분은 코드 작성자가 선택할 수 있도록 합니다.

### 💻 코드 작성

1. 에러(Error)가 발생 시 1시간 정도는 혼자서 고민해보고, 해결이 되지 않을 경우 팀원들과 바로 공유합니다.
2. 에러를 해결하기 위해 고민한 내용 및 해결 과정은 노션에 정리하여 공유합니다.
3. 코드에 **주석(Comment)을 작성**하는 습관을 생활화하여, 다른 팀원들이 내가 작성한 코드를 이해하기 쉽도록 합니다.
4. 기능의 구현 원리를 공부하고 파악하기 위해서 오픈 소스(Open Source) 라이브러리 사용을 최소화하는 것을 원칙으로 합니다.

### 💻 깃 관리

1. 풀리퀘스트(Pull Request)가 있을 경우, 이를 확인했다는 의미에서 최소한 1개 이상의 의견을 남겨야 합니다.
2. 풀리퀘스트 시 의견 갈등이 생겼다면, 충분한 토론과 의견 수렴 과정을 거쳐 **다수의 의견**을 따라야 합니다.
3. 커밋(Commit)하기 전에 고칠 부분을 한 번 더 점검합니다.
4. 1가지 기능 또는 1가지 함수를 새로 만들 때마다 커밋하는 습관을 생활화합니다.
5. **커밋 메시지(Commit Message)**는 합의한 **커밋 컨벤션(Commit Convention)**에 따라 최대한 상세하게 작성합니다.
6. 깃 브랜치(Branch) 규칙에 따라 브랜치를 관리하고, 모든 작업은 올바른 브랜치에서 작업해야 합니다.

## 🥈 생활 수칙

### 💻 개인 일정 관리 및 연락

1. 개인 일정이 생긴 경우 **반드시 미리 다른 팀원들에게 공유**합니다.
2. 프로젝트 중간에 취업 등으로 수료하게 된 경우, 도의적 차원에서 공통 프로젝트를 마무리하고 가야 합니다.
3. 카카오톡(KakaoTalk), 디스코드(Discord), 매터모스트(Mattermost) 등을 통한 연락을 확인했을 때는, **확인했다는 의미의 답변 또는 이모지(Emoji)로 표시**합니다.
4. 매주 금요일 논의해, 주말 중 하루는 스트레스 관리 및 개인 공부를 위한 시간으로 활용할 수 있도록 합니다.

### 💻 개인 건강 및 위생 관리

1. 교육장에서 퇴실하기 전에 자기 자리를 깔끔하게 정리정돈합니다.
2. 몸이 아프면, 미안해하지 않고 빠르게 회복할 수 있도록 푹 쉬는 것을 권장합니다.
3. 밥을 든든히 먹고, 굶지 않습니다. “**잘 먹고 죽은 개발자가 때깔도 곱습니다.**”

## 🥉 마인드셋 수칙

### 💻 마인드셋

1. **적극성** : 회의나 코드 리뷰 때 의견이 있다면 망설이지 않고 의견을 이야기합니다. “**말할까 말까 할 때는 말해야 합니다.**”
2. **긍정적인 태도** : 프로젝트에 임할 때는 웃으면서 재미있게 합시다. “**행복하기 때문에 웃는 것이 아니고 웃기 때문에 행복합니다.**”
3. **소통** : 다른 팀원의 의견을 존중하고, 말을 끊지 않아야 합니다. 의견이 다르면, 대화를 통해 타협점을 찾아야 합니다.
4. **협력** : 팀원이 힘들어하는 부분이 있다면, 웃으면서 도와주어야 합니다. 도움을 줄수록 나의 실력도 함께 올라갑니다.
5. **신뢰** : 다른 팀원들의 책임감과 실력에 대해 믿음을 잃지 맙시다.

</details>

### Git Commit

<details>
  <summary>클릭하여 내용 표시/숨기기</summary>
    
> COMMIT CONVENTION
>

- **Commit 메세지 구조**
  - ex) ✨ feat : Add sign in page #S09P11A308-52

```
<emoji> <type> : <subject> <Jira ticket number> // 필수
// 빈 행으로 구분
<body>      // 생략가능
// 빈 행으로 구분
<footer>    // 생략가능
```

</details>

### Git Branch

<details>
  <summary>클릭하여 내용 표시/숨기기</summary>

# 브랜치 명명 컨벤션

> BRANCH NAMING CONVENTION

## Git flow

- ex) **feat/{이슈 키}-{BE/FE}-{이슈 요약}**

- **master** / **main** - 제품으로 출시 및 배포가 가능한 상태인 브랜치 → 최종 결과물 제출 용도
- **develop** - 다음 출시 버전을 개발하는 브랜치 → 기능 완성 후 중간에 취합하는 용도
- **feature** - 각종 기능을 개발하는 브랜치 → feat/login, feat/join 등으로 기능 분류 후 작업
- **hotfix** - 출시 버전에서 발생한 버그를 수정하는 브랜치

</details>

### Codding

<details>
  <summary>클릭하여 내용 표시/숨기기</summary>

> CODING CONVENTION

- 1문자의 이름은 사용하지 않는다.
- 네임스페이스, 오브젝트, 함수 그리고 인스턴스에는 camelCase를 사용한다 `ex) camelCase`
- 클래스나 constructor에는 PascalCase를 사용한다. `ex) PascalCase`
- 약어 및 이니셜은 항상 모두 대문자이거나 모두 소문자여야 한다. `ex) NFT`
- 클래스명과 변수명은 `명사 사용`
- 메서드명은 `동사 사용`
- 상수명은 대문자를 사용하고, 단어와 단어 사이는 \_로 연결한다.
- component는 PascalCase를 사용한다.

</details>

### Jira

<details>
  <summary>클릭하여 내용 표시/숨기기</summary>

> JIRA CONVENTION

1. 매주 월요일 오전 스크럼 회의 이후 각자의 이슈 티켓을 생성한다.
2. 이슈 생성 시 확인해야 할 부분
   - **\*\*\*\***\*\*\*\***\*\*\*\***\*\***\*\*\*\***\*\*\*\***\*\*\*\***\*\*\*\***\*\*\*\***\*\*\*\***\*\*\*\***\*\***\*\*\*\***\*\*\*\***\*\*\*\***담당자가 본인**\*\*\*\***\*\*\*\***\*\*\*\***\*\***\*\*\*\***\*\*\*\***\*\*\*\***\*\*\*\***\*\*\*\***\*\*\*\***\*\*\*\***\*\***\*\*\*\***\*\*\*\***\*\*\*\***으로 설정되어 있는지
   - **컴포넌트**가 지정되어 있는지 (FE, BE, 공통 중 택1)
   - **Epic Link**가 지정되어 있는지 (설계, FE개발, BE개발, 회의, 학습…)
   - 스프린트의 **총 Story Points가 40 이상**인지
3. 이슈 티켓 이름은 **\*\***\*\***\*\***[말머리] 구체적인 기능**\*\***\*\***\*\*** 으로 적는다.
   - \***\*\*\*\*\*\*\***\*\*\*\*\***\*\*\*\*\*\*\***기능 관련 이슈일 경우 **\*\***\*\***\*\***[말머리]**\*\***\*\***\*\***는 기능 명세서의 대분류를 따른다.
4. 매일 오전 스크럼 회의 이후 그 날 처리할 이슈 티켓을 **진행 중**으로 이동시킨다.
   - 실시간으로 이슈를 처리할 때마다 **완료** 처리한다.

</details>

---

## 📄 문서 정리

### 회의록

<details>
<summary>페이지 전체 모습</summary>
<div markdown="1">       
    <img     src="https://hackmd.io/_uploads/rk5Okmoh2.png" alt="전체 페이지"/>
    <img     src="https://hackmd.io/_uploads/HJ9hyXsn2.png" alt="전체 페이지"/>
    <img     src="https://hackmd.io/_uploads/BJi01mj3n.png" alt="전체 페이지"/>
</div>
</details>

<details>
<summary>기획 회의록 페이지 세부 모습</summary>
<div markdown="1">       
    <img     src="https://hackmd.io/_uploads/HJoie7j33.png" alt="기획 회의록 페이지 세부 모습"/>
</div>
</details>
<details>
<summary>스크럼 페이지 세부 모습</summary>
<div markdown="1">       
    <img     src="https://hackmd.io/_uploads/HyWDZmi3n.png" alt="스크럼 페이지 세부 모습"/>
</div>
</details>
<details>
<summary>스프린트 페이지 세부 모습</summary>
<div markdown="1">       
    <img     src="https://hackmd.io/_uploads/S1QCW7j32.png" alt="스프린트 페이지 세부 모습"/>
</div>
</details>
    
### 버그 리포트
<details>
<summary>페이지 전체 모습</summary>
<div markdown="1">       
    <img     src="https://hackmd.io/_uploads/ryAtAzi3n.png" alt="전체 페이지"/>
</div>
</details>
<details>
<summary>세부 페이지 모습</summary>
<div markdown="1">
    <img src="https://hackmd.io/_uploads/HkY1y7sh3.png" alt="전체 페이지"/>
</div>
</details>

### 지식 공유

<details>
<summary>페이지 전체 모습</summary>
<div markdown="1">       
    <img     src="https://hackmd.io/_uploads/BkMa3Gs3h.png    " alt="전체 페이지"/>
</div>
</details>
<details>
<summary>세부 페이지 모습</summary>
<div markdown="1">       
    <img     src="https://hackmd.io/_uploads/Hyfgpzs3n.png" alt="전체 페이지"/>
</div>
</details>

---

## 💻 구동 방법

- 로컬 구동 기준으로 작성되었습니다.

1. clone Project

```
git clone https://lab.ssafy.com/s09-webmobile1-sub2/AirLingo.git
```

2. change path to /frontend/airlingo

```
npm i --legacy-peer-deps
```

3. create .env file in /frontend/airlingo/

```
VITE_SERVER_URL={your_server_url}
VITE_SOCKET_URL={your_socket_url}
VITE_CHAT_SOCKET_URL={your_chat_socket_url}
```

4. input frontend run script

```
npm run dev
```

5. change path to /backend/airlingo/src/main/resources

```
application.yml

cloud:
  aws:
    s3:
      bucket: ${your-bucket-name}
    credentials:
      accessKey: ${your-access-key}
      secretKey: ${your-secret-key}
    region:
      static: ap-northeast-2
      auto: false
    stack:
      auto: false
```

```
application-dev.yml

spring:
  jpa:
    hibernate:
      ddl-auto: create #create update none
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: ${your-db-url}
    username: ${your-db-username}
    password: ${your-db-password}
  rabbitmq:
    host: localhost
    port: 5672
    username: ${your-rabbitmq-username}
    password: ${your-rqbbitmq-password}

openviduUrl: ${your-openvidu-url}
openviduSecret: ${your-openvidu-secret}
```

6. install docker,openvidu,redis,rabbitmq
7. run openvidu

```
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.28.0
```

8. change path /matching/airlingo
9. run docker-compose.yaml for rabbitmq
10. run backend,matching program

---

## 💾 결과물

### UCC

https://youtu.be/8numB_R7RLE

### 시연 영상

https://www.youtube.com/watch?v=WcZEspXgMLA

### PPT
