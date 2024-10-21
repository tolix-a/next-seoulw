// import React, { useState } from "react";
// import bookmarkStyle from "@/styles/bookmark.module.scss";

// function Bookmark({ numberOfBookmarks }) {
//   // 최대 50개까지 설정 가능
//   const maxBookmarks = Math.min(numberOfBookmarks, 50);

//   const [activeIndexes, setActiveIndexes] = useState([]);

//   const handleClick = (index) => {
//     setActiveIndexes((prev) => {
//       if (prev.includes(index)) {
//         return prev.filter((i) => i !== index);
//       } else {
//         return [...prev, index];
//       }
//     });
//   };

//   return (
//     <>
//       <div className={bookmarkStyle.all}>
//         <div className={bookmarkStyle.list}>
//           <h1>{maxBookmarks}/50</h1>
//           <button>전체 삭제</button>
//         </div>
//         <div className={bookmarkStyle.listflex}>
//           {Array.from({ length: maxBookmarks }).map((_, index) => (
//             <div className={bookmarkStyle.listinfo} key={index}>
//               <img
//                 src="./assets/images/poster_01.jpg"
//                 alt={`뮤지컬 포스터 ${index + 1}`}
//               />
//               <button
//                 onClick={() => handleClick(index)} // 인덱스를 전달
//                 className={`${bookmarkStyle.like} ${
//                   activeIndexes.includes(index) ? bookmarkStyle.active : ""
//                 }`}
//                 type="button"
//               ></button>
//               <p>뮤지컬 (지킬앤 하이드)</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// // 기본 값을 설정하거나 부모 컴포넌트에서 props로 전달
// bookmark.defaultProps = {
//   numberOfBookmarks: 10, // 기본값을 10으로 설정
// };

// export default Bookmark;

import React from "react";

const Bookmark = () => {
  return <div>Bookmark</div>;
};

export default Bookmark;
