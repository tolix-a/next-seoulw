import React, { useEffect, useState } from "react";
import headerStyle from "@/styles/header.module.scss";
import { useRouter } from "next/router";
import useSearchStore from "@/store/search_store";
// import { useSearchParams } from 'next/navigation'
import movePageStore from "../store/movePage_store";

function Header() {
  const { movePageData, moveDetailData } = movePageStore(); //movePageData=[장르인덱스, all인덱스]
  const [header, setHeader] = useState();
  const router = useRouter();
  // const genresArr = ['뮤지컬', '연극', '대중음악', '무용', '클래식', '국악', '서커스/마술', '기타'];

  // setSubName(() => genresArr[movePageData[0]])

  const movePage = (page) => {
    router.push(page);
  };

  const onCategory = () => {
    const genresArr = [
      "뮤지컬",
      "연극",
      "대중음악",
      "무용",
      "클래식",
      "국악",
      "서커스/마술",
      "기타",
    ];
    setHeader(() => <HeaderSub name={genresArr[movePageData[0]]} />);
  };

  const onDetail = () => {
    setHeader(() => <HeaderDetail name={moveDetailData} />);
  };

  useEffect(() => {
    switch (router.pathname) {
      case "/":
        setHeader(() => <HeaderMain movePage={movePage} hide={false} />);
        break;
      case "/category":
        onCategory();
        break;
      case "/detail":
        onDetail();
        break;
      case "/search":
        setHeader(() => <HeaderSearch />);
        break;
      case "/search2":
        setHeader(() => <HeaderSearch2 />);
        break;
      case "/mypage":
        setHeader(() => <HeaderSub name={"마이페이지"} />);
        break;
      case "/edit":
        setHeader(() => <HeaderSub name={"회원 정보 수정"} />);
        break;
      case "/review":
        setHeader(() => <HeaderSub name={"나의 리뷰"} />);
        break;
      case "/bookmark":
        setHeader(() => <HeaderSub name={"북마크"} />);
        break;
      case "/dropout":
        setHeader(() => <HeaderSub name={"회원 탈퇴"} />);
        break;
      case "/login":
      case "/join":
        setHeader(() => <HeaderMain movePage={movePage} hide={true} />);
        break;
      default:
        setHeader(() => <HeaderMain movePage={movePage} hide={false} />);
        break;
    }
  }, [router.pathname]);

  return <header>{header}</header>;
}

// 뒤로 가기 버튼
const GoBackBtn = () => {
  const router = useRouter();
  const goBack = () => {
    if (window.history.length > 2) {
      router.back(); // 히스토리가 있을 때만 뒤로가기
    } else {
      router.push("/"); // 히스토리가 없으면 홈으로 이동
    }
  };

  return (
    <div className={headerStyle.goBackBtnWrap}>
      <button
        type="button"
        className={headerStyle.goBackBtn}
        onClick={goBack}
      ></button>
    </div>
  );
};

// 메인 헤더
const HeaderMain = ({ movePage, hide }) => {
  return (
    <div
      className={`${headerStyle.mainHeaderWrap} ${
        hide ? headerStyle.hide : ""
      }`}
    >
      <h1 onClick={() => movePage("/")} className="logo"></h1>
      <div className={headerStyle.btnWrap}>
        <button
          onClick={() => movePage("/search")}
          type="button"
          className={headerStyle.search}
        ></button>
        <button
          onClick={() => movePage("/mypage")}
          type="button"
          className={headerStyle.myPage}
        ></button>
      </div>
    </div>
  );
};

// 서브(카테고리, MY) 헤더
const HeaderSub = ({ name }) => {
  return (
    <div
      className={`${headerStyle.subHeaderWrap} ${headerStyle.btnWrapCommon}`}
    >
      <GoBackBtn />
      <h2 className={headerStyle.subtitle}>{name}</h2>
    </div>
  );
};

// 디테일 헤더
const HeaderDetail = ({ name }) => {
  return (
    <div
      className={`${headerStyle.detailHeaderWrap} ${headerStyle.btnWrapCommon}`}
    >
      <GoBackBtn />
      <h2 className={headerStyle.itemTitle}>{name}</h2>
    </div>
  );
};

// 검색 헤더
const HeaderSearch = () => {
  const router = useRouter();
  const { searchWord, setSearchWord, setResults } = useSearchStore();
  const [functionData, setFunctionData] = useState([]);

  //검색결과초기화
  useEffect(() => {
    setSearchWord("");
  }, [setSearchWord]);

  function goBack() {
    router.back();
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchWord) {
      setResults([searchWord]); //쿠키용

      // [↓] api호출용
      // const data = await fn.search(searchWord, 1);
      // setFunctionData(data);
      router.push(`/search2?query=${searchWord}`);
    }
  };

  return (
    <div className={headerStyle.searchWrap}>
      <button
        type="button"
        className={headerStyle.goBackBtn1}
        onClick={goBack}
      ></button>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="searchWord"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="공연명을 검색하세요."
        ></input>
        <button type="submit"></button>
      </form>
    </div>
  );
};
const HeaderSearch2 = () => {
  const router = useRouter();
  const { searchWord, setSearchWord, setResults } = useSearchStore();
  const [functionData, setFunctionData] = useState([]);

  function goBack() {
    setSearchWord("");
    router.back();
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchWord !== "") {
      setResults([searchWord]);
      router.push(`/search2?query=${searchWord}`);
    }
  };

  const handle = (e) => {
    const value = e.target.value;
    setSearchWord(value);

    if (value.trim() === "") {
      setTimeout(() => {
        router.push("/search");
      }, 0);
    }
  };

  return (
    <div className={headerStyle.searchWrap}>
      <button
        type="button"
        className={headerStyle.goBackBtn1}
        onClick={goBack}
      ></button>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="searchWord"
          value={searchWord}
          onChange={handle}
          placeholder="공연명을 검색하세요."
        ></input>
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default Header;
