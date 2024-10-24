"use client";
import React, { useEffect, useState } from "react";
import menuTapBarStyle from "@/styles/menuTapBar.module.scss";
import { useRouter } from "next/router";
import movePageStore from "../store/movePage_store";
import Link from "next/link";
import { useSession } from "next-auth/react";

const MenuTapBar = () => {
  const { detailStoreData } = movePageStore(); //detailStoreData={title:, prfstate:, link:} 형식
  const [isActive, setIsActive] = useState(0); // 버튼 분홍색으로 불켜지게 해주는 용
  const [isDetail, setIsDetail] = useState(false); //디테일 페이지인지 확인용
  const [buttonText, setButtonText] = useState("예약하기"); //디테일 페이지용 예약 버튼
  const [hide, setHide] = useState(false); //탭바 숨기기용(로그인, 회원가입 페이지)
  const router = useRouter();
  const { data: session } = useSession(); //로그인 유무 체크용

  const movePage = (page) => {
    router.push(page);
  };

  const checkPerformingStatus = (link, status) => {
    if (link !== "#") {
      switch (status) {
        case "공연중":
          setButtonText("예약하기");
          break;
        case "공연완료":
          setButtonText("공연완료");
          break;
        case "공연예정":
          setButtonText("공연예정");
          break;
        default:
          setButtonText("준비중"); // 기본값
      }
    } else {
      setButtonText("준비중");
    }
  };

  useEffect(() => {
    setIsDetail(() => false);
    setHide(() => false);

    switch (router.pathname) {
      case "/":
        setIsActive(() => 0);
        break;
      case "/category":
        setIsActive(() => 1);
        break;
      case "/search":
      case "/search2":
        setIsActive(() => 2);
        break;
      case "/mypage":
        setIsActive(() => 3);
        break;
      case "/detail":
        setIsDetail(() => true);
        const status = detailStoreData.prfstate;
        const link = detailStoreData.link;
        checkPerformingStatus(link, status);
        break;
      case "/login":
      case "/join":
        setHide(() => true);
        if (session) {
          movePage("/mypage");
        }
      default:
        setIsActive(() => 0);
        break;
    }
  }, [router.pathname, detailStoreData, session]);

  return (
    <nav
      className={`${menuTapBarStyle.menuTapBar} ${
        hide ? menuTapBarStyle.hide : ""
      }`}
    >
      {isDetail ? (
        <div className={menuTapBarStyle.reserveButtonWrap}>
          <Link
            href={detailStoreData.link ? detailStoreData.link : "#"}
            target="_blank"
          >
            <button
              className={`${menuTapBarStyle.reserveButton} ${
                buttonText === "예약하기"
                  ? ""
                  : buttonText === "공연예정"
                  ? menuTapBarStyle.upcoming
                  : menuTapBarStyle.completed
              }`}
            >
              {buttonText}
            </button>
          </Link>
        </div>
      ) : (
        <ul className={menuTapBarStyle.tapBarWrap}>
          <li onClick={() => movePage("/")}>
            <button type="button">
              <div
                className={`${isActive === 0 ? menuTapBarStyle.active : ""}`}
              >
                <p className={menuTapBarStyle.home}>홈</p>
              </div>
            </button>
          </li>

          <li onClick={() => movePage("/category")}>
            <button type="button">
              <div
                className={`${isActive === 1 ? menuTapBarStyle.active : ""}`}
              >
                <p className={menuTapBarStyle.category}>카테고리</p>
              </div>
            </button>
          </li>

          <li onClick={() => movePage("/search")}>
            <button type="button">
              <div
                className={`${isActive === 2 ? menuTapBarStyle.active : ""}`}
              >
                <p className={menuTapBarStyle.search}>검색</p>
              </div>
            </button>
          </li>

          <li onClick={() => movePage(session ? '/mypage' : '/login')  }>
          {/* <li onClick={() => movePage("/login")}> */}
            <button type="button">
              <div
                className={`${isActive === 3 ? menuTapBarStyle.active : ""}`}
              >
                <p className={menuTapBarStyle.my}>MY</p>
              </div>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default MenuTapBar;
