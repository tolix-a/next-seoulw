import React, { useState } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/router';
import Logininput from '@/components/Logininput';
import Link from 'next/link'
import loginStyle from '@/styles/login.module.scss'
import db from '@/lib/firebase';
import { doc, setDoc, addDocs } from "firebase/firestore";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [joinname, setJoinname] = useState('');
  const [error, setError] = useState({id:'',pw:''});
  const router = useRouter();

  const handleLogin = async (e)=>{
    e.preventDefault(); 
 
        console.log(email, password);

    //signIn이 계속 새로고침을 함 -> redirect: false로 해야 새로고침 안됨
    let loginResult = await signIn('credentials',{
                  redirect:false, email, password
                 }); 
      console.log(loginResult);
      if(loginResult.ok){       
        //홈 화면으로 페이지 이동시
        router.push('/')

      }else{
        console.log("Error", loginResult.error);
        if(loginResult.error.includes('아이디성공')){
          setError({id:'', pw:'비밀번호가 틀렸습니다.'});
        }else{
          setError({id:'아이디가 틀렸습니다.', pw:'비밀번호가 틀렸습니다.'});
        }
      }
   }
   const handleSocialLogin = async (provider) => {
   const result = await signIn(provider, { redirect: false, callbackUrl: '/' });
   console.log('===========333333====',result)

  };
 
  return (

    <div className={loginStyle.loginwrap}>
      <button className={loginStyle.closeButton} onClick={() => router.push('/')}>
      </button>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
       <Logininput  type="email" msg="아이디" value={email} setValue={setEmail} error={error.id}/>
       <Logininput type="password" msg="비밀번호 (영문/숫자/특수문자 조합 8~15자)" value={password} setValue={setPassword} error={error.pw}/>
      
        <input type="submit" value="로그인" />
        
        <input type='checkbox' className={loginStyle.checkbox} id="chk1" name="chk"/>
        <label htmlFor="chk1"><i></i>아이디 저장</label>
        <input type='checkbox' className={loginStyle.checkbox} id="chk2" name="chk"/>
        <label htmlFor="chk2"><i></i>자동 로그인</label>
      </form>
      <div className={loginStyle.loginbtn}>
      <Link href="/">아이디 찾기</Link>
      <Link href="/">비밀번호 찾기</Link>
      <Link href="/join">회원가입</Link>
      </div>
      <div className={loginStyle.loginicon}>
        <button onClick={()=>handleSocialLogin('github',{callbackUrl:'/'})}><img src="../../assets/icons/github_icon1.svg"/></button>
        <button onClick={()=>handleSocialLogin('naver',{callbackUrl:'/'})}><img src="../../assets/icons/naver_icon.svg"/></button>
        <button onClick={()=>handleSocialLogin('google',{callbackUrl:'/'})}><img src="../../assets/icons/google_icon.svg"/></button>
        {/* <button onClick={()=>signIn('github',{callbackUrl:'/'})}><img src="../../assets/icons/github_icon1.svg"/></button>
        <button onClick={()=>signIn('naver',{callbackUrl:'/'})}><img src="../../assets/icons/naver_icon.svg"/></button>
        <button onClick={()=>signIn('google',{callbackUrl:'/'})}><img src="../../assets/icons/google_icon.svg"/></button> */}
        {/* 콜백,{callbackUrl:'/'}안넣으면 홈으로 안가고 마이페이지에 남음 */}
      </div>  
      </div>
  )
}

export default Login