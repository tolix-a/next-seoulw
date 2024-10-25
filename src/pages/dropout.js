import React, { useState } from 'react'
import Swal from 'sweetalert2';
import dropoutStyle from '@/styles/dropout.module.scss'
import { signIn, signOut, useSession } from 'next-auth/react';
import db from '@/lib/firebase';
import { collection,getDocs, query, where, deleteDoc, doc  } from 'firebase/firestore';
import { useRouter } from 'next/router';

const Dropout = () => {
  const { data: session } = useSession();
  const [isAgreed, setIsAgreed] = useState(false); // 탈퇴 동의 체크 상태 관리
  const router = useRouter();

  
  // 이메일로 회원을 찾고, 해당 회원의 정보를 삭제하는 함수
  const handleDropout = async () => {
    if (isAgreed && session?.user?.email) {
      try {
        const userEmail = session.user.email; 
        const memberRef = collection(db, 'member'); 
        //member사용자의 이메일 주소를 사용하여 컬렉션을 쿼리
        const q = query(memberRef, where('userId', '==', userEmail));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userId = userDoc.id; 

          await deleteDoc(doc(db, 'member', userId));
          signOut();
        } else {
          
          alert('사용자를 찾을 수 없습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error('회원 탈퇴 실패:', error.message);
        alert('회원 탈퇴 실패. 다시 시도해주세요.');
      }
    } else {
      alert('탈퇴에 동의해주세요.');
    }
  };

  //탈퇴 POPUP
  function popUp() {
    Swal.fire({
      title: "탈퇴",
      text: "탈퇴 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4B77",
      cancelButtonColor: "#8E8E8E",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDropout();
      }
    });
  }

   
  // 체크박스 상태 변경
   const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };


  // "계속 사용하기" 버튼 클릭 시 호출되는 함수
  const handleKeepUsing = () => {
    Swal.fire({
      title: "계속 사용할래?",
      text: "정말 계속 사용하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FF4B77",
      cancelButtonColor: "#8E8E8E",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/'); // 홈으로 이동
      }
    });
  };

  if(!session) signIn();

 
  return (
    <div className={dropoutStyle.dropoutwrap}>
        <p>{session?.user?.name || "사용자"}님 <i>정보가 모두 사라져요!</i></p>
        <div className={dropoutStyle.dropbox} id={dropoutStyle.box1}><b>북마크</b><span>20<i>개</i></span></div>
        <div className={dropoutStyle.dropbox}><b>리뷰</b><span>1,024<i>개</i></span></div>
        <div className={dropoutStyle.dropinfo}>
        <p><em></em>꼭 확인해 주세요!</p>
        <ul>
        <li>회원 탈퇴 시 서울더블유 주식회사(SEOUL W corp.)의 모든 서비스에서 탈퇴 처리됩니다.</li>
        <li>회원 탈퇴 시 계정과 관련된 정보는 복구가 불가능합니다.</li>
        <li>동일한 이메일이나 휴대폰 번호로는 30일 간 재가입이 불가능합니다.</li>
        <li>디지털 콘텐츠 등 관련 서비스에서 회원님이 작성하신 콘텐츠에 대한 이용 권한이 상실됩니다.</li>
        </ul>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
        <input type='checkbox' className={dropoutStyle.checkbox} id="info1" name="info" onChange={handleCheckboxChange}
          checked={isAgreed} />
        <label for="info1" ><i></i>위 내용을 숙지하였으며 탈퇴에 동의합니다.</label>
        <input type="submit" className={dropoutStyle.keepbtn} value="계속 사용하기" onClick={handleKeepUsing} />
        <input type="submit" onClick={popUp} className={dropoutStyle.dropbtn} value="회원 탈퇴" />
        </form>
    </div>
  )
}

export default Dropout