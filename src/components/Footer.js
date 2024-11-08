import React, { useState } from 'react'
import footerStyle from "@/styles/footer.module.scss";
import Link from 'next/link';
import { useRouter } from 'next/router';

function Footer() {
  const [unfold, setUnfold] = useState(false);
  const router = useRouter();
  if(router.pathname === '/search' 
      || router.pathname === '/mypage' 
      || router.pathname === '/login' 
      || router.pathname === '/category' 
      || router.pathname === '/search2' 
      || router.pathname === '/join'){
    return null;
  }
  const onToggle = () => {
    setUnfold((prev) => !prev);
  }

  const goToPolicy = () => {
    router.push(`/policy`);
  };


  return (
    <footer className={footerStyle.footer}>
      <div>
        <ul className={footerStyle.policy}>
          <li onClick={() => goToPolicy()}>이용약관</li>
          <li onClick={() => goToPolicy()}>개인정보처리방침</li>
        </ul>
      </div>

      <div>
        <h3>
          서울더블유 주식회사
          <button onClick={onToggle} type='button' className={`${footerStyle.toggle} ${unfold ? footerStyle.unfold : ''}`}></button>
        </h3>
        <div className={`${footerStyle.details} ${unfold ? footerStyle.unfold : ''}`}>
          <ul className={footerStyle.companyInfo}>
            <li>대표 이사: 김대표</li>
            <li>서울 강남구 테헤란로5길 24 장연빌딩 3~6층</li>
            <li>사업자 등록 번호: 123 45 67890</li>
            <li>통신 판매업 신고 번호: 제 2024 서울 강남 12345호</li>
            <li>고객 센터: 02-455-6678</li>
          </ul>
          <ul className={footerStyle.notice}>
            <li>이 사이트는 Next.js를 이용해 학습용으로 제작되었습니다.</li>
            <li>This site was created for educational purposes using Next.js.</li>
          </ul>
        </div>
        
      </div>

      <div>
        <p>Copyright ⓒ SEOUL W corp. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer