import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import joinStyle from '@/styles/join.module.scss';
import { useRouter } from 'next/router';
import Logininput from '@/components/Logininput';
import { addDoc, collection, query, where , getDocs} from 'firebase/firestore';
import db from '@/lib/firebase';

function Join() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [joinname, setJoinname] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [emailChecked, setEmailChecked] = useState(false); // 이메일 중복 체크 상태
    const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 형식 체크 상태
   
    const router = useRouter();


    // 이메일 형식 유효성 검사
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규식
        setIsEmailValid(emailRegex.test(email)); // 이메일 형식이 맞으면 true
    }, [email]);

    // 이메일 중복 체크
    const checkEmailDuplicate = async () => { 
        if (!email) {
            setError("이메일을 입력해 주세요.");
            return;
        }
        if (!isEmailValid) {
            setError("올바른 이메일 형식을 입력해 주세요.");
            return;
        }
        try {
            const q = query(collection(db, "member"), where("userId", "==", email));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                console.log(!querySnapshot.empty,'sdfsdfsdsfdf=====================')
                // 이메일 중복 있음
                setError("중복된 이메일입니다. 다른 이메일을 입력하세요.");
                setEmailChecked(false);
                
            } else {
                // 이메일 중복 없음
                setError(""); // 에러 메시지 지우기
                setEmailChecked(true);
            }
        } catch (error) {
            console.error("Error checking email:", error);
            setError("이메일 중복 체크에 실패했습니다.");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        

        // 약관 동의 체크
        if (!(e.target.info1.checked && e.target.info2.checked)) {
            setError("이용 약관에 동의해야 합니다.");
            return;
        }

        // 비밀번호 확인
        if (password !== confirmPassword) {
            setError("패스워드가 일치하지 않습니다.");
            return;
        }

        // 필수 항목 확인
        if (!(joinname && email && password && phone)) {
            setError('모든 필드를 입력해주세요.');
            return;
        }

        // 이메일 중복 체크 확인
        if (!emailChecked) {
            setError("이메일 중복 체크를 먼저 해주세요.");
            return;
        }

        try {
            // Firestore에 회원가입 정보 추가
            await addDoc(collection(db, "member"), {
                userId: email,
                userPassword: password,
                userName: joinname,
                userPhone: phone
            });

            Swal.fire({
                title: "회원가입 완료",
                text: `${joinname}님의 회원가입이 완료되었습니다.`,
                icon: "success",
                confirmButtonColor: "#FF4B77",
                confirmButtonText: "Confirm"
            });

            router.push('/login'); // 회원가입 완료 후 로그인 페이지로 이동
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className={joinStyle.loginwrap}>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                {error && <div style={{color: 'red', margin: '10px 0'}}>{error}</div>}
                <div className={joinStyle.loginrow}>
                    <Logininput type="email" msg="아이디"  value={email} setValue={setEmail} />
                    <button type="button" onClick={checkEmailDuplicate} className={emailChecked ? joinStyle.active : joinStyle.checkBtn} >중복 체크</button>
                </div>
                <Logininput type="password" msg="비밀번호 (영문/숫자/특수문자 조합 8~15자)" value={password} setValue={setPassword} />
                <Logininput type="password" msg="비밀번호 확인"  value={confirmPassword} setValue={setConfirmPassword} />
                <Logininput type="text" msg="성함"  value={joinname} setValue={setJoinname} />
                <Logininput type="tel" msg="휴대폰 번호 ( - 없이 )" value={phone} setValue={setPhone} />
     
                <div className={joinStyle.inputcheck}>
                    <input type='checkbox' className={joinStyle.checkbox} id="info1" name="info1" />
                    <label htmlFor="info1"><i></i>이용 약관 동의<span>(필수)</span></label>
                </div>
                <div className={joinStyle.inputcheck}>
                    <input type='checkbox' className={joinStyle.checkbox} id="info2" name="info2" /> 
                    <label htmlFor="info2"><i></i>개인 정보 수집 및 이용 동의<span>(필수)</span></label>
                </div>
                <div className={joinStyle.inputcheck}>
                    <input type='checkbox' className={joinStyle.checkbox} id="info3" name="info3" />
                    <label htmlFor="info3"><i></i>E-mail 및 SMS 광고성 정보 수신 동의<span>(선택)</span></label>
                </div>

                <input type="submit" className={joinStyle.inputbtn} value="가입 완료" />
            </form>
        </div>
    );

}
export default Join;
