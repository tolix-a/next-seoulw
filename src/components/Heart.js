import React, { useState, useEffect } from "react";
import heartStyle from "@/styles/heart.module.scss";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import db from "../lib/firebase";

function Heart({ performanceDetails,  isBookmarked}) {
  const [isActive, setIsActive] = useState(false); // 하트 상태 관리
  const { data: session } = useSession();
  // 순서
  // 1. onsole.log(performanceDetails); // 디테일에서 전달받은 공연정보
  // console.log(session); 이 둘의 정보값을 다시 파이어 베이스 > 북마크 카테고리에 저장한다,
  // ㄴ 파이어 베이스에 넣는 작업 필요
  // >>에드
  // 에드 값 완료

  // 2. 상태값에 대한 관리 필요 (유저가 이미 하트를 클릭했을 경우에는 동일한 페이지로 진입했을 때 유지시켜줘야함.)
  // >>겟 if문을 사용해서 [isActive, setIsActive] = useState(false); // 요것을 활용해서 관리하도록 함.

  // 하트는 저장을 시키고 (파이어 베이스)
  // 여기까지 완료 했음 그러면..?

  // 북마크 상태 유지 및 관리 코드
  useEffect(() => {
    const checkBookmark = async () => {
      // 세션이 존재하고, 사용자 ID가 유효한지 확인
      if (session && session.user && session.user.email) {
        const q = query(
          collection(db, "bookmark"),
          where("mt20id", "==", performanceDetails.mt20id),
          where("userId", "==", session.user.email) // user.email이 undefined가 아닌지 확인
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setIsActive(true); // 북마크가 존재하면 하트를 활성화
        }
      }
    };
    checkBookmark();
  }, [performanceDetails.mt20id, session]);

  //  아래는 하트가 동작했을 때 노출되는 데이터 값들
  // (디테일의 공연 정보, 유저세션의 유저 아이디, 이메일)
  const handleClick = async () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    isBookmarked(false)

    console.log(performanceDetails); // 디테일에서 전달받은 공연정보
    console.log(session);
    try {
      if (newActiveState) {
        // Firestore에 bookmark 컬렉션에 데이터 추가
        const docRef = await addDoc(collection(db, "bookmark"), {
          mt20id: performanceDetails.mt20id,
          genrem: performanceDetails.genrem,
          poster: performanceDetails.poster,
          prfnm: performanceDetails.prfnm,
          userId: session.user.email, // 세션에 들어있는 이메일을 userId로 사용
          timestamp: session.expires, // expires 값을 timestamp로 사용
        });
        console.log("Document written with ID: ", docRef.id);
        //파이어 베이스 중간 id 값 로그로 확인
      } else {
        // 북마크 제거
        const q = query(
          collection(db, "bookmark"),
          where("mt20id", "==", performanceDetails.mt20id),
          where("userId", "==", session.user.email)
        );

        const querySnapshot = await getDocs(q);
        await deleteDoc(doc(db, "bookmark", querySnapshot.docs[0].id)); // 각 문서 삭제가 완료될 때까지 기다림
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };



  return (
    <button
      onClick={handleClick}
      className={`${heartStyle.like} ${isActive ? heartStyle.active : ""}`}
      type="button"
    ></button>
  );
}

export default Heart;
