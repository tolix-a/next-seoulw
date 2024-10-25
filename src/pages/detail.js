// 2-1. 디테일
import React, { useEffect, useState } from "react";
import detailStyle from "@/styles/detail.module.scss";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Review from "@/components/Review";
import Map from "@/components/Map";
import { useSearchParams } from "next/navigation";
import { fn } from "@/utils/apiFunc";
import movePageStore from "../store/movePage_store";

import useSearchStore from "@/store/search_store";
import { useRouter } from "next/router";
import Bookmark from "@/pages/bookmark";
import Heart from "@/components/Heart";

function Detail() {
  // 탭 메뉴
  const [all, setAll] = useState(1);
  const [info, setInfo] = useState();
  const params = useSearchParams();
  const id = params.get("mt20id");

  const { setDetailStoreData } = movePageStore(); //movePageData=[장르인덱스, all인덱스]

  // _text 분리 코드
  useEffect(() => {
    fn.detail(id).then((res) => {
      let d = { ...res };

      for (let key in d.detail) {
        if (d.detail[key]._text) d.detail[key] = d.detail[key]._text;
      }
      for (let key in d.detailMap) {
        if (d.detailMap[key]._text) d.detailMap[key] = d.detailMap[key]._text;
      }

      setInfo(d);

      //예약링크 추출
      let reservationUrl = d.detail.relates.relate.relateurl
        ? d.detail.relates.relate.relateurl._text
        : Array.isArray(d.detail.relates.relate) //url 여러개일때
        ? d.detail.relates.relate[0].relateurl._text //첫번째 값만 사용
        : "#";

      //store에 공연 정보 저장
      setDetailStoreData(d.detail.prfnm, d.detail.prfstate, reservationUrl);
    });
  }, []);

  //--------------------------------------
  const router = useRouter();
  const { mt20id } = router.query;
  const setRecentPerformance = useSearchStore(
    (state) => state.setRecentPerformance
  );

  useEffect(() => {
    if (mt20id && info) {
      const performanceDetails = {
        mt20id,
        genrem: info.detail.genrenm,
        poster: info.detail.poster,
        prfnm: info.detail.prfnm,
      };

      setRecentPerformance(performanceDetails);
    }
  }, [mt20id, info, setRecentPerformance]);
  //------------------------------------------

  const tap = (i) => {
    setAll(i);
  };

  if (!info) return <></>;

  return (
    <>
      <div className={detailStyle.container}>
        <div className={detailStyle.header}>
          {/* 여기에 상단 타이틀 이미지 넣기 */}
          <img className={detailStyle.headerposter} src={info.detail.poster} />
          <h1>{info.detail.prfnm}</h1>
          <ul>
            <li>
              {Object.keys(info.detail.prfage).length > 0 && info.detail.prfage}
              {/* {info.detail.prfage} */}
            </li>
            <li>
              <img src="/assets/icons/map.svg" />
              {info.detail.fcltynm}
            </li>
            <li className={detailStyle.time}>
              <img src="/assets/icons/calender.svg" />
              {info.detail.prfpdfrom} ~ {info.detail.prfpdto}
              {/* 끝나는 날짜 코드로 가져오기 */}
            </li>
            <li className={detailStyle.dtguidance}>
              {/* 해당 값은 통으로 들어오고 코드로 가져오기 */}
              <img src="/assets/icons/watch.svg" />
              {/* {info.detail.dtguidance} */}
              <div className={detailStyle.dtguidanceText}>
                {Object.keys(info.detail.dtguidance).length > 0 &&
                  info.detail.dtguidance}
              </div>
            </li>
            <div className={detailStyle.heart}>
              <li>
                <img src="/assets/icons/runnigtime.svg" />
                {/* {info.detail.prfruntime} */}
                {Object.keys(info.detail.prfruntime).length > 0 &&
                  info.detail.prfruntime}
              </li>
              {/* 하트(북마크)컴포넌트에 디테일들에 대한 정보를 보내줌 */}
              <Heart
                performanceDetails={{
                  mt20id: info.detail.mt20id,
                  genrem: info.detail.genrenm,
                  poster: info.detail.poster,
                  prfnm: info.detail.prfnm,
                }}
                isBookmarked={()=>{}}
              />
            </div>
          </ul>
        </div>

        {/* 탭 메뉴 */}
        <ul className={detailStyle.tap}>
          <li>
            <button
              className={all === 1 ? detailStyle.selected : ""}
              onClick={() => tap(1)}
            >
              공연 정보
            </button>
            <button
              className={all === 2 ? detailStyle.selected : ""}
              onClick={() => tap(2)}
            >
              후기
            </button>
            <button
              className={all === 3 ? detailStyle.selected : ""}
              onClick={() => tap(3)}
            >
              장소
            </button>
          </li>
        </ul>

        <div className={detailStyle.information}>
          {all === 1 && (
            <div className={detailStyle.info}>
              <div className={detailStyle.infoetc}>
                {/* 공연 정보 */}
                <ul>
                  <li className={detailStyle.infotitle}>공연정보</li>
                  {/* <li>{info.detail.genrenm}</li> */}
                  <li>
                    {Object.keys(info.detail.genrenm).length > 0 &&
                      info.detail.genrenm}
                  </li>
                </ul>
                {/* 캐스팅 리스트 */}
                <ul className={detailStyle.cast}>
                  <li className={detailStyle.infotitle}>캐스팅</li>
                  <li>
                    {Object.keys(info.detail.prfcast).length > 0 &&
                      info.detail.prfcast}
                  </li>
                </ul>
                {/* 가격 */}
                <ul className={detailStyle.place}>
                  <li className={detailStyle.infotitle}>가격</li>
                  {/* <li>{info.detail.pcseguidance}</li> */}
                  <li>
                    {Object.keys(info.detail.pcseguidance).length > 0 &&
                      info.detail.pcseguidance}
                  </li>
                </ul>
                <img
                  src={
                    info.detail.styurls.styurl?._text ||
                    info.detail.styurl ||
                    info.detail.poster
                    // info.detail.styurls.styurl ? info.detail.styurls.styurl : (info.detail.styurl ? info.detail.styurl : info.detail.poster)
                  }
                />

                {/* 장소까지 info에 포함되어야 함.  */}
                <hr />
                <div className={detailStyle.map}>
                  <h2>장소</h2>
                  <div className={detailStyle.mapinfo}>
                    <p>{info.detailMap.fcltynm}</p>
                    <p>{info.detailMap.adres}</p>
                    <div className={detailStyle.mapnum}>
                      <p>
                        {Object.keys(info.detailMap.telno).length > 0 &&
                          info.detailMap.telno}
                      </p>
                      {/* <p>{info.detailMap.telno}</p> */}
                      {info.detailMap.relateurl && (
                        <Link
                          href={info.detailMap.relateurl}
                          style={{ marginTop: "5px" }}
                        >
                          홈페이지
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <div className="여기가 리뷰"> */}
        {all === 2 && <Review info={info.detail} id={id} />}

        {all === 3 && (
          <div className={detailStyle.reivew}>
            <Map info={info.detailMap} />
          </div>
        )}

        {/* <div className={detailStyle.footer}>
          <button className={detailStyle.reserveButton}>예약하기</button>
        </div> */}
      </div>
    </>
  );
}

export default Detail;
