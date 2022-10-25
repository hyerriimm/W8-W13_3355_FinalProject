import React, { useState, useEffect } from 'react';
import {  } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
// import Header from '../../components/Header';
import BasicTabs from './components/MypageTap';
import { RiAlarmWarningFill } from 'react-icons/ri';
import ModalOfReportMember from './components/ModalOfReportMember';

const SomeonesMypage = () => {
  const navigate = useNavigate();
  const params_id = useParams().idnumber;
  const [someonesInfo, setSomeonesInfo] = useState();
  const [someonesLeaderInfo, setSomeonesLeaderInfo] = useState();

  // console.log(someonesInfo);
  // console.log(someonesLeaderInfo);

  // 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 다른사람 정보 가져오기
  useEffect(() => {
    const getSomenesInfo = async() => {        
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST_PORT}/mypage/${params_id}`, {
                headers: {
                authorization: localStorage.getItem("ACCESSTOKEN"),
                refreshtoken: localStorage.getItem("REFRESHTOKEN")
                }
            });
            if (response.data.success === true) {
                setSomeonesInfo(response.data.data);
            };
            if (response.data.success === false) {
                alert(response.data.error.message);
                return
            };
        } catch (error) {
            console.log(error);
        };
    };
    getSomenesInfo();
  }, []);

  // 다른사람 주최 게시글 정보 가져오기
  useEffect(() => {
    const getSomenesLeaderInfo = async() => {        
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST_PORT}/mypage/leader/${params_id}`, {
                headers: {
                authorization: localStorage.getItem("ACCESSTOKEN"),
                refreshtoken: localStorage.getItem("REFRESHTOKEN")
                }
            });
            if (response.data.success === true) {
              setSomeonesLeaderInfo(response.data.data);
            };
            if (response.data.success === false) {
                alert(response.data.error.message);
                return
            };
        } catch (error) {
            console.log(error.message);
        };
    };
    getSomenesLeaderInfo();
  }, []);

  // 회원 신고 모달 오픈
  const [isReportMode, setIsReportMode] = useState(false);

  // 신고 내용 담을 State
  const initialState = {
    content: "",
  };
  const [content, setContent] = useState(initialState);

  // 회원 신고 기능
  const ReportMemberBtn = async () => {
    console.log(content);
    if (content.content.trim() === "") {
      return alert("내용을 입력해야 신고가 가능합니다.");
    }
    if (
      window.confirm(
        `${someonesInfo?.nickname}님을 신고하시겠습니까?\n신고 후 취소는 불가능합니다.`
      )
    ) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_HOST_PORT}/report/member/${params_id}`,
          content,
          {
            headers: {
              authorization: localStorage.getItem("ACCESSTOKEN"),
              refreshtoken: localStorage.getItem("REFRESHTOKEN"),
            },
          }
        );

        if (response.data.success === true) {
          alert(response.data.data);
          setContent(initialState);
          return setIsReportMode(false);
        }
        if (response.data.success === false) {
          alert(response.data.error.message);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <>
      {someonesInfo ? (
      <>
        {/* <Header /> */}
        <BackSpaceDiv>
          <img
              alt="뒤로가기"
              src={`${process.env.PUBLIC_URL}/img/backspace.png`}
              style={{ width: "25px", height: "25px"}}
              onClick={() => navigate(-1)}
            />
        </BackSpaceDiv>
        <Container>
          <ProfileWrapper>
            <Profile>
              <img src={someonesInfo?.imgUrl} alt='profile' />
            </Profile>
            <DescWrapper>
              <StNickName>
                <div>
                  {someonesInfo?.nickname}
                </div>
              </StNickName>
              <StInfoDiv>
                {someonesInfo?.root === 'normal' ? (
                    // <Sttag>일반계정</Sttag>
                    <Stdiv>일반계정</Stdiv>
                ) : (
                  // <ImgKakao
                  //   src='img/kakao_login_small.png'
                  //   alt='카카오 로그인 버튼'
                  // ></ImgKakao>
                  <Stdiv style={{backgroundColor:'yellow' }}>카카오 계정</Stdiv>
                )}
                <Stdiv>
                  <div>{someonesInfo?.minAge}대</div>
                  &nbsp;
                  <div>{someonesInfo?.gender === "FEMALE" ? '여성' : false}</div>
                  <div>{someonesInfo?.gender === "MALE" ? '남성' : false}</div>
                </Stdiv>
                <Stdiv>
                  &nbsp;
                  <div>참가한 모임 {someonesInfo?.leaderCount}</div>
                </Stdiv>
              </StInfoDiv>
            </DescWrapper>
          </ProfileWrapper>
          {/* 신고버튼 */}
          <ReportBtn
          onClick={()=>setIsReportMode(true)}
          >
            <RiAlarmWarningFill
                size='20'
                color='#1a399c'
            />
          </ReportBtn>
          {isReportMode ? (
            <ModalOfReportMember
            header={someonesInfo?.nickname}
            isReportMode={isReportMode}
            setIsReportMode={setIsReportMode}
            setContent={setContent}
            ReportMemberBtn={ReportMemberBtn}
            />
          ) : (false)}
        </Container>
        {/* <Container>
          <EtcDiv>
            만든 모임 {someonesInfo?.leaderCount}
            <br/>
            참가한 모임 {someonesInfo?.leaderCount}
          </EtcDiv>
        </Container> */}
        <BasicTabs 
        // 탭 조건부렌더링 하려고 내려줌
        someoneWatchingYourMypage={true}
        someonesLeaderInfo={someonesLeaderInfo !== undefined ? (someonesLeaderInfo) : (false)}
        />
      </>
      ) : (
        <Loading>
          <img alt='로딩중'
          src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921'
          />
        </Loading>
      )}
    </>
  );
};

export default SomeonesMypage;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
`;

const BackSpaceDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left:5%;
  height: 40px;
`;

const Container = styled.div`
/* background-color: yellow; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin: auto;
  margin-top: 30px;
  @media only screen and (max-width: 720px) {
    margin-top: 10px;
    align-items: flex-start;
  }
`;

const EtcDiv = styled.div`
  display: flex;
  box-sizing: border-box;
  padding-left: 80px;
  width: 60vw;
  max-width: 450px;
  min-width: 320px;
`;

const ProfileWrapper = styled.div`
/* background-color: aliceblue; */
  display: flex;
  width: 60vw;
  max-width: 450px;
  min-width: 320px;
`;

const Profile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  border: 0.5px solid #ededed;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const DescWrapper = styled.div`
/* background-color: green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin: auto 0 auto 25px;
`;

const StNickName = styled.div`
/* background-color: purple; */
  font-size: 16px;
  font-weight: 600;
  font-family: 'NotoSansKR';
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StInfoDiv = styled.div`
/* background-color: blanchedalmond; */
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  @media only screen and (max-width: 720px) {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    height: 100px;
  }
`;

const Stdiv = styled.div`
background-color: #ddd;
  display: flex;
  font-size: 14px;
  font-family: 'NotoSansKR';
  width: fit-content;
  padding: 0 5px;
  border-radius: 6px;
  margin-right: 10px;
  @media only screen and (max-width: 720px) {
    margin: 5px 0;
  }
`;

const ImgKakao = styled.img`
  height: 15px;
  margin: 0 5px;
  margin-left: 10px;
`;

const ReportBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  width: 35px;
  height: 35px;
  border: transparent;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  :hover {
  filter: brightness(110%);
  box-shadow: 1px 1px 3px 0 #bcd7ff;
  background-color: #ff8a1d;
  }
`; 

export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
`;

export const ModalBackdrop = styled.div`
  width: 100vh;
  height: 100vh;
  /* position: fixed; */
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
  border-radius: 30px;
  color: #4000c7;
`;