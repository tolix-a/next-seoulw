import React, { useState } from 'react';
import joinStyle from '@/styles/join.module.scss';

const Logininput = ({ type, id, msg, value, setValue, error,readOnly }) => {

    console.log(readOnly)
    const [visible, setVisible] = useState(false);
    

    const handleVisible = () => {     
        setVisible(!visible);
    };

    const clearInput = () => {
        setValue(''); // 부모 컴포넌트에서 값 지우기
    };


    // const validateUsername = (username) => {
    //     const usernameRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // 영문 대소문자, 숫자, .-의 특문 입력 가능
    //     return usernameRegex.test(username);
    //   };
    
    //   const validatePassword = (password) => {
    //     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 8자 이상, 영문자와 숫자 포함
    //     return passwordRegex.test(password);
    //   };



    //input type별 백그라운드 이미지 다르게 넣기
    let icon;
    switch (type) {
        case 'email':
            icon = "url(./assets/icons/my_email.svg) 15px 55% no-repeat";
            break;
        case 'password':
            icon = "url(./assets/icons/my_password.svg) 15px no-repeat";
            break;
        case 'text':
            icon = "url(./assets/icons/my_name.svg) 15px 50% no-repeat";
            break;
        case 'tel':
            icon = "url(./assets/icons/my_phone.svg) 15px no-repeat";
            break;
    }

    return (
        <div className={joinStyle.logininput}>
            <input
                type={visible ? "text" : type} // 비밀번호 표시/숨기기
                id={id}
                className={joinStyle.inputtext}
                style={{ background: icon }}
                onChange={(e) => setValue(e.target.value)} // 입력 값 변경 시 상태 업데이트
                placeholder={msg}
                value={value} // 입력 필드의 값
                disabled={readOnly}
                
            />
            {value && <button type="button" onClick={clearInput} className={`${joinStyle.input_reset_btn} ${joinStyle.inp_button}`}></button>}
            {(type==='password' && value) && <button type="button" onClick={handleVisible} className={`${joinStyle.input_eye_btn} ${joinStyle.inp_button}`}></button>}
            {error && <div className={joinStyle.error} style={{ color: 'red', margin:'5px 0px'}}>{error}</div>}
        </div>
    );
};

export default Logininput;
