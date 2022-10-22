import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MainPg from "../pages/main/MainPg";
import SearchPg from "../pages/search/SearchPg";
import SignupPg from "../pages/signup/SignupPg";
import LoginPg from "../pages/login/LoginPg";
import KaKao from '../pages/login/Kakao';
import DetailPg from "../pages/detail/DetailPg"
import DetailEditPg from "../pages/detail/DetailEditPg"
import ApplyFormPg from "../pages/detail/ApplyFormPg"
import ApplyCheckPg from "../pages/detail/ApplyCheckPg"
import PostReport from "../pages/detail/PostReport"
import FormPg from "../pages/form/FormPg"
import SomeonesMypage from "../pages/mypage/SomeonesMypage";
import MypagePg from "../pages/mypage/MypagePg";
import MyInfoEditPg from "../pages/mypage/MyInfoEditPg";
import WishPg from "../pages/mypage/WishPg";
import MyActivityPg from "../pages/mypage/MyActivityPg";
import ChatListPg from "../pages/chat/ChatListPg";
import ChatDetailPg from "../pages/chat/ChatDetailPg";
import AdminPg from "../pages/admin/AdminPg";
import TutorialPg from "../pages/main/TutorialPg";

import Header from '../components/Header';
import axios from 'axios';
import { useEffect } from 'react';

const RouterPg = () => {

  const navigate = useNavigate();
  const ACCESSTOKEN = localStorage.getItem('ACCESSTOKEN');
  const REFRESHTOKEN = localStorage.getItem('REFRESHTOKEN');

  useEffect(() => {
    if (ACCESSTOKEN) {
      let refreshTimeoutId1;
      let refreshTimeoutId2;
      const reToken = async () => {
        await axios
          .get(`${process.env.REACT_APP_HOST_PORT}/member/reissue`, {
            headers: {
              Authorization: localStorage.getItem('ACCESSTOKEN'),
              Refreshtoken: localStorage.getItem('REFRESHTOKEN'),
            },
          })
          .then((response) => {
            // console.log("reToken 함수 불림",response.data);
            if (response.data.data === '재발급 완료') {
              localStorage.setItem('ACCESSTOKEN', response.headers.authorization);
              localStorage.setItem('REFRESHTOKEN', response.headers.refreshtoken);
              clearTimeout(refreshTimeoutId1);
              clearTimeout(refreshTimeoutId2);
              //로그인 연장 후 30분 뒤 1800000
              refreshTimeoutId2 = setTimeout(reToken, 1800000);
            }
            if (response.data.success === true && response.data.data.message === "아직 유효한 토큰입니다.") {
              // console.log(`아직 유효한 토큰입니다. ${response.data.data.expiresAt/1000}초 뒤 토큰 연장`);
              clearTimeout(refreshTimeoutId1);
              clearTimeout(refreshTimeoutId2);
              refreshTimeoutId1 = setTimeout(reToken, response.data.data.expiresAt);
              // 아직 유효한 토큰일 때 토큰이 유효할 수 있는 남은 시간을 함께 보내주면
              // setTimeout으로 그 시간 후 이 함수를 다시 실행시켜 get요청으로 새로운 토큰을 발급받아오도록 함
            }
          })
          .catch((error) => {
            // ... 로그인 실패 처리
            clearTimeout(refreshTimeoutId1);
            clearTimeout(refreshTimeoutId2);
            alert("로그인에 실패했습니다. 다시 로그인 해주세요.");
            localStorage.removeItem("ACCESSTOKEN");
            localStorage.removeItem("REFRESHTOKEN");
            localStorage.removeItem("Role");
            localStorage.removeItem("ImgURL");
            localStorage.removeItem("Id");
            navigate('/');
            // console.log(error);
            // reToken();
            return
          });
      };

      reToken();
      
      return () => {
        clearTimeout(refreshTimeoutId1);
        clearTimeout(refreshTimeoutId2);
      }
    } else {
      return;
    }
  }, [ACCESSTOKEN]);



  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPg />} />
        <Route path="/search" element={<SearchPg />} />
        <Route path="signup" element={<SignupPg />} />
        <Route path="login" element={<LoginPg />} />
        <Route path="/oauth/kakao" element={<KaKao />} />{" "}
        {/* 리다이렉트 되는 화면 */}
        <Route path="/detail/:id" element={<DetailPg />} />
        <Route path="/detail/:id/edit" element={<DetailEditPg />} />
        <Route path="/detail/:id/apply" element={<ApplyFormPg />} />
        <Route path="/detail/:id/check" element={<ApplyCheckPg />} />
        <Route path="/detail/postreport" element={<PostReport />} />
        <Route path="form" element={<FormPg />} />
        <Route path="/someonesmypage/:idnumber" element={<SomeonesMypage />} />
        <Route path="/mypage" element={<MypagePg />} />
        <Route path="/mypage/infoedit" element={<MyInfoEditPg />} />
        <Route path="/mypage/wish" element={<WishPg />} />
        <Route path="/mypage/activity" element={<MyActivityPg />} />
        <Route path="/chatlist" element={<ChatListPg />} />
        <Route path="/chatlist/:id" element={<ChatDetailPg />} />
        <Route path="/admin" element={<AdminPg />} />
        <Route path="/tutorial" element={<TutorialPg />} />
        <Route
          path="*"
          element={<div>404 error 존재하지 않는 페이지입니다.</div>}
        />
      </Routes>
    </>
  );
};
  
  export default RouterPg;