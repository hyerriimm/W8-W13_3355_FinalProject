## 삼삼오오(3355)
>같은 관심사를 가진 사람들을 모으고 소통할 수 있도록 돕는 소모임 커뮤니티  
<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8f5d6a9e-f4fc-4826-9c8e-736e1a168e2c%2F%25EC%25A0%259C%25EB%25AA%25A9%25EC%259D%2584-%25EC%259E%2585%25EB%25A0%25A5%25ED%2595%25B4%25EC%25A3%25BC%25EC%2584%25B8%25EC%259A%2594_-005.png?table=block&id=1a27923c-ed68-40b9-97c6-d143fdefe523&spaceId=0603c37a-ae84-4a7b-bb3b-65f4fe11e0f2&width=1830&userId=57c7d7d1-cefd-4daf-8f93-2c234339168a&cache=v2"> 
>https://3355.world  
- 삼삼오오(3355)는 같은 취미, 관심사를 가진 사람들을 모아 소모임을 진행하려는 사람들을 위한 모임 개설 및 소통 커뮤니티입니다.   
- 직접 모임을 주최하여 사람들을 모집하거나 다른 사람들의 모임에 지원하여 다양한 주제의 소모임을 진행할 수 있습니다.

<br />

## ✔ 주요기능
>삼삼오오의 핵심 기능은 컨텐츠 등록 및 채팅 기능.

>사용자들은 모임을 갖고 싶은 카테고리로 모임을 개설 가능.   

>각 사용자들은 원하는 모임에 참여하여 서로 얘기를 나누며 오프라인 만남도 가질 수 있도록 장려.

 **`메인 페이지 - 무한스크롤, 검색 기능(카테고리별 조회, 키워드 검색(제목, 내용, 주소))`** 
 
 **`게시글, 댓글 CRUD`** 
 
 **`게시글 상세 페이지 - 찜, 지원 확인/마감(주최자), 지원신청(참가자)`** 
 
 **`실시간 채팅`** 
   - [WebSocket / Stomp pub/sub] 을 활용한 실시간 데이터 전송으로 유저간 채팅 기능
 
 **`실시간 알림 기능`**
  - SSE(Server Sent Event)를 이용한 실시간 알림 기능
 
 **`신고 및 관리 기능`**
   
<details>
<summary><b> 기능 설명 펼치기</b></summary>
<div markdown="1">

### 1. 회원가입 및 로그인 
  - 카카오톡을 이용한 소셜 로그인 
  - JWT 발급을 통한 로그인 
  - 토큰 재발급 구현
  - 회원 정보 수정 구현
  - 회원 탈퇴 구현

### 2. 게시글 
  - 게시글 업로드 구현
     ##### 백엔드
    - 카테고리별 다른 기본 이미지 업로드
    - 스케쥴러 도입
      1. 모집 마감일이 지났을 때 모집인원이 0인 경우 CLOSE로 업데이트
      2. 모집 마감일이 지났을 때 모집인원이 1명 이상인 경우 DONE으로 업데이트 

### 3. 지원 신청 기능 
  - 모임 주최가가 아닌 회원의 경우 모임 참가신청 및 취소 가능
  - 모임 주최자가 참가 신청 수락 시 모임 참여 가능

### 4 채팅 기능
  - 게시글 작성시 채팅방 생성
  - 다른 지원자들의 참가 신청이 수락될 경우 채팅방에 참여 
  - 채팅방에 읽지 않은 채팅 메세지 개수 조회 가능
  - 
### 5. 실시간 알림 기능 
  - 회원이 작성한 게시글에 댓글이 달린 경우 실시간 알림 전송
  - 회원이 작성한 게시글에 신청이 있을 경우 실시간 알림 전송
  - 모임 신청 거절 시 실시간 알림 전송
  - 모임 신청 승인 시 실시간 알림 전송 

### 6. 신고 기능 
  - 게시글, 댓글 및 회원에 대해 신고 가능 
  - 누적 신고 처리 횟수 10회 이상이 되면 회원 제재 
  - 관리자만 관리할 수 있도록 관리자 권한부여
 </div>
 </details>
 
 <br />

## 🗓 프로젝트 기간 & 참여 인원
* 2022년 9월 16일 ~ 2022년 10월 27일   
- [FrontEnd] : 김고은(부 팀장), 이경하, 이혜림
- [BackEnd]  : 김범석(팀장), 김하영 

<br />

## 📜 아키텍쳐
<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc50ee6a7-1581-4f99-acba-d378ab8f5557%2FUntitled.png?table=block&id=30e25717-b2ce-4ad8-8b20-5958e25d7e73&spaceId=0603c37a-ae84-4a7b-bb3b-65f4fe11e0f2&width=1510&userId=57c7d7d1-cefd-4daf-8f93-2c234339168a&cache=v2">   

<br />

## 🔧 기술적 의사결정
<details>
<summary><b>펼치기</b></summary>
<div markdown="2">
 
|사용 기술|설명|
|------|---|
|Redux Toolkit|상태 변경시 단방향 데이터 흐름으로 인하여 결과를 예측할 수 있고 버그 발생의 원인을 더 쉽게 파악할 수 있어 디버깅에 용이하기 때문에 선택함. 불변성 관리, 비동기 작업 처리를 위한 함수 디스패치용 미들웨어 등의 패키지가 내장되어있고, 꼭 작성해야 하는 보일러플레이트 코드가 줄어들어 기존보다 짧고 쉬운 코드만으로 전역 상태 관리가 가능하다는 장점때문에 선택함.|
|Axios|새로고침 없이 서버와 데이터를 주고받을 수 있고 자동으로 JSON데이터 형식으로 변환하며 Promise객체를 리턴하기 때문에 데이터를 다루기 편리하여 선택함.|
|Styled-Component|Javascript파일 안에서 CSS를 컴포넌트화 하여 props를 참조할 수 있고, 해당 컴포넌트에 한정하여 스타일을 정의하기 때문에 다른 코드에 미칠 사이드 이펙트를 방지할 수 있어 선택함. 팀원이 만든 스타일을 재정의하여 사용하려고 할 경우 스타일을 상속하는 속성을 찾기 위해 많은 CSS파일들을 검토하지 않아도 된다는 장점이 있어 CSS파일을 작성하는 것 보다 컴포넌트의 스타일을 이해하고 다른 파일에서 활용하기 수월하기 때문에 사용함.|
|Kakao Maps|지도를 이용하여 모임 장소 찾고 마커로 해당 장소를 표시해주기 위해 사용함|
|SSE|클라이언트에게 게시글에 댓글이 달리거나 가입 신청이 올 경우 가입이 승인 및 거절 될 경우 채팅이 올 경우 실시간 알림을 주기 위하여 도입함. |
|stomp    sockjs|채팅을 이용해 실시간으로 소통을 하기 위해 websocket 기반 stomp를 활용함|
|GitHub Actions|배포 및 서버에 쏟는 시간을 줄이고 개발에 더 집중을 하기 위해 기술을 채택함. (Travis CI, Jenkins도 고려사항에 넣었으나 개발 시간 대비 효율을 최대화 할 수 있는 Github Actions를 사용함.)  |
|Nginx|무중단 배포, https적용 용이성때문에 기술을 채택함. (무중단 배포에는 AWS의 Blue-Green 배포, 도커를 이용한 무중단 배포가 있지만 기술적 난이도 및 비용을 고려하여 Nginx를 도입함.)|
|QueryDSL|복잡한 쿼리 및 동적 쿼리를 해결하기 위해 Querydsl을 적용함.|
 
 </div>
 </details>

<br />

## 📌 트러블슈팅 

<details>
<summary><b>이미지 로딩 딜레이 이슈 [Frontend]</b></summary>
<div markdown="3">
 
 `문제발생`
 
 >업로드 된 이미지의 용량이 커서 이미지가 차오르며 로딩되는 문제
 
 `원인`
 
 >대용량 이미지 크기 변환을 고려하지 않고 백서버의 nginx사용으로 게시글 작성시에 발생했던 대용량 파일 업로드 불가( 413error Request Entity Too Large) 문제를 해결하고자 client_max_body_size를 조정한 뒤 20MB까지 업로드를 허용했던 것이 원인이었음
 
 `해결`
 
 >리사이징 속도도 빠르고 직접 크기와 용량제한 설정이 가능한 browser-image-compression 라이브러리를 사용해서 최대 1MB까지 제한을 두어 리사이징을 하였음 리사이징 이후 이미지가 표시되는 시간이 6.1초에서 2.4초로 감소하였음 결과적으로 유저의 사용성도 개선하고 서버비용도 줄일 수 있었음

 </div>
 </details>
 
 <details>
<summary><b>resize이벤트 콜백 함수의 반복적인 실행 [Frontend]</b></summary>
<div markdown="4">
 
 `문제발생`
 
 >브라우저 창 크기 조정시 resize이벤트 콜백 함수의 반복적인 실행으로 인해 리소스 낭비가 우려되는 상황 발생
 
 `원인`
 
 >브라우저 사이즈가 변경되면 모임장소를 나타낸 마커를 지도의 중심으로 재이동시키는 반응형 화면의 구현을 위해서 resize 이벤트 리스너를 걸었으나, 브라우저 창의 픽셀변화가 일어날 때마다 콜백함수가 과도하게 실행된 것이 원인
 
 `해결`
 
 >사용자가 창 크기를 변경하더라도 마지막 결정된 resize 이벤트를 기준으로 0.3초가 지난 뒤에 마커 조정이 한 번만 일어나도록 디바운싱을 적용하여 리소스 낭비와 성능 저하를 막음

 </div>
 </details>
 
  <details>
<summary><b>ACCESSTOKEN 재발급 방법 [Frontend]</b></summary>
<div markdown="5">
 
 `문제발생`
 
 >액세스 토큰이 만료되었을 경우 어떤 방식으로 서버에 액세스 토큰 재발급 요청을 보낼 것인지 결정해야 함
 
 `선택지`
 
 >1안) 로그인 이후로 보내는 모든 http요청에 토큰이 만료되었는지 확인하는 API를 사용해서 토큰 만료 여부를 확인하고 토큰을 재설정 한 뒤, 원래 보내려던 요청을 연달아 수행한다.
 
 >2안) useEffect 훅을 사용하여 로그인 이후로부터 페이지 이동시 처음으로 화면이 렌더링 되었을 때만 토큰 만료 확인 API를 요청하는 함수를 실행하고 응답으로 만료까지 남은 시간을 받아 setTImeout으로 함수를 재실행할 시간을 설정하여 만료까지 남은 시간이 지난 뒤 다시 토큰을 재발급 받도록 설정한다.
 
 `의견결정`
 
 >화면이 렌더링 된 이후 사용자가 액션을 취하지 않아 별다른 http 요청이 없어도 자동으로 토큰을 재발급 받아오게 해오도록 하기 위해서는 2안을 선택하는 것이 낫다고 판단하여 2안으로 결정함

 </div>
 </details>
 
 

<br />

**Frontend Tech Stack**  
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <img src="https://img.shields.io/badge/Kakao-FFCD00?style=for-the-badge&logo=Kakao&logoColor=black">
