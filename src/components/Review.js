import React, { useEffect, useState } from "react";
import reviewStyle from "@/styles/review.module.scss";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import db from "../lib/firebase";
import { useSession } from "next-auth/react";

function Review({ info, id }) {
  const { data: session } = useSession();

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
  const maxLength = 280;
  const [reviewText, setReviewText] = useState("");
  const [starValue, setStarValue] = useState(0);

  // ▼리뷰 데이터 관리
  const [allReviews, setAllReviews] = useState([]); // 모든 리뷰
  const [displayedReviews, setDisplayedReviews] = useState([]); // 화면에 표시할 리뷰
  const [reviewsState, setReviewsState] = useState(false);
  const [moreButtonVisible, setMoreButtonVisible] = useState(false); // 더 보기 버튼 상태

  // 리뷰 수에 따라 버튼 상태 설정
  // 해당 리뷰가 20개 이상인 경우에는 리뷰 20개 더보기 버튼이 활성화 된다.
  useEffect(() => {
    if (allReviews.length > 20) {
      setMoreButtonVisible(true);
    } else {
      setMoreButtonVisible(false);
    }
  }, [allReviews]);

  // 리뷰 가져오기
  useEffect(() => {
    console.log("재실행=================", id);
    if (id) {
      (async function () {
        try {
          const q = query(collection(db, "review"), where("mt20id", "==", id));
          const querySnapshot = await getDocs(q);

          let reviewData = [];

          querySnapshot.forEach((doc) => {
            reviewData.push(doc.data());
          });

          // 최신 날짜가 먼저 오도록 정렬
          reviewData.sort(
            (a, b) => new Date(b.postdate) - new Date(a.postdate)
          );

          setAllReviews(reviewData);
          // 리뷰 개수에 따라 처음 표시할 리뷰 설정
          if (reviewData.length > 20) {
            setDisplayedReviews(reviewData.slice(0, 10)); // 10개 이상일 때
          } else {
            setDisplayedReviews(reviewData); // 20개 미만일 때
          }
        } catch (error) {
          console.error("Error fetching reviews: ", error);
        }
      })();
    }
  }, [id, reviewsState]);

  // 파이어 베이스에 값을 보내기
  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "review"), {
        mt20id: id,
        userid: session.user.email,
        prfnm: info.prfnm,
        star: starValue * 2,
        review: reviewText,
        postdate: new Date().toISOString(),
        poster: info.poster,
      });
      setReviewsState(!reviewsState);
      setInputVisible(true);
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
    const currentLength = displayedReviews.length;
    const additionalReviews = allReviews.slice(
      currentLength,
      currentLength + 20
    );
    setDisplayedReviews((prevReviews) => [
      ...prevReviews,
      ...additionalReviews,
    ]);
  };

  return (
    <>
      <div className={reviewStyle.review}>
        <div className={reviewStyle.reviewinfo}>
          {isInputVisible ? (
            <div className={reviewStyle.input}>
              <p>댓글 {allReviews.length}개</p>
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
                    value={starValue}
                    onChange={(event, newValue) => setStarValue(newValue)}
                  />
                </Box>
                <hr />
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
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
          {displayedReviews.length > 0
            ? displayedReviews.map((review, index) => (
                <div key={`${review.userid}-${index}`}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <StyledRating value={review.star / 2} readOnly />
                    <Typography
                      component="span"
                      sx={{ marginLeft: 1 }}
                      className={reviewStyle.starValue}
                    >
                      {review.star}
                    </Typography>
                  </Box>
                  <p>{review.review}</p>
                  <div className={reviewStyle.moretext}>
                    <p>{review.userid.slice(0, 2) + "***"}</p>
                  </div>
                  <hr />
                </div>
              ))
            : "리뷰 내용이 존재하지 않습니다."}
        </div>

        {moreButtonVisible && (
          <button className={reviewStyle.buttonmore} onClick={loadMoreReviews}>
            리뷰 20개 더보기
          </button>
        )}
      </div>
    </>
  );
}

export default Review;
