import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const API_URL = process.env.REACT_APP_HOST_PORT;

// 동의하고 계속하기를 누르면 이동되어 보여지는 화면이 REDIRECT_URI 화면이다.
// 리다이렉트 될 화면 Kakao.js

const Kakao = () => {
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get('code');
  // 주소창의 Redirect_URI 뒤에 파라미터로 ?code=@@@@@@@@@@@@@로 넘어온 인가 코드를 가져옴
  // let 변수명 = new URL(window.location.href).searchParams.get('code')
  // URL 안에 search 파라미터에 들어있는 'code'라는 값을 get 하겠다.
  // '변수명'이라는 변수 안에 인가 코드 정보가 담기게 된다.
  // console.log(code);

  useEffect(() => {
    kakaologin(code);
  }, []);

  const kakaologin = async (_code) => {
    try {
      const response = await axios.get(`${API_URL}/oauth/kakao?code=${_code}`); 
      //백엔드로 인가코드 보내고 우리 사이트 전용 토큰 발급받기

      localStorage.setItem('ACCESSTOKEN', response.headers.authorization);
      localStorage.setItem('REFRESHTOKEN', response.headers.refreshtoken);
      localStorage.setItem("Role", response.headers.role);
      localStorage.setItem("ImgURL", response.headers.imgurl);
      localStorage.setItem("Id", response.headers.id);
      // console.log(response);

      if(response.data.success === true) {
        alert(`카카오 로그인: ${response.data.data}`);
        return navigate('/');
      }
    } catch (error) {
      console.lof(typeof error); //console.lof(typeof 변수명) /변수의 타입을 알려줌
      console.log('카카오 로그인 실패', error);
      alert('카카오 로그인에 실패하였습니다.')
      return navigate('/login');
    }
  };

  return (
    <Spinner>카카오 로그인중 •••</Spinner>
  );
};

export default Kakao;

const Spinner = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: 18px;
font-weight: bold;
color: #FEE500;
margin-top: 50px;
`;
