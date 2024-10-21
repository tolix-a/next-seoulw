import React, { useEffect, useState } from "react";
import db from "@/lib/firebase";
import editStyle from "@/styles/edit.module.scss";
import {doc,getDocs,updateDoc,collection,query,setDoc,
} from "firebase/firestore";
import Logininput from "@/components/Logininput";
import { where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Edit = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [joinname, setJoinname] = useState("");
  const [phone, setPhone] = useState("");
  const [comautoid, setComautoid] = useState("");
  const [isAgreed, setIsAgreed] = useState(false); // 동의 체크 상태 추가
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  //로그인시 session 정보를 연결해줄 수 있는 중요한 부분
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = session.user.email;
        // console.log(session,'=================aaaaa'); 어디서 부터 막히는 지 check
        const memberRef = collection(db, "member");
        const q = query(memberRef, where("userId", "==", userEmail)); // 조건에 맞는 이메일로 쿼리
        const querySnapshot = await getDocs(q);

        // console.log(querySnapshot.empty);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data();
          setComautoid(querySnapshot.docs[0].id);
          // userData 상태 업데이트
          setEmail(userDoc.userId);
          setPassword(userDoc.userPassword);
          setJoinname(userDoc.userName);
          setPhone(userDoc.userPhone);
          setConfirmPassword(userDoc.userPassword);
          setLoading(false); // 데이터 로드가 완료되면 로딩 상태 변경
        } else {
          alert("사용자를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error.message);
        alert("데이터 로딩 실패. 다시 시도해주세요.");
      }
    };
    fetchData();
  }, [session]); // 세션될때 한번 실행

  //중복 체크 버튼 클릭시 활성화
  const handleSubmit = async (e) => {
    e.preventDefault(); //새로고침 방지
    setLoading(true); //중복 체크 버튼 클릭시 로딩중 실행

    // 비밀번호 확인과 일치 체크
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 개인 정보 수집 동의 체크
    if (!isAgreed) {
      alert("개인 정보 수집 및 이용에 동의해야 합니다.");
      setLoading(false);
      return;
    }

    try {
      // Firebase Firestore에서 사용자 데이터 업데이트(updateDoc)
      const userDocRef = doc(db, "member", comautoid); // 컴퓨터가 설정하는 실제 사용자의 자동 부여 아이디
      await updateDoc(userDocRef, {
        userId: email,
        userName: joinname,
        userPhone: phone,
        userPassword: password,
      });

      alert("수정이 완료되었습니다.");
      setLoading(false);
      router.push('/');
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("수정 실패");
      setLoading(false);
    }
  };

  // 로딩 중일 때 "Loading..." 텍스트 표시
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={editStyle.editwrap}>
      <form onSubmit={handleSubmit}>
        <Logininput
          type="email"
          msg="아이디"
          readOnly={true}
          value={email}
          setValue={setEmail}
        />
        <Logininput
          type="password"
          msg="비밀번호 (영문/숫자/특수문자 조합 8~15자)"
          value={password}
          setValue={setPassword}
        />
        <Logininput
          type="password"
          msg="비밀번호 확인"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <Logininput
          type="text"
          msg="성함"
          readOnly={true}
          value={joinname}
          setValue={setJoinname}
        />
        <Logininput
          type="tel"
          msg="휴대폰 번호 ( - 없이 )"
          value={phone}
          setValue={setPhone}
        />

        <input
          type="checkbox"
          className={editStyle.checkbox}
          id="info1"
          name="info"
          checked={isAgreed}
          onChange={() => setIsAgreed(!isAgreed)}
        />
        <label htmlFor="info1">
          <i></i>개인 정보 수집 및 이용에 동의합니다.
        </label>

        <input
          type="submit"
          className={`${editStyle.inputbtn} ${
            isAgreed ? editStyle.active : editStyle.inputbtn
          }`}
          value="수정 완료"
          disabled={!isAgreed}
        />
      </form>
    </div>
  );
};

export default Edit;
