import React from 'react'
import { useRouter } from 'next/router'
import errorStyle from '@/styles/error.module.scss';

const NotFound = () => {
    const router = useRouter();
    function goBack() {
        if (window.history.length > 2) {
            router.back();  // 히스토리가 있을 때만 뒤로가기
        } else {
        router.push('/');  // 히스토리가 없으면 홈으로 이동
        }
    }
  return (
    <div className={errorStyle.errorWrap}>
      <h2 className={errorStyle.title}>페이지를 찾을 수 없습니다.</h2>
      <div className={errorStyle.errorMsgWrap}>
        <p>사용할 수 없는 페이지입니다.</p>
        <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
      </div>
      <button onClick={goBack}>이전 페이지로</button>
    </div>
  )
}

export default NotFound