import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
// import Header from '../../components/Header';
import { RiAlarmWarningFill } from 'react-icons/ri';


const PostReport = () => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // 스크롤 맨 위로
  }, [pathname]);

  const initialState = {
    content: ''
  };
  const [content, setContent] = useState(initialState);

  // 게시글 신고 기능
  const onPostReportBtn = async() => {
    if (content.content.trim() === '') {
        return alert('내용을 입력해야 신고가 가능합니다.')
      }
    if (window.confirm('게시글을 신고하시겠습니까?\n신고 후 취소는 불가능합니다.')) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_PORT}/report/post/${state.postId}`, content, {
              headers: {
                authorization: localStorage.getItem("ACCESSTOKEN"),
                refreshtoken: localStorage.getItem("REFRESHTOKEN")
              }
            });
                
            if (response.data.success === true) {
                alert(response.data.data);
                setContent(initialState);
                return navigate(`/`);
            };
            if (response.data.success === false) {
                alert(response.data.error.message);
                return
            };
          } catch (error) {
            console.log(error);
          };
      navigate('/');
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <StDiv>
        <img
          alt='뒤로가기'
          src={process.env.PUBLIC_URL + '/img/backspace.png'}
          style={{ width: '25px', height: '25px', marginRight: '10px' }}
          onClick={() => navigate(-1)}
        />
        <RiAlarmWarningFill
          size='20'
          color='#1a399c'
          style={{ marginRight: '10px' }}
        />
        <h3>게시물 신고하기</h3>
      </StDiv>
      <Container>
        <Item1>
          <Img src={state.postImgUrl} alt='' />
          <PostContent>
            <div>
              <TitleDiv>
                <h3>{state.title}</h3>
              </TitleDiv>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ProfileImg src={state.memberImgUrl} alt='profile' />
                  <h4 style={{ width: '150px' }}>{state.authorNickname}</h4>
                </div>
              </div>
              <br />
              <strong>모임 설명</strong>
              <div>{state.content}</div>
              <br />
            </div>
          </PostContent>
        </Item1>
        <Item2>
          <TitleDiv>
            <RiAlarmWarningFill
              size='20'
              color='#1a399c'
              style={{ marginRight: '10px' }}
            />
            <h3>신고사유</h3>
          </TitleDiv>
          {/* <StTextarea /> */}
          <StTextarea
            value={content.content}
            name='content'
            maxLength={250}
            onChange={(e) => setContent({ ...content, content: e.target.value })}
            placeholder='신고사유를 입력해주세요. (250자 이내)'
          />
          <StButton type='button' onClick={onPostReportBtn}>
            신고하기
          </StButton>
        </Item2>
      </Container>
    </div>
  );
};

export default PostReport;

const StDiv = styled.div`
  display: flex;
  width: 90vw;
  min-width: 320px;
  max-width: 1240px;
  align-items: center;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  /* background-color: yellow; */
  height: max-content;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(300px, auto);
  grid-template-areas:
    'a'
    'b';
`;

const Item1 = styled.div`
  /* 720보다 클 때 나오는 화면 */
  grid-area: a;
  /* background-color: aliceblue; */
  display: flex;
  height: fit-content;
  /* max-height: 60vh; */
  width: 100%;
  max-width: 1240px;
  max-height: 750px;
  align-items: center;
  @media only screen and (max-width: 720px) {
    // 720보다 작을 때 나오는 화면
    flex-direction: column;
    max-height: fit-content;
  }
`;

const Img = styled.img`
  /* background-color: orange; */
  object-fit: contain;
  width: 50%;
  max-height: 400px;
  @media only screen and (max-width: 720px) {
    width: 100%;
    max-height: 400px;
  }
`;

const PostContent = styled.div`
  /* background-color: aqua; */
  box-sizing: border-box;
  padding-inline: 20px 10px;
  padding-right: 50px;
  width: 50%;
  max-height: 70%;
  @media only screen and (max-width: 720px) {
    width: 100%;
    height: 80%;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-right: 20px;
  border: 2px solid #bcd7ff;
`;

const Item2 = styled.div`
  grid-area: b;
  margin-top: 20px;
  width: 100%;
  max-width: 1240px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StTextarea = styled.textarea`
  font-family: 'Noto Sans KR', sans-serif;
  width: 90%;
  height: 200px;
  border: transparent;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  :focus {
    outline: none;
    border-color: #18a0fb;
    box-shadow: 0 0 5px #18a0fb;
  }
`;

const StButton = styled.button`
  width: 200px;
  min-height: 45px;
  color: white;
  border: transparent;
  border-radius: 6px;
  background-color: #1a399c;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 15px;
  cursor: pointer;
  :hover {
    filter: brightness(90%);
    box-shadow: 1px 1px 3px 0 #bcd7ff;
  }
`;
