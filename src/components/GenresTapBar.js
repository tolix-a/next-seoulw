import React, { useState } from 'react'
import genresTapBarStyle from '@/styles/genresTapBar.module.scss'

// [↓] swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/free-mode';
import { FreeMode } from 'swiper/modules';


const GenresTapBar = ({clickedGenre, setClickedGenre}) => {
  const genres = ['뮤지컬', '연극','대중음악', '무용', '클래식', '국악', '서커스/마술', '기타'];

  const onActive = (idx) => {
    setClickedGenre(() => idx);
  }


  return (
    <div className={genresTapBarStyle.genresTapBar}>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode]}
        className="genresSwiper"
      >
        {
          genres.map((genre, idx) => (
            <SwiperSlide key={`${genre}${idx}`} className={genresTapBarStyle.genresBtnsSlide}>
              <span onClick={() => onActive(idx)} className={`${genresTapBarStyle.genresBtn} ${clickedGenre === idx ? genresTapBarStyle.active : ''}`}>
                {genre}
              </span>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default GenresTapBar