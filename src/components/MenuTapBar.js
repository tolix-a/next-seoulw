"use client"
import React, { useEffect, useRef, useState } from 'react'
import menuTapBarStyle from '@/styles/menuTapBar.module.scss'
import { useRouter } from 'next/router'
import movePageStore from "../store/movePage_store";

const MenuTapBar = () => {
  const { movePageData, moveDetailData } = movePageStore(); //movePageData=[장르인덱스, all인덱스]
  const [isActive, setIsActive] = useState(0);
  const [isDetail, setIsDetail] = useState(false);
  const [buttonText, setButtonText] = useState('예약하기');
  const [hide, setHide] = useState(false);
  const router = useRouter();

  const movePage = (page) => {
    router.push(page)
  }

  const checkStatus = (status) => {
    switch (status) {
      case '공연중':
        setButtonText('예약하기');
        break;
      case '공연완료':
        setButtonText('공연완료');
        break;
      case '공연예정':
        setButtonText('공연예정');
        break;
      default:
        setButtonText('예약하기'); // 기본값
    }
  }

  // if(router.pathname === '/login' || router.pathname === '/join'){
  //   return null;
  // }

  useEffect(() => {
    setIsDetail(() => false);
    setHide(() => false);

    switch(router.pathname){
      case '/':
        setIsActive(() => 0);
        break;
      case '/category':
        setIsActive(() => 1);
        break;
      case '/search':
      case '/search2':
        setIsActive(() => 2);
        break;
      case '/mypage':
        setIsActive(() => 3);
        break;
      case '/detail':
        setIsDetail(() => true)   
        const status = '공연중' //하드코딩
        checkStatus(status);
        break;
      case '/login':
      case '/join':
        setHide(() => true)
      default:
        setIsActive(() => 0);
        break;
    }
  }, [router.pathname])

  return (     
      <nav className={`${menuTapBarStyle.menuTapBar} ${hide ? menuTapBarStyle.hide : ''}`}>
        {
          isDetail ? (
            <div className={menuTapBarStyle.reserveButtonWrap}>
              <button className={`${menuTapBarStyle.reserveButton} ${buttonText === '예약하기' ? '' : (buttonText === '공연예정' ? menuTapBarStyle.upcoming : menuTapBarStyle.completed)}`}>{buttonText}</button>
            </div>
          )
          : 
          (
            <ul className={menuTapBarStyle.tapBarWrap}>
              <li onClick={() => movePage('/')}>
                <button type='button'>
                  <div className={ `${isActive === 0 ? menuTapBarStyle.active : ''}` }>
                    <p className={menuTapBarStyle.home}>홈</p>
                  </div>
                </button>
              </li>
      
              <li onClick={() => movePage('/category')}>
                <button type='button'>
                  <div className={ `${isActive === 1 ? menuTapBarStyle.active : ''}` }>
                    <p className={menuTapBarStyle.category}>카테고리</p>
                  </div>
                </button>
              </li>
      
              <li onClick={() => movePage('/search')}>
                <button type='button'>
                  <div className={ `${isActive === 2 ? menuTapBarStyle.active : ''}` }>
                    <p className={menuTapBarStyle.search}>검색</p>
                  </div>
                </button>
              </li>
      
              <li onClick={() => movePage('/mypage')}>
                <button type='button'>
                  <div className={ `${isActive === 3 ? menuTapBarStyle.active : ''}` }>
                    <p className={menuTapBarStyle.my}>MY</p>
                  </div>
                </button>
              </li>
            </ul>            
          )
          
        }
      </nav>
  )
}

export default MenuTapBar