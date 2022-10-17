import React from 'react';
import styled from 'styled-components';
import { BsFillChatDotsFill } from "react-icons/bs";

const ChatFloatingBtn = () => {
  if (localStorage.getItem("ACCESSTOKEN")) {
    return (
      <FloatingBtn>
        <BsFillChatDotsFill style={{ fontSize: '25px', color: 'white' }} />
      </FloatingBtn>
    );
  }
};

export default ChatFloatingBtn;

const FloatingBtn = styled.div`
  position: fixed; //포인트!
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 63px;
  bottom: 40px; //위치
  right: 40px; //위치
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #1E88E5;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 10px #b8b8b8;
    transform: scale(1.03);
    transition: transform 0.1s ease 0.1s;
  }
`;
