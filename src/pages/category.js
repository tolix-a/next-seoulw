// 2. 카테고리
import React, { useEffect, useState } from "react";
import categoryStyle from "@/styles/category.module.scss";
import Card from "@/components/Card";
import GenresTapBar from "@/components/GenresTapBar";
import axios from "axios";
import { handler } from "../pages/api/api";
import { fn } from "@/utils/apiFunc";
import Loading from "@/components/Loading";
import movePageStore from "../store/movePage_store";
import TopButton from "@/components/TopButton";

function Category() {
  const [all, setAll] = useState(1);
  const [clickedGenre, setClickedGenre] = useState(0);
  const [functionData, setFunctionData] = useState([]);

  // [↓] 여기변경 =============
  const { movePageData, setMovePageData } = movePageStore(); //movePageData=[장르인덱스, all인덱스]

  // [↑] 여기변경 =============

  const genreMapping = [
    "GGGA",
    "AAAA",
    "CCCD",
    "BBB",
    "CCCA",
    "CCCC",
    "EEEB",
    "EEEA",
  ];

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const tab = (i) => {
    setAll(i);
    setPage(1); // 탭을 변경할 때 페이지를 초기화
    setFunctionData([]); // 데이터를 초기화
    setHasMore(true); // 더 가져올 데이터가 있다고 설정
  };
  const handleGenreClick = (genreIndex) => {
    setClickedGenre(genreIndex);
    setMovePageData(() => genreMapping[genreIndex]); //여기변경 =============
    setAll(1); // 전체 탭으로 설정
    setPage(1); // 페이지 초기화
    setFunctionData([]); // 데이터 초기화
    setHasMore(true); // 더 가져올 데이터가 있다고 설정
  };

  const loadMoreData = async (pageNumber) => {
    setIsLoading(true); // 데이터 로드 시작
    const shcateValue = genreMapping[clickedGenre];

    let data = [];
    switch (all) {
      case 1:
        data = await fn.genre(shcateValue, pageNumber);
        break;
      case 2:
        data = await fn.thisWeek(shcateValue, pageNumber);
        break;
      case 3:
        data = await fn.ing(shcateValue, pageNumber);
        break;
      case 4:
        data = await fn.upcoming(shcateValue, pageNumber);
        break;
      default:
        setIsLoading(false); // 로딩 상태 종료
        break;
    }

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setFunctionData((prevData) => [...prevData, ...data]);
    }
    setIsLoading(false); // 로딩 상태 종료
  };

  useEffect(() => {
    //[↓] 여기변경 =============
    if (!movePageData.length) {
      setClickedGenre(() => movePageData[0]);
      setAll(() => movePageData[1]);
      loadMoreData(page);
    } else {
      loadMoreData(page); //원래 있던 코드
    }
    //[↑] 여기변경 =============
  }, [page, clickedGenre, all]); // all 상태도 의존성에 추가

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  // if(!data.length) return<></>;

  return (
    <div className={`categoryCommon ${categoryStyle.category}`}>
      <div className={categoryStyle.genresTapBarWrap}>
        <GenresTapBar
          clickedGenre={clickedGenre}
          setClickedGenre={handleGenreClick}
        />
      </div>

      <ul>
        <li
          className={all === 1 ? categoryStyle.selected : ""}
          onClick={() => tab(1)}
        >
          <button>전체</button>
          <div></div>
        </li>
        <li
          className={all === 2 ? categoryStyle.selected : ""}
          onClick={() => tab(2)}
        >
          <button>이번주</button>
          {/* <button onClick={handleThisWeek}>이번주</button> */}
          <div></div>
        </li>
        <li
          className={all === 3 ? categoryStyle.selected : ""}
          onClick={() => tab(3)}
        >
          <button>공연중</button>
          <div></div>
        </li>
        <li
          className={all === 4 ? categoryStyle.selected : ""}
          onClick={() => tab(4)}
        >
          <button>공연 예정</button>
          <div></div>
        </li>
      </ul>

      <section>
        {all === 1 && functionData.length !== 0 && (
          <div className={categoryStyle.grid}>
            {functionData.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        )}
        {all === 2 && functionData.length !== 0 && (
          <div className={categoryStyle.grid}>
            {functionData.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        )}
        {all === 3 && functionData.length !== 0 && (
          <div className={categoryStyle.grid}>
            {functionData.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        )}
        {all === 4 && functionData.length !== 0 && (
          <div className={categoryStyle.grid}>
            {functionData.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        )}

        <p className={categoryStyle.nogongyeon}>
          {isLoading
            ? "로딩중..."
            : functionData.length == 0
            ? "공연이 없습니다."
            : ""}
        </p>
      </section>
      <TopButton/>
    </div>
  );
}

export default Category;
