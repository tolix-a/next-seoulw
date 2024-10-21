import React, { useState } from "react";
import cardStyle from "@/styles/card.module.scss";
import { useRouter } from "next/router";

function Card({ item }) {
  const router = useRouter();

  let isPerform = item.prfstate._text;
  const [isActive, setIsActive] = useState(false);
  const likeToggle = () => {
    setIsActive((prev) => !prev);
  };

  const moveToDetailPage = (mt20id) => {
    router.push(`/detail?mt20id=${mt20id}`);
  };

  return (
    <div
      className={cardStyle.cardWrap}
      onClick={() => moveToDetailPage(item.mt20id._text)}
    >
      <figure>
        <div className={cardStyle.imgWrap}>
          <img src={item.poster._text} alt={item.prfnm._text} />
          <button
            onClick={likeToggle}
            className={`${cardStyle.like} ${isActive ? cardStyle.active : ""}`}
            type="button"
          ></button>
        </div>
        <figcaption className={cardStyle.imgDescription}>
          <span
            className={`${cardStyle.status} ${
              isPerform === "공연중"
                ? cardStyle.ongoing
                : isPerform === "공연 완료"
                ? cardStyle.ended
                : cardStyle.upcoming
            }`}
          ></span>
          <h3 className={cardStyle.title}>{item.prfnm._text}</h3>
          <ul>
            <li className={cardStyle.venue}>{item.fcltynm._text}</li>
            <li className={cardStyle.date}>
              {item.prfpdfrom._text}~{item.prfpdto._text}
            </li>
          </ul>
        </figcaption>
      </figure>
    </div>
  );
}

export default Card;
