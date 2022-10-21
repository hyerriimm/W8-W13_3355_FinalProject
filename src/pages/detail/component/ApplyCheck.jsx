import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import {__getApplication, __refuse, __accept } from '../../../redux/modules/application';
import ModalOfApplyCheck from './ModalOfApplyCheck';
import ChatFloatingBtn from '../../../components/ChatFloatingBtn';


const ApplyCheck = () => {
  const navigate = useNavigate();
  const params_id = useParams().id;
  const dispatch = useDispatch();
  const { applicants, detailTitle } = useSelector((state) => state.application);
  // console.log(applicants);
  // content 지원내용
  // applicationId 신청할 떄 들어가는 고유 아이디
  // postId
  // imgUrl
  // nickname
  // state "WAIT" "APPROVED" "DENIED"
  // console.log(detailTitle);
  // applicationMemberId 회원 고유 아이디

  useEffect(() => {
    dispatch(__getApplication(params_id));
  }, [applicants.length]);
  
  const onClickRefuseBtn = (nickname, applicationId) => {
    if (window.confirm(`${nickname}님의 신청을 거절하시겠습니까?`)) {
      dispatch(__refuse(applicationId));
      // setModalOpen(false);
    }
  };
  
  const onClickAcceptBtn = (nickname, applicationId) => {
    if (window.confirm(`${nickname}님의 신청을 수락하시겠습니까?`)) {
      dispatch(__accept(applicationId));
      // setModalOpen(false);
    }
  };

  const Cards = ({eachApplicant}) => {
      // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };
    
    return (
      <div>
        { eachApplicant.state !== "WAIT" ? (
          eachApplicant.state !== "APPROVED" ? (
        <DENIEDCard onClick={openModal}>
          <Body>
            <ProfileImg src={eachApplicant.imgUrl} alt='profile' onClick={()=>{navigate(`/someonesmypage/${eachApplicant.applicationMemberId}`)}}/>
            <StP>
              <span style={{color:'#ff0000'}} onClick={()=>{navigate(`/someonesmypage/${eachApplicant.applicationMemberId}`)}}>{eachApplicant.nickname}</span> 님의 신청이 <span style={{color:'#ff0000'}}>거절</span>되었습니다.
            </StP>
          </Body>
        </DENIEDCard>
          ): (
          <APPROVEDCard onClick={openModal}>
            <Body>
              <ProfileImg src={eachApplicant.imgUrl} alt='profile' onClick={()=>{navigate(`/someonesmypage/${eachApplicant.applicationMemberId}`)}}/>
              <StP>
                <span onClick={()=>{navigate(`/someonesmypage/${eachApplicant.applicationMemberId}`)}}>{eachApplicant.nickname}</span> 님의 신청이 <span>승인</span>되었습니다.
              </StP>
            </Body>
          </APPROVEDCard>
          )
        ) : (
          <Card>
          <Body>
            <ProfileImg src={eachApplicant.imgUrl} alt='profile' onClick={()=>{navigate(`/someonesmypage/${eachApplicant.applicationMemberId}`)}}/>
            <StP>
              <span onClick={()=>{navigate(`/someonesmypage/${eachApplicant.applicationMemberId}`)}}>{eachApplicant.nickname}</span> 님이  <span>{detailTitle}</span>
              모임에 참여를 신청했습니다.
            </StP>
          </Body>
          <BtnsDiv>
            <StButton
            onClick={openModal}
            style={{backgroundColor:'#2196F3'}}>
            지원내용 확인하기
            </StButton>
          </BtnsDiv>
        </Card>
        ) }
          <ModalOfApplyCheck 
            open={modalOpen} 
            close={closeModal} 
            header={`지원자 ${eachApplicant.nickname}`}
            nickname={eachApplicant.nickname}
            applicantStatus={eachApplicant.state}
            applicationId={eachApplicant.applicationId}
            onClickRefuseBtn={onClickRefuseBtn}
            onClickAcceptBtn={onClickAcceptBtn}
            >
              {/* Modal.js의  <main> {props.children} </main>에 내용이 입력된다.  */}
              {eachApplicant.content}
          </ModalOfApplyCheck>
      </div>
    );
  };
  
  return (
    <StContainer>
      <Item1>
        <StDiv>
          <img
            alt='뒤로가기'
            src={`${process.env.PUBLIC_URL}/img/backspace.png`}
            style={{ width: '25px', height: '25px', marginRight: '10px' }}
            onClick={() => navigate(-1)}
          />
          <h3>지원 확인</h3>
        </StDiv>
        <ApplyTitleDiv>
          <div>모임명</div>
          <div> {detailTitle} </div>
        </ApplyTitleDiv>
        {applicants.slice().reverse().map((eachApplicant) => 
          <Cards key={uuidv4()} eachApplicant={eachApplicant} />
        )}
      </Item1>
      <div onClick={()=>navigate('/chatlist')}>
        <ChatFloatingBtn />
      </div>
    </StContainer>
  );
};

export default ApplyCheck;

const StContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 0 auto;
  grid-template-areas: 'a';
`;

const Item1 = styled.div`
  grid-area: a;
  min-width: 375px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const StDiv = styled.div`
  min-width: 100%;
  max-width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const ApplyTitleDiv = styled.div`
  max-width: 375px;
  text-overflow: ellipsis; 
  overflow : hidden;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 12px;
  color: black;
  div {
    font-size: 15px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
  }
`;

const Card = styled.div`
  width: 100%;
  height: fit-content;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const DENIEDCard = styled.div`
  width: 100%;
  max-height: 100px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const APPROVEDCard = styled.div`
  width: 100%;
  max-height: 100px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Body = styled.div`
box-sizing: border-box;
  width: 375px;
  height: fit-content;
  padding: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StP = styled.p`
  cursor: pointer;
  font-size: 15px;
  span {
    color: #008cff;
  }
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-left: 10px;
  margin-right: 20px;
  border: 2px solid #bcd7ff;
`;

const BtnsDiv = styled.div`
box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const StButton = styled.button`
word-break: keep-all;
  height: 45px;
  width: 150px;
  margin: 0px 10px 20px 10px;
  border: transparent;
  border-radius: 6px;
  font-size: 15px;
  color: white;
  cursor: pointer;
  :hover {
    filter: brightness(90%);
    box-shadow: 1px 1px 3px 0 #bcd7ff;
  }
`;