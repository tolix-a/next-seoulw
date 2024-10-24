import React, { useEffect, useState } from "react";
import bookmarkStyle from "@/styles/bookmark.module.scss";
import { collection, addDoc } from "firebase/firestore";
import db from "../lib/firebase";
import { useSession } from "next-auth/react";

function Bookmark({ numberOfBookmarks }) {
  const maxBookmarks = Math.min(numberOfBookmarks, 50);
  const [activeIndexes, setActiveIndexes] = useState([]);

  // 파이어 베이스 가져오기

  useEffect(()=>{

    

  })

  const bookmarkImport = async ( ) => {

    const querySnapshot = await getDocs(collection(db, "bookmark"));
     querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   console.log(doc.id, " => ", doc.data());
  });

  }



  const handleClick = async (index) => {
    setActiveIndexes((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });



    // // Firestore에 데이터 추가
    // const dataToAdd = await addDoc {collection(db,"bookmark")
    // {
    //   mt20id: id, 
    //   postdate: sesseion.user.email, 
    //   poster: info.poster, 
    //   prfnm: , 
    //   userId: , 
    //   userName: , 
    // }
    // };

    try {
      const docRef = await addDoc(collection(db, "bookmarks"), dataToAdd);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <div className={bookmarkStyle.all}>
        <div className={bookmarkStyle.list}>
          <h1>{maxBookmarks}/50</h1>
          <button>전체 삭제</button>
        </div>
        <div className={bookmarkStyle.listflex}>
          {Array.from({ length: maxBookmarks }).map((_, index) => (
            <div className={bookmarkStyle.listinfo} key={index}>
              <img
                src="./assets/images/poster_01.jpg"
                alt={`뮤지컬 포스터 ${index + 1}`}
              />
              <button
                onClick={() => handleClick(index)} // 인덱스를 전달
                className={`${bookmarkStyle.like} ${
                  activeIndexes.includes(index) ? bookmarkStyle.active : ""
                }`}
                type="button"
              ></button>
              <p>뮤지컬 (지킬앤 하이드)</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// 기본 값을 설정
Bookmark.defaultProps = {
  numberOfBookmarks: 10, // 기본값을 10으로 설정
};

export default Bookmark;