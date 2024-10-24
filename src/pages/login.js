import React, { useEffect, useRef, useState } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/router';
import Logininput from '@/components/Logininput';
import Link from 'next/link'
import loginStyle from '@/styles/login.module.scss'



function Login() {
  const storedEmail = localStorage.getItem('rememberedEmail');
  const pw = localStorage.getItem('password');
  

  const [email, setEmail] = useState(storedEmail);
  const [password, setPassword] = useState(pw);
  const [error, setError] = useState({id:'',pw:''});
  const [rememberMe, setRememberMe] = useState(storedEmail && true);
  const [auto, setAuto] = useState(Boolean(storedEmail && pw));
  const router = useRouter();
  const { data: session } = useSession();

  const loginBtn  = useRef();

  //아이디 저장
  useEffect(() => {
    if (storedEmail && pw) {
      loginBtn.current.click();
    }
  }, []);


  const handleLogin = async (e)=>{
    e.preventDefault(); 

    //signIn이 계속 새로고침을 함 -> redirect: false로 해야 새로고침 안됨
    let loginResult = await signIn('credentials',{
                      redirect:false, email, password
                     }); 
      
      // 로그인 성공 시
      if(loginResult.ok){       
        
        // console.log(rememberMe, '요기가 아닌가요?...')
        //아이디 저장 & 자동로그인은 체크가 안될시
          if (rememberMe && auto == false) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.removeItem('password'); // 패스워드 세션 값 삭제
          } else if( rememberMe && auto){            
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('password', password); 
          } else {
            localStorage.removeItem('rememberedEmail'); // 이메일 아이디 세션 값 삭제
            localStorage.removeItem('password'); // 패스워드 세션 값 삭제
          }
          router.push('/mypage') //홈 화면으로 이동
      }else{
        console.log("Error", loginResult.error);
          if(loginResult.error.includes('아이디성공')){
            setError({id:'', pw:'비밀번호가 틀렸습니다.'});
          }else{
            setError({id:'아이디가 틀렸습니다.', pw:'비밀번호가 틀렸습니다.'});
          }
      }
   }


 
  return (

    <div className={loginStyle.loginwrap}> 
      <button className={loginStyle.closeButton} onClick={() => router.push('/')}/>
      <h2>로그인</h2>
      <form onSubmit={handleLogin} name="mm">
       <Logininput  type="email" msg="아이디" value={email} setValue={setEmail} error={error.id}/>
       <Logininput type="password" msg="비밀번호 (영문/숫자/특수문자 조합 8~15자)" value={password} setValue={setPassword} error={error.pw}/>
      
        <input type="submit" value="로그인" ref={loginBtn}/>
        
        <input type='checkbox' className={loginStyle.checkbox} id="chk1" name="chk" checked={rememberMe} onChange={()=>setRememberMe(!rememberMe)}/>
        <label htmlFor="chk1"><i></i>아이디 저장</label>
        <input type='checkbox' className={loginStyle.checkbox} id="chk2" name="chk" checked={auto} onChange={()=>setAuto(!auto)}/>
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