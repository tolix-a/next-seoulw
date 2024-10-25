import React, { useEffect, useState } from "react";
import bookmarkStyle from "@/styles/bookmark.module.scss";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../lib/firebase";
import Heart from '../components/Heart';

function Bookmark({ numberOfBookmarks }) {
  const maxBookmarks = Math.min(numberOfBookmarks, 20);
  const [bookmarks, setBookmarks] = useState([]);
  const [isbookmarks, setIsBookmarks] = useState(true);

  // 북마크 데이터를 가져오는 함수
  const fetchBookmarks = async () => {
    const querySnapshot = await getDocs(collection(db, "bookmark"));
    const bookmarksData = [];
    querySnapshot.forEach((doc) => {
      bookmarksData.push({ id: doc.id, ...doc.data() });
    });
    setBookmarks(bookmarksData);

  };

  useEffect(() => {
    fetchBookmarks();
  }, [isbookmarks]);

  

  return (
    <>
      <div className={bookmarkStyle.all}>
        <div className={bookmarkStyle.list}>
          <h1>{bookmarks.length}/{maxBookmarks}</h1>
        </div>
        <div className={bookmarkStyle.listflex}>
          {bookmarks.slice(0, maxBookmarks).map((bookmark) => (
            <div className={bookmarkStyle.listinfo} key={bookmark.id}>
              <img src={bookmark.poster} alt={bookmark.prfnm} />
              <span>
                <Heart
                  performanceDetails={bookmark}
                  isBookmarked={setIsBookmarks}              
                />
              </span>
              <p>{bookmark.prfnm}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// 기본 값을 설정
Bookmark.defaultProps = {
  numberOfBookmarks: 10,
};

export default Bookmark;
