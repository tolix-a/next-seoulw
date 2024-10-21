import React, { useEffect, useState } from "react";
import reviewStyle from "@/styles/review.module.scss";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import db from "../lib/firebase";
import { useSession } from "next-auth/react";

function Review({ info, id }) {
  const { data: sesseion } = useSession();

  // 별점 모양 커스텀
  const StyledRating = styled(Rating)({
    "& .MuiRating-icon": {
      fontSize: "2rem",
    },
    "& .MuiRating-iconFilled": {
      color: "#FFCC00",
    },
    "& .MuiRating-iconHover": {
      color: "#FFCC00",
    },
  });

  // ▼인풋 박스 상태
  const [isInputVisible, setInputVisible] = useState(true);

  // ▼후기 280자 제한
  const maxLength = 280;
  const [reviewText, setReviewText] = useState("");
  const [starValue, setStarValue] = useState(0);

  // ▼리뷰 더미데이터 관리
  const [reviews, setReviews] = useState();
  const [reviewsState, setReviewsState] = useState(false);
  const [moreButton, setMoreButton] = useState({}); // 각 리뷰의 "더 보기" 상태 관리

  const handleMoreToggle = (index) => {
    setMoreButton((prev) => ({ ...prev, [index]: !prev[index] })); // 클릭한 리뷰의 상태 토글
  };

  const handleChange = (event) => {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setReviewText(newText);
    } else {
      alert("최대 글자수는 280자 입니다.");
    }
  };

  useEffect(() => {
    // 파이어 베이스 가져오기
    console.log("재실행=================", id);
    if (id) {
      (async function () {
        try {
          const q = query(
            collection(db, "review")
            // where("mt20id", "==", userid)
          );
          const querySnapshot = await getDocs(q);

          let reviewData = [];

          querySnapshot.forEach((doc) => {
            reviewData.push(doc.data());
            // doc.data() is never undefined for query doc snapshots
            // 와!!! 로그로 잘 찍힘 그러면 이제 이거를 어따가 뿌려줄 것이냐? 어떻게 할 것이냐?
            // console.log(doc.id, " => ", doc.data());
          });

          reviewData.sort((a, b) => {
            return new Date(b.postdate) - new Date(a.postdate); // 최신 날짜가 먼저 오도록 정렬
          });

          setReviews(reviewData);
        } catch {}
      })();
    }

    // 가져온 값을 배열로 지정하여 다시 뿌리기
  }, [reviewsState]);

  // 파이어 베이스에 값을 보내기
  const handleSubmit = async () => {
    console.log(info, info.poster);
    try {
      // 내용을 서버에 보내기 > 어찌어찌 성공함.

      const docRef = await addDoc(collection(db, "review"), {
        mt20id: id,
        userid: sesseion.user.email,
        prfnm: info.prfnm,
        star: starValue * 2,
        review: reviewText,
        postdate: new Date().toLocaleDateString(),
        poster: info.poster,
      });
      setReviewsState(!reviewsState);

      // 리뷰 제출 후 입력 박스를 다시 보이게 설정
      setInputVisible(true);
      // 텍스트와 별점 초기화
      setReviewText("");
      setStarValue(0);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleInputClick = () => {
    setInputVisible(false); // 인풋 박스를 클릭하면 숨김
  };

  const loadMoreReviews = () => {
    const additionalReviews = [
      {
        index: reviews.length, // 기존 리뷰 길이에 따라 인덱스 설정
        userid: "exid002@gmail.com",
        star: 8,
        review: "정말 기대 이상이었어요!",
        postdate: "2024.10.08",
      },
      {
        index: reviews.length + 1, // 다음 인덱스
        userid: "exid003@gmail.com",
        star: 4,
        review: "다시 보고 싶어요!",
        postdate: "2024.10.08",
      },
    ];
    setReviews((prevReviews) => [...prevReviews, ...additionalReviews]);
  };

  // if (!reviews) return <></>;

  return (
    <>
      <div className={reviewStyle.review}>
        <div className={reviewStyle.reviewinfo}>
          {isInputVisible ? (
            <div className={reviewStyle.input}>
              <p>댓글 {reviews && reviews.length}개</p>
              <div className={reviewStyle.inputtext}>
                <input
                  type="text"
                  placeholder="후기를 입력해 주세요."
                  onClick={handleInputClick}
                />
                <button onClick={handleSubmit}>입력</button>
              </div>
            </div>
          ) : (
            // 인풋 박스 클릭 시 활성화 되는 창 -> 리뷰 별점 작성
            <div className={reviewStyle.rating}>
              <div className={reviewStyle.star}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "& > legend": { mt: 2 },
                  }}
                >
                  <Typography
                    component="legend"
                    sx={{ fontSize: "0.8rem", margin: 0 }}
                  >
                    별점을 선택해 주세요.
                  </Typography>
                  <StyledRating
                    value={starValue} // 별점 표시를 위한 starValue 사용
                    onChange={(event, newValue) => setStarValue(newValue)}
                  />
                </Box>
                <hr />
                <textarea
                  value={reviewText}
                  onChange={handleChange}
                  rows={5}
                  style={{ resize: "none", overflow: "hidden" }}
                />
              </div>
              <div className={reviewStyle.text}>
                <p>
                  {reviewText.length}/{maxLength}
                </p>
                <div className={reviewStyle.textinfo}>
                  <button onClick={() => setReviewText("")}>취소</button>
                  <button onClick={handleSubmit}>완료</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 리뷰 리스트 */}
        <div className={reviewStyle.list}>
          {/* 아래는 유저가 직접 작성한 리뷰 데이터 출력 */}
          {/* {reviews &&          
          reviews.map((item, idx) => (
            <StyledRating
              key={`${item.star}_${idx}`}
              value={item.star}
              readOnly
            />
          ))} */}

          {/* 근데 밑에 있는 이거는 기존에 있는 리뷰가 있을 경우에 이렇게 map을 돌리는 거고..? */}
          {reviews
            ? reviews.map((review, index) => (
                <div key={`${review.userid}-${index}`}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <StyledRating value={review.star/2} readOnly />
                    <Typography
                      component="span"
                      sx={{ marginLeft: 1 }}
                      className={reviewStyle.starValue}
                    >
                      {review.star} {/* 별점 표시 */}
                    </Typography>

                    {/* 수정 삭제 기능은 나중에 넣는 것으로 협의됨 */}
                    {/* <div className={reviewStyle.edit}>
                      <button>수정</button>
                      <button>삭제</button>
                    </div> */}
                  </Box>
                  {/* 제목 */}
                  <p
                    style={{
                      backgroundColor: moreButton[index]
                        ? "#cbcbcb"
                        : "transparent",
                    }}
                  >
                    {/* {moreButton[index] || review.review.length <= 20
                      ? review.review
                      : `${review.review.substring(0, 20)}...`} */}

                    {review.review}
                  </p>
                  {/* 더 보기 버튼 */}l
                  <div className={reviewStyle.moretext}>
                    <p>
                      {review.userid.slice(0, 2) + "***"} {/* 아이디 표시 */}
                    </p>
                    {/* <button onClick={() => handleMoreToggle(index)}>
                      <img src="/assets/icons/arrow_more.svg" alt="더 보기" />
                    </button> */}
                  </div>
                  <hr />
                </div>
              ))
            : "리뷰 내용이 존재하지 않습니다."}
        </div>
        <button className={reviewStyle.buttonmore} onClick={loadMoreReviews}>
          리뷰 20개 더보기
        </button>
      </div>
    </>
  );
}

export default Review;
