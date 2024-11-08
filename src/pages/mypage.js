// 4. MY
import React, { useEffect } from "react";
import mypageStyle from "@/styles/mypage.module.scss";
import Swal from "sweetalert2";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Mypage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  //로그아웃 POPUP
  function popUp() {
    Swal.fire({
      title: "로그아웃",
      text: "로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4B77",
      cancelButtonColor: "#8E8E8E",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut({ redirect: false }); // redirect: false 설정하여 자동 리다이렉션 방지
        // signOut({ callbackUrl: "/" });
      }
    });
  }
  // if(!session) signIn(); //세션 정보가 없으면 로그인 페이지로


    // 세션 상태가 변경되면 로그인 페이지로 리다이렉트
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login");  // 세션이 없으면 로그인 페이지로 리다이렉트
      }
    }, [status, router]);


  return (
    <div className={mypageStyle.mypagewrap}>
      {
        <ul>
          <li>안녕하세요. {session?.user?.name || "사용자"}님</li>
          <li>
            <Link href="/edit">회원정보 수정</Link>
          </li>
          <li>
            <Link href="/bookmark">북마크</Link>
          </li>
          <li>
            <Link href="/myreview">나의 리뷰</Link>
          </li>
          <li onClick={popUp}>로그아웃</li>
          <li>
            <Link href="/dropout">회원 탈퇴</Link>
          </li>
        </ul>
      }
    </div>
  );
}

export default Mypage;
