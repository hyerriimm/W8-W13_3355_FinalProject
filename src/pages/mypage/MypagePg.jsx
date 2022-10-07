import React from 'react';
import Header from '../../components/Header';
import MypageProfile from './components/MypageProfile';
import MypageTap from './components/MypageTap';
import ChatFloatingBtn from '../../components/ChatFloatingBtn';
import { useNavigate } from 'react-router-dom';

const MypagePg = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <MypageProfile />
      <MypageTap />
      <div onClick={() => navigate('/chatlist')}>
        <ChatFloatingBtn />
      </div>
    </>
  );
};

export default MypagePg;
