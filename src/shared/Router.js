import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPg from "../pages/main/MainPg";
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

const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPg />} />
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
          <Route path="*" element={<div>404 error 없는페이지입니다</div>} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default Router;