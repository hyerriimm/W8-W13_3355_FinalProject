import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiTrash2 } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { RiAlarmWarningFill } from "react-icons/ri";
import MapOfDetail from './MapOfDetail'
import ChatFloatingBtn from '../../../components/ChatFloatingBtn';

import { __detail, __delete, __addWish, __removeWish } from '../../../redux/modules/detail';

const Detail = () => {
  const navigate = useNavigate();
  const params_id = useParams().id;
  const dispatch = useDispatch();
  const { pathname } = useLocation(); // 스크롤을 맨 위로

  const { detail, isLoading } = useSelector((state)=> state.detail);
  const logIn = localStorage.getItem("ACCESSTOKEN");
  const Id = localStorage.getItem("Id");
// console.log(detail);
// console.log(detail_wishPeople);
//   address 주소
//   authorNickname 게시글 작성자 닉네임
//   authorId 게시글 작성자 아이디
//   commentList: [] 게시글 댓글 리스트
//   content 게시글 내용
//   dday 모임 일자
//   endDate 마감 일자
//   id 게시글 id
//   maxNum 모집인원
//   memberImgUrl 작성자 프사
//   postImgUrl 게시글 썸네일
//   restDay 남은 모집 기간
//   startDate 공고일
//   title 게시글 제목
//   currentNum 현재 모집된 인원
//   wishPeople: [] 게시물 찜한 사람들 아이디
//   wish 찜 했는지 아닌지 boolean
//   memeberId 회원 고유 아이디

  // wishBoolean: 찜명단에서 내 아이디과 일치하는 게 있으면 true, 아니면 false
  // const wishBoolean = detail_wishPeople?.includes(Id);
  // console.log("wishBoolean은  ",wishBoolean);
  // console.log("isWish는 ",isWish);
  
  // 찜 기능
  let [isWish, setIsWish] = useState();

  const onClickWishBtn = () => {
    setIsWish(!isWish);
    if (!isWish) {
      dispatch(__addWish(params_id));
    } else {
      dispatch(__removeWish(params_id));
    }
  };
  
  // 게시글 삭제 기능
  const onDeleteBtn = () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      dispatch(__delete(params_id));
      navigate('/');
    }
  };

  // 게시글 신고하러 이동
  const goToReportBtn = () => {
    navigate(
    '/detail/postreport', 
    {state: {
      postId: params_id, 
      title:detail.title, 
      authorNickname: detail.authorNickname, 
      memberImgUrl:detail.memberImgUrl, 
      postImgUrl: detail.postImgUrl, 
      content:detail.content  
    }}
    );
  };


  useEffect(()=>{
    setIsWish(detail.wish);
  },[detail.wish]);
  
  useEffect(()=>{
      window.scrollTo(0, 0); // 스크롤 맨 위로
      dispatch(__detail(params_id));
    },[pathname])

  if (isLoading) {
    return <Loading>
      <img alt='로딩중'
    src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921'
    />
      </Loading>
  }
    
  return (
    <div>
      <EditnDeleteDiv>
        { logIn == null ? false : 
        (Id === detail.authorId ? (
          <>
            <StEditnDeleteBtn
            onClick={()=>navigate(`/detail/${detail.id}/edit`)}
            >
              <FiEdit size='20' color='#fff' />
            </StEditnDeleteBtn>
            <StEditnDeleteBtn
            onClick={onDeleteBtn}
            >
              <FiTrash2 size='20' color='#fff' />
            </StEditnDeleteBtn>
          </>
        ) : ( false ) 
        )}
        </EditnDeleteDiv>
      <Container>
        <Item1>
          <Img
          src={detail.postImgUrl}
          alt=''
          />
          <ContentAndBtns>
            <div>
              <TitleDiv>
                <h3>{detail.title}</h3>
                { logIn == null ? false : 
                (Id === detail.authorId ? ( false ) : 
                (
                  <ReportBtn
                  onClick={goToReportBtn}
                  >
                    <RiAlarmWarningFill size='20' color='#1a399c' />
                  </ReportBtn>
                )   
                )}
              </TitleDiv>
              <div style={{display:'flex', alignItems: 'center', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems: 'center'}}>
                  <ProfileImg 
                  src={ detail.memberImgUrl } 
                  alt="profile"
                  onClick={()=>{
                    if (logIn && Id === detail.authorId) {
                      navigate('/mypage')
                    } else if (logIn && Id !== detail.authorId) {
                      navigate(`/someonesmypage/${detail.memberId}`)
                    } else { return }
                  }}
                  />
                  <h4 
                  style={{width:'150px'}}
                  onClick={()=>{
                    if (logIn && Id === detail.authorId) {
                      navigate('/mypage')
                    } else if (logIn && Id !== detail.authorId) {
                      navigate(`/someonesmypage/${detail.memberId}`)
                    } else { return }
                  }}
                  >{detail.authorNickname}</h4>
                </div>
                <StDiv>
                  {detail.restDay?.split("일")[0] == 0 ? ( 
                    <h4 style={{color:'#e51e1e'}}>오늘 마감</h4>
                  ):(
                    <RestDayBtn disable>마감 {detail.restDay}</RestDayBtn> 
                  )}
                  {logIn == null ? false : 
                    (Id === detail.authorId? false : (
                      !isWish ? (
                        <WishBtn onClick={onClickWishBtn}>🤍</WishBtn>
                      ):(
                        <WishBtn onClick={onClickWishBtn}>💗</WishBtn>
                      )
                  ))}
                </StDiv>
              </div>
              <br/>
              <strong>모임 설명</strong>
              <div>{detail.content}</div>
              <br/>
              <strong>모집 기간</strong>
              <div> {detail.startDate} ~ {detail.endDate}</div>
              <br/>
              <strong>모집 인원</strong> 
              <div>{detail.currentNum}/{detail.maxNum}</div>
              <br/>
              {/* <div><strong>모임 일자: </strong> {detail.dday}</div> */}
              <strong>모임 일자</strong> 
              <div>{detail.dday}</div>
              <br/>
              <strong>모임 장소</strong> 
              <div
               style={{color:'#18A0FB', fontStyle:'oblique', cursor:'pointer', width:'fit-content'}} 
               onClick={()=>window.open(detail.placeUrl, '_blank')}
              >{detail.placeName}</div>
             <div>( {detail.address} {detail.detailAddress === 'undefined' ? false : detail.detailAddress} )</div>
            </div>
            <BtnsDiv>
              { logIn == null ? false : 
              (Id === detail.authorId ? 
                (
                  <StBtn
                  onClick={()=>navigate(`/detail/${detail.id}/check`)}
                  >
                  지원확인
                  </StBtn>
                ):(
                  <StBtn
                  onClick={()=>navigate(`/detail/${detail.id}/apply`)}
                  >
                  참여 신청하기
                  </StBtn>
                )
              )}
            </BtnsDiv>
          </ContentAndBtns>
        </Item1>
        <Item2Map>
          <MapOfDetail 
          placeX={detail.placeX} 
          placeY={detail.placeY} 
          placeName={detail.placeName}
          fullAddress={`${detail.address} ${detail.detailAddress}`}
          placeUrl={detail.placeUrl}
          />
        </Item2Map>
      </Container>
        <div onClick={()=>navigate('/chatlist')}>
          <ChatFloatingBtn />
        </div>
    </div>
  );
};

export default Detail;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
`;

const EditnDeleteDiv = styled.div`
display: flex;
justify-content: flex-end;
max-width: 1240px;
margin: 0 auto 15px auto;
  @media only screen and (max-width: 720px) {
  width: 95%;
  }
`;

const Container = styled.div`
  /* background-color: yellow; */
  /* height: 100vh; */
  height: max-content;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(300px,auto);
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
  /* max-height: 70%;     */
  max-height: 500px;    
  @media only screen and (max-width: 720px) {
    width: 100%;
    max-height: 500px;
  }
`;

const ContentAndBtns = styled.div`
/* background-color: aqua; */
box-sizing: border-box;
  padding-inline: 20px 10px;
  width: 50%;
  max-height: 70%;    
  @media only screen and (max-width: 720px) {
    width: 100%;
    height: 80%;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  /* @media only screen and (max-width: 720px) {
    display: flex;
    flex-direction: column;
  } */
`;

const StDiv = styled.div`
display: flex;
justify-content: flex-end;
/* width: fit-content; */
width: 100%;
/* min-width: 148px; */
  @media only screen and (max-width: 720px) {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    /* min-width: 148px; */
  }
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-right: 20px;
  border: 2px solid #bcd7ff;
`;

const WishBtn = styled.button`
border: transparent;
background: transparent;
font-size: 25px;
cursor: pointer;  
`;

const RestDayBtn = styled.button`
border: transparent;
border-radius: 6px;
background-color: #eee;
padding: 0 10px;
margin: 0 10px;
/* margin-right: 10px; */
font-size: 12px;
height: 35px;
`;

const BtnsDiv = styled.div`
object-fit: contain;
display: flex;
justify-content: space-around;
flex-wrap: wrap;
margin: 10px 0;
`;

const StBtn = styled.button`
object-fit: contain;
  min-width: 30%;
  min-height: 45px;
  color: white;
  background-color: #18A0FB;
  border: transparent;
  border-radius: 6px;
  margin-top: 10px;
  font-size: 15px;
  cursor: pointer;
  :hover {
            filter: brightness(90%);
            box-shadow: 1px 1px 3px 0 #bcd7ff;
  }
`;

const StEditnDeleteBtn = styled.button`
object-fit: contain;
  min-width: 35px;
  min-height: 35px;
  color: white;
  background-color: #ff8a1d;
  border: transparent;
  border-radius: 6px;
  margin-top: 10px;
  margin-right: 10px;
  /* font-size: 15px; */
  cursor: pointer;
  :hover {
            filter: brightness(90%);
            box-shadow: 1px 1px 3px 0 #bcd7ff;
  }
`; 

const ReportBtn = styled.button`
object-fit: contain;
  min-width: 35px;
  min-height: 35px;
  border: transparent;
  background-color: transparent;
  border-radius: 50%;
  margin-top: 10px;
  margin-right: 10px;
  cursor: pointer;
  :hover {
  filter: brightness(110%);
  box-shadow: 1px 1px 3px 0 #bcd7ff;
  background-color: #ff8a1d;
  }
`; 

const Item2Map = styled.div`
  grid-area: b;
  margin-top: 20px;
  width: 100%;
`;
