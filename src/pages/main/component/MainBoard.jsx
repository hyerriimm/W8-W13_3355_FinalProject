import { React, useState,useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { __cardlist } from '../../../redux/modules/cardlist';
import ChatFloatingBtn from '../../../components/ChatFloatingBtn';
import { BiHeart } from "react-icons/bi";
import { RiChat3Line } from "react-icons/ri";
import { CgPin } from "react-icons/cg";
import { BiCalendarCheck } from "react-icons/bi";

const MainBoard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cardList, hasNextPage, isLoading, error } = useSelector((state) => state.cardlist);
  // console.log(cardList);
  const page = useRef(0);
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 1,
  });
  const [prevScrollHeight, setPrevScrollHeight] = useState("");


  useEffect(()=> {
    window.scrollTo(0, 0);
    dispatch(__cardlist(page.current));
  }, []);


  // 인피니티 스크롤 기능 (다음페이지 데이터 받아옴)
  const fetch = useCallback(() => {
    page.current += 1;
    dispatch(__cardlist(page.current));
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetch();
    }
  }, [fetch, hasNextPage, inView]);


  // if (isLoading) {
  //   return <Loading>
  //     <img alt='로딩중'
  //   src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921'
  //   />
  //     </Loading>
  // }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (cardList.length === 0) {
    return (
      <Stack>
        <Empty>•••🤔</Empty>
        <div>등록된 게시물이 없습니다.</div>
        <div>모임을 만들어 주세요.</div>
      </Stack>
    );
  }

  return (
    <>
      <Container>
      <ListContainer>
        {cardList.map((card) => {
          return ( 
            <CardWrapper 
            key={uuidv4()} 
            onClick={() => navigate(`/detail/${card.id}`)}>
              <ImageContainer>
                <img src={card.imgUrl} alt=""/>
              </ImageContainer>
              <DescContainer>
                <ProfileWrapper>
                  <div style={{display:'flex', alignItems:'center'}}>                    
                    <ProfileImg 
                    src={ card.authorImgUrl } 
                    alt="profile"
                    />
                    <h4 style={{width:'100%', margin:'0', display:'inline'}}>{card.authorNickname}</h4>
                  </div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{display:'flex', alignItems:'center', marginRight:'8px'}}>
                      <BiHeart size='17px'/>
                      <span style={{marginLeft:'2px'}}>{ card.numOfWish } </span>
                    </div>
                    <div style={{display:'flex', alignItems:'center', marginRight:'15px'}}>
                      <RiChat3Line size='17px'/>                   
                      <span style={{marginLeft:'2px'}}>{ card.numOfComment } </span>
                    </div>
                  </div>
                </ProfileWrapper>
                <TitleWrapper>
                  <Title>{card.title}</Title>
                  <RestDay>
                  {card.restDay.split("일")[0] == 0 ? (
                  <p style={{ color: '#e51e1e'}}>오늘 마감</p>
                  ):(
                    <p>마감 {card.restDay}</p>
                  )}
                  </RestDay>
                </TitleWrapper>
                <Address><CgPin style={{marginRight:'2px'}}/>{card.address}</Address>
                <Dday><BiCalendarCheck style={{marginRight:'2px'}}/>{card.dday}</Dday>
              </DescContainer>
            </CardWrapper>
          );
          })}
      </ListContainer>
          {/* 인피니티 스크롤 인식 ref */}
          <div ref={ref} style={{height:'30px', color:"white"}}>¯\_(ツ)_/¯</div>
      <div onClick={()=>navigate('/chatlist')}>
        <ChatFloatingBtn />
      </div>
      </Container>
    </>
  )
}

export default MainBoard;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  height: 40px;
  /* width: 80%; */
  /* display: flex;
  justify-content: center;
  height: 400px;
  font-size: 30px;
  font-weight: bold;
  color: #bdbdbd; */
`;

const Stack = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  div{
  font-size: 18px;
  font-weight: bold;
  color: #555555;
  }
`;

const Empty = styled.h1`
  font-size: 100px;
`;

const Container = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    /* background-color: antiquewhite; */
    /* border: 1px solid black; */
    
`

const ListContainer = styled.div`
    display: flex;
    /* display: inline-block; */
    /* justify-content: center; */
    flex-wrap: wrap;
    flex-direction: row;
    width: 1110px;
    /* background-color: green; */

  @media only screen and (min-width: 768px) and (max-width: 1129px) {
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     width: 745px;
     /* background-color: #704d1e; */
  }

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`


const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 0.5px solid #E3F2FD; */
  width: 100%;
  /* min-width: 300px; */
  max-width: 340px;
  border-radius: 13px;
  /* padding: 5px; */
  /* box-shadow: 0.5px 0.5px 1px 0 #cce0ff; */
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.09);
  transition: 0.2s ease-in;
  margin: 15px;
  cursor: pointer;
  :hover {
            filter: brightness(80%);
            transform: scale(1.01);
            box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
            /* box-shadow: 1px 1px 3px 0 #bcd7ff; */
  }
`;

const ImageContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  
    img {
        display: flex;
        width: 100%;
        height: 210px ;
        object-fit: cover;
        /* border-radius: 15px; */
        border-top-left-radius: 13px;
        border-top-right-radius: 13px;
    }
`;

const DescContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  /* background-color: antiquewhite; */
  
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 0 15px;
  height: fit-content;
`;

const ProfileImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid #bcd7ff;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0 10px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 0 10px;
  font-family: 'NotoSansKR';
  width: 72%;
  `;

const RestDay = styled.div`
  font-size: 11px;
  /* background-color: #f0f0f0; */
  /* border-radius: 1px; */
  color: #1E88E5;
  margin: 0 15px 0 0
`;

const Address = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 2px 20px;
  display: flex;
  align-items: center;
`;

const Dday = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 20px 20px;
  display: flex;
  align-items: center;
`;