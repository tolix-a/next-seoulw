import React from "react";
import axios from "axios";
import { xmlTOjson } from "@/utils/apiFunc";
var convert = require("xml-js");

const today = new Date();
const realToday = dateFormat(today);

/**날짜 형식 바꾸는 함수 */
function dateFormat(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

/** thisweek용 시작일, 종료일 구하기 */
function getThisWeekDate(today) {
  const dayIndex = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  const endDate = new Date(today); // stdate 복사
  endDate.setDate(today.getDate() + (7 - dayIndex));
  const eddate = dateFormat(endDate);
  return eddate;
}
let eddateThisWeek = getThisWeekDate(today);

/** 공연중 시작일 어제*/
function getYesterday(date) {
  const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
}
const yesterday = dateFormat(getYesterday(today)); 

/** 내일 */
function getTomorrow(today) {
  const newDate = new Date(today);
  newDate.setDate(today.getDate() + 1);
  return newDate;
}
const tomorrow = getTomorrow(today);
const realTomorrow = dateFormat(tomorrow);

/** 장르 전체 1년후 종료일*/
function addYear(date) {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + 1);
  return newDate;
}
const aYearDate = dateFormat(addYear(tomorrow));


//api 관련 기본 변수
const API_KEY = process.env.NEXT_PUBLIC_KOPIS_API_KEY;
const defaultParams = {
  service: API_KEY,
  rows: "20", //요청개수
  signgucode: "11",
  stdate: yesterday,
  eddate: aYearDate,
};

const thisWeekParams = {
  service: API_KEY,
  rows: "20",
  signgucode: "11",
  stdate: realToday,
  eddate: eddateThisWeek,
};
const ingParams = {
  service: API_KEY,
  rows: "20",
  signgucode: "11",
  stdate: yesterday,
  eddate: realToday,
};
const upcomingParams = {
  service: API_KEY,
  rows: "20",
  signgucode: "11",
  stdate: realTomorrow,
  eddate: aYearDate,
};

const instance = axios.create({
  baseURL: "http://www.kopis.or.kr/openApi/restful/pblprfr",
  params: defaultParams,
});

// [↓] 메인(store에 저장) 시작======================================================================
async function apiMain(res) {
  const genreParams = [
    { shcate: "GGGA", label: "musical" }, // 뮤지컬
    { shcate: "AAAA", label: "play" }, // 연극
    { shcate: "CCCD", label: "pop" }, // 대중음악
    { shcate: "BBB", label: "dance" }, // 무용
    { shcae: "CCCA", label: "classic" }, // 서양음악
    { shcate: "CCCC", label: "gukak" }, // 국악
    { shcate: "EEEB", label: "circus" }, // 서커스/마술
    { shcate: "EEEA", label: "etc" }, // 기타
  ];

  const requests = { thisWeek: [], upcoming: [], genres: [] };
  genreParams.forEach(({ shcate }) => {
    const mainParams = {
      service: API_KEY,
      rows: "20", //요청개수
      signgucode: "11",
      stdate: yesterday,
      eddate: aYearDate,
      cpage: 1,
      shcate: shcate,
    };
    const mainThisWeekParams = {
      service: API_KEY,
      rows: "20", //요청개수
      signgucode: "11",
      stdate: realToday,
      eddate: eddateThisWeek,
      cpage: 1,
      shcate: shcate,
    };
    const mainUpcomingParams = {
      service: API_KEY,
      rows: "20", //요청개수
      signgucode: "11",
      stdate: realTomorrow,
      eddate: aYearDate,
      cpage: 1,
      shcate: shcate,
    };

    requests.thisWeek.push(
      axios.get("http://www.kopis.or.kr/openApi/restful/pblprfr", {
        params: { ...mainThisWeekParams },
      })
    ); //이번주
    requests.upcoming.push(
      axios.get("http://www.kopis.or.kr/openApi/restful/pblprfr", {
        params: { ...mainUpcomingParams, prfstate: "01" },
      })
    ); //공연예정
    requests.genres.push(
      axios.get("http://www.kopis.or.kr/openApi/restful/pblprfr", {
        params: { ...mainParams },
      })
    ); //장르
  });

  const results = { thisWeek: [], upcoming: [], genres: [] };
  results.thisWeek = await Promise.all([...requests.thisWeek]);
  results.upcoming = await Promise.all([...requests.upcoming]);
  results.genres = await Promise.all([...requests.genres]);

  //results분류할 오브젝트
  const response = { thisWeek: [], upcoming: [], genres: [] };

  results.thisWeek.forEach((result) => {
    response.thisWeek.push(xmlTOjson(result.data));
  });
  results.upcoming.forEach((result) => {
    response.upcoming.push(xmlTOjson(result.data));
  });
  results.genres.forEach((result) => {
    response.genres.push(xmlTOjson(result.data));
  });

  res.json(response);
}
// [↑] 메인(store) 종료=======================================================================================

// [↓] 카테고리 시작===================================================================================
// 장르별(1개)
async function apiGenre(shcate, cpage, res) {
  const dataGenre = await instance.get("", {
    params: { cpage: `${cpage}`, shcate: `${shcate}` },
  }); //뮤지컬 GGGA
  res.json(xmlTOjson(dataGenre.data));
}

// 이번주(장르 1개)
async function apiThisWeek(shcate, cpage, res) {
  const dataThisWeek = await instance.get("", {
    params: { ...thisWeekParams, cpage: `${cpage}`, shcate: `${shcate}` },
  }); //뮤지컬 GGGA
  res.json(xmlTOjson(dataThisWeek.data));
}

// 공연중(장르 1개)
async function apiIng(shcate, cpage, res) {
  const dataIng = await instance.get("", {
    params: { ...ingParams, cpage: `${cpage}`, shcate: `${shcate}`, prfstate: "02" },
  }); //뮤지컬 GGGA
  res.json(xmlTOjson(dataIng.data));
}
// 공연예정(장르 1개)
async function apiUpcoming(shcate, cpage, res) {
  const dataUpcoming = await instance.get("", {
    params: { ...upcomingParams, cpage: `${cpage}`, shcate: `${shcate}`, prfstate: "01" },
  }); //뮤지컬 GGGA
  res.json(xmlTOjson(dataUpcoming.data));
}

// [↑] 카테고리 종료=============================================================================

// [↓] 서치 시작=====================================================================
async function apiSearch(searchWord, cpage, res) {
  const searchParams = {
    service: API_KEY,
    rows: "20",
    signgucode: "11",
    stdate: "20140101",
    eddate: aYearDate,
  };
  // let encodedWord = encodeURIComponent(searchWord);
  let title = await instance.get("", {
    params: { ...searchParams, cpage: `${cpage}`, shprfnm: `${searchWord}` },
  });
  let venue = await instance.get("", {
    params: { ...searchParams, cpage: `${cpage}`, shprfnmfct: `${searchWord}` },
  });

  let titleData = xmlTOjson(title.data);
  let venueData = xmlTOjson(venue.data);
  res.json({ titleData, venueData });
}
// [↑] 서치 종료=============================================================================

// [↓] 디테일 시작=====================================================================================
//디테일
async function apiDetail(mt20id, res) {
  const detailResult = await axios.get(
    `http://www.kopis.or.kr/openApi/restful/pblprfr/${mt20id}`,
    { params: { service: API_KEY } }
  );
  let detail = xmlTOjson(detailResult.data);
  // console.log(detailResult.data);

  


  let placeId = detail.mt10id._text;

  const detailMapResult = await axios.get(
    `http://www.kopis.or.kr/openApi/restful/prfplc/${placeId}`,
    { params: { service: API_KEY } }
  );
  let detailMap = xmlTOjson(detailMapResult.data);
  console.log(detailMap);
  res.json({ detail, detailMap });
}

//디테일-맵
async function apiDetailMap(mt10id, res) {
  const detailMap = await axios.get(
    `http://www.kopis.or.kr/openApi/restful/prfplc/${mt10id}`,
    { params: { service: API_KEY } }
  );
  res.json(detailMap.data);
}
// [↑] 디테일 종료=============================================================================

export default async function handler(req, res) {
  const { type, shcate, cpage, searchWord, mt20id } = req.query;
  // type api함수종류
  // shcate 장르
  // cpage 페이지
  // searchWord 검색어
  // mt20id 작품id
  // mt10id 장소id

  switch (type) {
    case "apiMain":
      await apiMain(res);
      break;

    case "apiGenre":
      await apiGenre(shcate, cpage, res);
      break;
    case "apiThisWeek":
      await apiThisWeek(shcate, cpage, res);
      break;
    case "apiIng":
      await apiIng(shcate, cpage, res);
      break;
    case "apiUpcoming":
      await apiUpcoming(shcate, cpage, res);
      break;

    case "apiSearch":
      await apiSearch(searchWord, cpage, res);
      break;

    case "apiDetail":
      await apiDetail(mt20id, res);
      break;

    default:
      break;
  }
}
