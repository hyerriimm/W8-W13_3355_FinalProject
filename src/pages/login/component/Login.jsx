import axios from 'axios';
import React, { useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from "../../../shared/OAuth";

const API_URL = process.env.REACT_APP_HOST_PORT;

const Login = () => {
  const navigate = useNavigate();
  const userIdRef = useRef();
  const passwordRef = useRef();

  useEffect(()=>{
    userIdRef.current.focus();
  },[])

  const onLoginBtnHandler = async (newUserInfo) => {
    if (newUserInfo.userId.trim() === '' || newUserInfo.password.trim() === '') {
      return alert('이메일과 비밀번호를 입력하세요.');
    }
    try {
        const data = await axios.post(`${API_URL}/member/login`, newUserInfo);
            
        if (data.data.success === true) {
            localStorage.setItem("ACCESSTOKEN", data.headers.authorization);
            localStorage.setItem("REFRESHTOKEN", data.headers.refreshtoken);
            localStorage.setItem("ImgURL", data.headers.imgurl);
            localStorage.setItem("Id", data.headers.id);
            alert(data.data.data);
            return navigate('/');
        };
        if (data.data.success === false) {
            alert(data.data.error.message);
            if (data.data.error.code === 'INVALID_ID') {
                userIdRef.current.focus();
                passwordRef.current.value = '';
            } else {
              passwordRef.current.focus();
              passwordRef.current.value = '';
            }
            return
        };
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <Container>
      <Item1>
        <input 
        ref={userIdRef}
        type='email'
        name='userId'
        placeholder='아이디를 입력하세요'
        />
        <input 
        ref={passwordRef}
        type='password'
        name='password'
        placeholder='비밀번호를 입력하세요.' 
        />
        <StButton
          style={{ backgroundColor: '#18A0FB' }}
          onClick={()=>{
            const newUserInfo = {
                userId: userIdRef.current.value,
                password: passwordRef.current.value
            }
            onLoginBtnHandler(newUserInfo)}}
        >
          로그인
        </StButton>
        <KakaoLogin
        src='img/kakao_login_medium_wide.png'
        alt='카카오 로그인 버튼'
        onClick={()=>{window.location.href = KAKAO_AUTH_URL}}
        />
      </Item1>
      <Item2>
        <span>아직 회원이 아니신가요?</span>
        <StButton
         style={{ backgroundColor: '#038E00' }}
         onClick={()=>navigate('/signup')}
         >회원가입</StButton>
      </Item2>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 0 auto;
  margin-top: 70px;
  grid-auto-rows: minmax(200px, auto);
  grid-template-areas:
    'a'
    'b';
`;

const Item1 = styled.div`
  /* background-color: yellow; */
  grid-area: a;
  display: flex;
  flex-direction: column;
  input {
    min-height: 40px;
    border: 1px solid grey;
    border-radius: 6px;
    margin-top: 10px;
    padding-left: 10px;
    :focus {
      outline: none;
      border-color: #18a0fb;
      box-shadow: 0 0 5px #18a0fb;
    }
  }
`;

const Item2 = styled.div`
  /* background-color: orange; */
  grid-area: b;
  display: flex;
  flex-direction: column;
  span {
    font-size: 13px;
  }
`;

const StButton = styled.button`
  min-width: 222px;
  min-height: 45px;
  color: white;
  border: transparent;
  border-radius: 6px;
  margin-top: 10px;
  font-size: 15px;
`;

const KakaoLogin = styled.img`
  margin-top: 10px;
`;

