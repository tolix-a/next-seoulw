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


   
## 트러블슈팅
- x 버튼 <br/>
  :


---------
## 📱 스크린샷
![t](https://github.com/user-attachments/assets/dd46735e-4f07-4ab9-9eb6-7377388ddaa3)
