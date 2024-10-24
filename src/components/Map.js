import { useEffect } from "react";
import MapStyle from "@/styles/map.module.scss";
import Link from "next/link";

const Map = ({ info }) => {
  // console.log(info, "=============map");
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1d8f7e7e4b1f07adeff4054fb9568a0f&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          // 여기가 지도 좌표값
          center: new window.kakao.maps.LatLng(info.la, info.lo),
          level: 3,
        };

        // 1. 지도 띄우기
        const map = new kakao.maps.Map(container, options);

        // 2. 중앙에 핀 꽂기
        let marker = new kakao.maps.Marker({
          map: map,
          position: map.getCenter(),
        });
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, []);

  return (
    <>
      <div className={MapStyle.map}>
        <h2>장소</h2>
        <div className={MapStyle.mapinfo}>
          {/* <p>{info.fcltynm}</p>
          <p>{info.adres}</p> */}
          <p>{Object.keys(info.fcltynm).length > 0 && info.fcltynm}</p>
          <p>{Object.keys(info.adres).length > 0 && info.adres}</p>
          <div className={MapStyle.mapnum}>
            <p>{Object.keys(info.telno).length > 0 && info.telno}</p>
            {info.detailMap && info.detailMap.relateurl ? (
              <Link
                href={info.detailMap.relateurl}
                style={{ marginTop: "5px" }}
              >
                홈페이지
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <div id="map" style={{ width: "100%", height: "350px", paddingBottom:"50px" }}></div>
    </>
  );
};

export default Map;
