[![seoulw_logo](https://github.com/user-attachments/assets/345224b4-4917-4c46-84f2-7eec5f876b4a)](https://seoulw.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-181717?style=flat-square&logo=redux&logoColor=white) ![MUI](https://img.shields.io/badge/Material_UI-0078D4?style=flat-square&logo=mui&logoColor=white) ![SASS](https://img.shields.io/badge/SASS-CC6699?style=flat-square&logo=sass&logoColor=white) ![PWA](https://img.shields.io/badge/PWA-1A73E8?style=flat-square&logo=pwa&logoColor=white) ![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E6?style=flat-square&logo=axios&logoColor=white) ![xml-js](https://img.shields.io/badge/xml--js-F9A826?style=flat-square&logo=javascript&logoColor=white) ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-892B56?style=flat-square&logo=sweetalert2&logoColor=white) ![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=flat-square&logo=next.js&logoColor=white)


## 🌱 소개
서울 문화 공연 정보 PWA 사이트 **Seoul, W**입니다.

![seoulw_main](https://github.com/user-attachments/assets/5f4caca1-7443-4e66-966d-01231c131397)



## 🔗 배포 URL
<https://seoulw.vercel.app/>



## 📑 요약
### 1. **주제**
   - 서울 문화 공연 정보 제공 모바일(480px) 사이트

### 2. **목표**
   - **서울 문화 정보 제공**: 서울에서 열리는 공연, 전시, 콘서트 등 다양한 문화 행사 정보를 실시간으로 확인
   - **회원가입 및 로그인 기능**: 회원가입 및 로그인, SNS 연동 로그인 서비스를 제공
   - **회원 전용 서비스 추가**: 회원전용 서비스인 리뷰 작성과 북마크 등록/삭제 기능을 제공, 사용자 경험 강화

### 3. **핵심 기능**
   - KOPIS 오픈 API 활용 
   - 로그인 (자체, sns) 
   - 리뷰 작성 및 북마크 등록/삭제
     
### 4. **주요 기술 스택**
   - Next.js, Firebase, Vercel
     
### 5. **기간 및 인원**
   - 2024.09.30 ~ 2024.10.17 (18일), 4인



## 🙌 담당 직무
| 이름   | GitHub                              | 직무              |
|:--------:|:---------------------------------------:|:-------------------:|
| 고유나 | [tolix-a](https://github.com/tolix-a) | 기능개발, API     |
| 박지연 | [pjiyeon90](https://github.com/pjiyeon90) | 디자인, 로그인    |
| 성주영 | [0011git](https://github.com/0011git) | 기획, 팀장            |
| 허다영 | [Pon119](https://github.com/Pon119) | 서버관리, 배포    |



## 💡 주요 기능
### 1. 공연예술통합전산망(KOPIS) API 활용
   - [KOPIS API](https://www.kopis.or.kr/por/cs/openapi/openApiList.do?menuId=MNU_00074)를 활용해 메인 컨텐츠를 제공

### 2. 카카오맵 API 지도
   - [카카오맵 API](https://apis.map.kakao.com/web/)를 사용해 디테일 페이지에서 공연장 지도 출력

### 3. 회원가입 및 로그인
   - sns 로그인 (Github, 네이버, 구글) 지원
   - Next Auth 사용
   - 이메일 등의 입력값 유효성 검사
   - DB로 Google Firebase 사용

### 4. 리뷰 작성 및 북마크 기능
   - 회원 전용으로 리뷰 작성 및 북마크 등록/삭제 기능 제공
   - DB로 Google Firebase를 사용



## 💼 폴더 구조
    📦seoulw
     ┣ 📂.next
     ┣ 📂public
     ┃ ┣ 📂assets
     ┃ ┃ ┣ 📂icons
     ┃ ┃ ┗ 📂images
     ┃ ┣ 📜sw.js            # PWA
     ┃ ┣ 📜sw.js.map        # PWA
     ┃ ┣ 📜workbox.js       # PWA
     ┃ ┣ 📜workbox.js.map   # PWA
     ┃ ┗ 📜manifest.json    # PWA
     ┣ 📂src
     ┃ ┣ 📂components       # 컴포넌트 폴더
     ┃ ┣ 📂lib
     ┃ ┃ ┗ 📜firebase.js    # DB
     ┃ ┣ 📂pages            # 페이지 폴더
     ┃ ┃ ┣ 📂api
     ┃ ┃ ┃ ┣ 📂auth
     ┃ ┃ ┃ ┃ ┗ 📜[...nextauth].js    # 로그인 관련 (Next Auth)
     ┃ ┃ ┃ ┣ 📜api.js       # KOPIS API
     ┃ ┃ ┃ ┗ 📜mapapi.js    # 카카오맵 API
     ┃ ┣ 📂store            # zustand 전역 상태 관리
     ┃ ┣ 📂styles           # scss
     ┃ ┗ 📂utils            # api 함수, xmlToJson변환 함수 등 공통 함수 폴더
     ┣ 📜.env
     ┗ 📜README.md



## 🛠️ 개발 환경
| 기술            | 기술명                                                 | Badge                                                           |
|:-----------------:|:-----------------------------------------------------:|:-------------------------------------------------------------:|
| **프레임워크**    | Next.js                                               | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white) |
| **데이터베이스**  | Google Firebase                                      | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) |
| **배포**          | Vercel                                               | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white) |
| **API 테스트**    | Postman                                              | ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white) |
| **버전 관리**     | GitHub                                               | ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white) |
| **상태 관리**     | Zustand                                              | ![Zustand](https://img.shields.io/badge/Zustand-181717?style=flat-square&logo=redux&logoColor=white) |
| **UI 라이브러리** | Material UI (MUI)                                    | ![MUI](https://img.shields.io/badge/Material_UI-0078D4?style=flat-square&logo=mui&logoColor=white) |
| **스타일링**      | SASS                                                 | ![SASS](https://img.shields.io/badge/SASS-CC6699?style=flat-square&logo=sass&logoColor=white) |
| **PWA**          | Progressive Web App                                  | ![PWA](https://img.shields.io/badge/PWA-1A73E8?style=flat-square&logo=pwa&logoColor=white) |
| **슬라이더**      | Swiper                                               | ![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white) |
| **HTTP 요청**     | Axios                                                | ![Axios](https://img.shields.io/badge/Axios-5A29E6?style=flat-square&logo=axios&logoColor=white) |
| **XML 파싱**      | xml-js                                               | ![xml-js](https://img.shields.io/badge/xml--js-F9A826?style=flat-square&logo=javascript&logoColor=white) |
| **알림**          | SweetAlert2                                           | ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-892B56?style=flat-square&logo=sweetalert2&logoColor=white) |
| **인증**          | NextAuth.js                                           | ![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=flat-square&logo=next.js&logoColor=white) |



## 🙋‍♀️ 개발 상세
| 이름   | Seoul,W GitHub                        |
|--------|---------------------------------------|
| 고유나 | [next-seoulw](https://github.com/tolix-a/next-seoulw) |
| 박지연 | [업데이트중]() |
| 성주영 | [업데이트중]() |
| 허다영 | [seoulw-dy](https://github.com/Pon119/seoulw-dy) |



## 📚 참고 URL
- 기획서 : 
[SeoulW Google Docs](<https://docs.google.com/document/d/1Ieh-tqHfDDQsXYfCo3cP_YHhUgt8ATDOMHSVXXcL5fs/edit?tab=t.0>)
- 화면 설계 : 
[SeoulW Figma](<https://www.figma.com/design/dDn9TXA4NRfNO3gDJMFwO1/%EA%B7%B8%EB%A6%B0-2%EC%B0%A8)%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0-1&node-type=canvas&t=uCwArR6SShR2lg8n-0>)
- ppt : 
[SeoulW Canva](https://www.canva.com/design/DAGTt3bDvUE/-n3BoRlItJUojwIII0JnqQ/edit)

----------
## 맡은 부분
API, 카테고리 페이지, 검색 페이지

1. API
   - xml 데이터를 JSON으로 변환
   - 
2. 카테고리
   - API 장르 별, 탭 별로 호출
   - 카테고리 페이지에 진입시 뮤지컬-전체 데이터를 기본으로 호출
   - 장르 변경시 전체 탭이 기본으로 선택되게 설정
   - 공연이 없을 시 / 공연이 없습니다
   - 메인페이지에서 전체보기를 눌러서 진입 시 해당 장르, 탭 공연이 보이게 하기
   - 데이터 불러올 때까지 로딩 넣기 + 무한스크롤 시 로딩
   - 무한스크롤 구현
3. 검색
   - 검색 페이지 진입 시 검색창 비어있게 만들기
   - 검색 결과에서 검색창에 검색어 지우면 다시 검색하기 전으로 돌아가게 하기
   - 검색 결과 유무 구분 / 공연 리스트 or 검색 결과가 없습니다
   - 검색 결과에 나온 공연 누르면 해당 공연 디테일 페이지로 이동
   - 검색 시 쿠키 저장, 쿠키 최근 검색어에 반영
   - 검색 쿠키, 공연 쿠키 각각 10개씩만 저장. 10개 초과할 경우 가장 오래된 쿠키를 제거.
   - 이전에 검색한 것을 다시 검색한 경우 최근에 검색한 것만 남기기
   - 최근 검색어 누르면 검색 결과로 이동
   - 공연 디테일 페이지 진입시 쿠키에 저장되게 하기
   - 최근 본 공연 누르면 해당 공연 디테일 페이지로 이동
   - X 버튼 누르면 쿠키 삭제
   - 쿠키가 없으면 최근 검색어가 없습니다 / 최근 본 공연이 없습니다
   - 검색 결과 무한스크롤 구현
   - 데이터 불러오기 전까지 로딩 넣기 + 무한스크롤 시 로딩
   - 컴퓨터에서 시연할 수 있도록 overflow-x auto 대신 swiper 사용
   
## 트러블슈팅
- x 버튼을 누르면 하나만 삭제되어야 하는데 쿠키가 어쩔땐 1개, 어쩔땐 전부 지워짐 <br/>
  :


---------
## 📱 스크린샷
![t](https://github.com/user-attachments/assets/dd46735e-4f07-4ab9-9eb6-7377388ddaa3)