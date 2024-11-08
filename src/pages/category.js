// 2. 카테고리
import React, { useEffect, useRef, useState } from "react";
import categoryStyle from "@/styles/category.module.scss";
import Card from "@/components/Card";
import GenresTapBar from "@/components/GenresTapBar";
import { fn } from "@/utils/apiFunc";
import movePageStore from "../store/movePage_store";

function Category() {
  const [all, setAll] = useState(1);
  const [clickedGenre, setClickedGenre] = useState();
  const [functionData, setFunctionData] = useState([]);

  // [↓] 여기변경 =============
  const { categoryStoreData, setCategoryStoreData } = movePageStore(); //movePageData=[장르인덱스, all인덱스]
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

  const loadMoreRef = useRef(null);

  const tab = (i) => {
    setAll(i);
    setPage(1); // 탭을 변경할 때 페이지를 초기화
    setFunctionData([]);
    // setHasMore(true);

    loadMoreData(1);
  };

  const handleGenreClick = (genreIndex) => {
    setClickedGenre(genreIndex);
    setCategoryStoreData(genreIndex, 1); //여기변경 =============
    setAll(1); // 전체 탭으로 설정
    setPage(1); // 페이지 초기화
    setFunctionData([]); // 데이터 초기화
    // setHasMore(true); // 더 가져올 데이터가 있다고 설정

    loadMoreData(1);
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
    setIsLoading(false);
  };

  useEffect(() => {
    if(clickedGenre==0 || clickedGenre){
      setCategoryStoreData(clickedGenre, all); //store저장
      loadMoreData(page); //원래 있던 코드
    }
  }, [page, clickedGenre, all]); // all 상태도 의존성에 추가

  // 메인에서 카테고리 진입 시 장르, all 변경
  useEffect(() => {
    setClickedGenre(categoryStoreData[0]);
    setAll(categoryStoreData[1]);
  
    return () => {
      setCategoryStoreData(0, 1); // 기본값으로 초기화
    };
  }, []);


  useEffect(() => {
    console.log(hasMore);
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, isLoading]);

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
        <div ref={loadMoreRef} style={{ height: "30px" }} />
      </section>
    </div>
  );
}

export default Category;
