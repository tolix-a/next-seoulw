// 3. 검색
import React, { useEffect, useState } from 'react'
import searchStyle from '@/styles/search.module.scss'
import useSearchStore from '../store/search_store';
import { useRouter } from 'next/router';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';

function Search() {
  const {results, readCookie, setResults} = useSearchStore();
  const remove = useSearchStore((state) => state.deleteC);
  const router = useRouter();
  
  const { readCookie2, recentPerformances } = useSearchStore();
  const remove2 = useSearchStore((state) => state.deleteX);

  console.log(results);
  console.log(recentPerformances);
  
  useEffect(()=>{
    readCookie();
  },[])
  
  useEffect(()=>{
    readCookie2();
  },[readCookie2])

  console.log('Recent Performances:', recentPerformances);
  
  const { setSearchWord } = useSearchStore();
  const pClick = (value) => {
    setSearchWord(value);

  
  const newResults = results.map(result => result.value);
  newResults.push(value); // 클릭한 검색어 추가

  setResults(newResults); // 새로운 결과 설정

    router.push(`/search2?query=${value}`);
  };

  const moveToDetailPage = (mt20id) => {
    router.push(`/detail?mt20id=${mt20id}`);
  };

  return (
    <div className={`search ${searchStyle.search}`}>
      <h2>최근 검색어</h2>   
      <ul>
      { results!== null && results.length > 0 ? (
        <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper"
        >
          {results.slice().reverse().map((result,k) => (
            <SwiperSlide key={k}>
            <li>
              <p onClick={() => pClick(result.value)}>{result.value}</p>
              <button onClick={() => remove(result.value)}><img src='./assets/icons/x_button.svg'/></button>
            </li>
            </SwiperSlide>
            )
          )}
        </Swiper>
        ) : (
        <div>
          <p>최근 검색어가 없습니다.</p>
        </div>
        )}
      </ul>

      <h2>최근 본 공연</h2>
      <section>
      { recentPerformances!== null && recentPerformances.length > 0 ? (
        <Swiper
        slidesPerView={'auto'}
        spaceBetween={24}
        className={`performSlide`}
        >
          {recentPerformances.slice().reverse().map((performance,i) => (
            <SwiperSlide key={i}>
              <figure>
                <div onClick={() => moveToDetailPage(performance.mt20id)}>
                  <img src={performance.poster}/>
                  <p>{performance.genrem}</p>
                  <figcaption>({performance.prfnm})</figcaption>
                </div>
                <button onClick={() => {remove2(performance.mt20id)}}>
                    <img src='./assets/icons/x_button.svg'/></button>
              </figure>
            </SwiperSlide>
            )
          )}
        </Swiper>
      ) : (
      <div>
        <p>최근 본 공연이 없습니다.</p>
      </div>
      )}
      </section>
    </div>
  )
}

export default Search