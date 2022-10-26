import { React, useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { __cardlist, __donecardlist } from "../../../redux/modules/cardlist";
import ChatFloatingBtn from "../../../components/ChatFloatingBtn";
import { BiHeart } from "react-icons/bi";
import { RiChat3Line } from "react-icons/ri";
import { CgPin } from "react-icons/cg";
import { BiCalendarCheck } from "react-icons/bi";
import Footer from '../../../components/Footer';
import { css } from "styled-components";
import { BiToggleLeft } from "react-icons/bi";

const MainBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cardList, closingOrderList, hasNextPage, isLoading, error } = useSelector((state) => state.cardlist);
  console.log(cardList);
  const page = useRef(0);
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 1,
  });
  const [prevScrollHeight, setPrevScrollHeight] = useState("");

    //토글
    // const [isLatestOrderToggle, setIsLatestOrderToggle] = useState(true);
    let isLatestOrderToggle = useRef(true);
    const clickedToggle = () => {
      if (!isLatestOrderToggle.current){
        dispatch(__cardlist(0));
      } else {
        dispatch(__donecardlist(0));
      }
      // setIsLatestOrderToggle((prev) => !prev);
      if (isLatestOrderToggle.current) {
        isLatestOrderToggle.current = false
      } else {
        isLatestOrderToggle.current = true
      }
      page.current = 0;
    };

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (isLatestOrderToggle){
      dispatch(__cardlist(page.current));
    // } else {
      dispatch(__donecardlist(page.current));
    // }
  }, []);

  // 인피니티 스크롤 기능 (다음페이지 데이터 받아옴)
  const fetch = useCallback(() => {
    page.current += 1;
    if (isLatestOrderToggle.current){
      dispatch(__cardlist(page.current));
    } else {
      dispatch(__donecardlist(page.current));
    }
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
        {/* <Empty>•••🤔</Empty> */}
        <div>•••</div>
        <div>등록된 게시물이 없습니다.</div>
        <div>모임을 만들어 주세요.</div>
      </Stack>
    );
  }

  return (
    <>
      <Container>

        {/* 토글 */}
        <ToggleLeft>
          <ToggleWrap>
            <ToggleBtn onClick={clickedToggle} toggle={isLatestOrderToggle.current}>
              <Toggle>
                <p>마감순</p>
                <p>최신순</p>
              </Toggle>
              <Circle toggle={isLatestOrderToggle.current}>
                <p>{isLatestOrderToggle.current ? "최신순" : "마감순"}</p>
              </Circle>
            </ToggleBtn>
          </ToggleWrap>
        </ToggleLeft>

        <ListContainer>
          {isLatestOrderToggle.current && cardList?.map((card) => {
            return (
              <CardWrapper
                key={uuidv4()}
                onClick={() => navigate(`/detail/${card.id}`)}
              >
                                 {/* 마감된 카드 뿌옇게 처리, 마감완료 띄워주기 */}
                                 {card.restDay?.split("일")[0] < 0 ? <Cover><DoneMent>마감완료</DoneMent></Cover> : false}
                <ImageContainer>
                  <img src={card.imgUrl} alt="" />
                </ImageContainer>
                <DescContainer>
                  <Des1Wrapper>
                    <ProfileDiv>
                      <ProfileImgDiv style={{backgroundImage: `url(${card.authorImgUrl})`}}/>
                      <AuthorNicknameH4>{card.authorNickname}</AuthorNicknameH4>
                    </ProfileDiv>
                    <CountDiv>
                      <CountDiv style={{ marginRight: "8px"}}>
                        <BiHeart size="17px" />
                        <CountNumSpan>{card.numOfWish}{" "}</CountNumSpan>
                      </CountDiv>
                      <CountDiv style={{marginRight: "0px"}}>
                        <RiChat3Line size="17px" />
                        <CountNumSpan>{card.numOfComment}{" "}</CountNumSpan>
                      </CountDiv>
                    </CountDiv>
                  </Des1Wrapper>
                  <Des2TitleWrapper>
                    <Title>{card.title}</Title>
                  </Des2TitleWrapper>
                  <Address>
                    <CgPin style={{ marginRight: "2px" }} />
                    {card.address}
                  </Address>
                  <Dday>
                    <BiCalendarCheck style={{ marginRight: "2px" }} />
                    {card.dday}
                  </Dday>
                  <Category>
                    {card.category === 'EXERCISE'? (<CategoryWrapper>#운동</CategoryWrapper>):(false)}
                    {card.category === 'TRAVEL'? (<CategoryWrapper>#여행</CategoryWrapper>):(false)}
                    {card.category === 'READING'? (<CategoryWrapper>#독서</CategoryWrapper>):(false)}
                    {card.category === 'STUDY'? (<CategoryWrapper>#공부</CategoryWrapper>):(false)}
                    {card.category === 'RELIGION'? (<CategoryWrapper>#종교</CategoryWrapper>):(false)}
                    {card.category === 'ONLINE'? (<CategoryWrapper>#온라인</CategoryWrapper>):(false)}
                    {card.category === 'ETC'? (<CategoryWrapper>#기타</CategoryWrapper>):(false)}
                    <RestDay>
                      {card.restDay?.split("일")[0] == 0 ? (
                        <div style={{ color: '#e51e1e' }}>오늘 마감</div>
                        ) : (
                          card.restDay?.split("일")[0] < 0 ? ( 
                            <div style={{ color: 'grey' }}>마감 완료</div> 
                        ):( 
                          <div>마감 D-{card.restDay.split("일")[0]}</div> 
                        )
                      )}
                    </RestDay>
                  </Category>
                </DescContainer>
              </CardWrapper>
            );
          })}
            {!isLatestOrderToggle.current && closingOrderList?.map((card) => {
            return (
              <CardWrapper
                key={uuidv4()}
                onClick={() => navigate(`/detail/${card.id}`)}
              >
                 {/* 마감된 카드 뿌옇게 처리, 마감완료 띄워주기 */}
                 {card.restDay?.split("일")[0] < 0 ? <Cover><DoneMent>마감완료</DoneMent></Cover> : false}
                <ImageContainer>
                  <img src={card.imgUrl} alt="" />
                </ImageContainer>
                <DescContainer>
                  <Des1Wrapper>
                    <ProfileDiv>
                      <ProfileImgDiv style={{backgroundImage: `url(${card.authorImgUrl})`}}/>
                      <AuthorNicknameH4>{card.authorNickname}</AuthorNicknameH4>
                    </ProfileDiv>
                    <CountDiv>
                      <CountDiv style={{ marginRight: "8px"}}>
                        <BiHeart size="17px" />
                        <CountNumSpan>{card.numOfWish}{" "}</CountNumSpan>
                      </CountDiv>
                      <CountDiv style={{marginRight: "0px"}}>
                        <RiChat3Line size="17px" />
                        <CountNumSpan>{card.numOfComment}{" "}</CountNumSpan>
                      </CountDiv>
                    </CountDiv>
                  </Des1Wrapper>
                  <Des2TitleWrapper>
                    <Title>{card.title}</Title>
                  </Des2TitleWrapper>
                  <Address>
                    <CgPin style={{ marginRight: "2px" }} />
                    {card.address}
                  </Address>
                  <Dday>
                    <BiCalendarCheck style={{ marginRight: "2px" }} />
                    {card.dday}
                  </Dday>
                  <Category>
                    {card.category === 'EXERCISE'? (<CategoryWrapper>#운동</CategoryWrapper>):(false)}
                    {card.category === 'TRAVEL'? (<CategoryWrapper>#여행</CategoryWrapper>):(false)}
                    {card.category === 'READING'? (<CategoryWrapper>#독서</CategoryWrapper>):(false)}
                    {card.category === 'STUDY'? (<CategoryWrapper>#공부</CategoryWrapper>):(false)}
                    {card.category === 'RELIGION'? (<CategoryWrapper>#종교</CategoryWrapper>):(false)}
                    {card.category === 'ONLINE'? (<CategoryWrapper>#온라인</CategoryWrapper>):(false)}
                    {card.category === 'ETC'? (<CategoryWrapper>#기타</CategoryWrapper>):(false)}
                    <RestDay>
                      {card.restDay?.split("일")[0] == 0 ? (
                        <div style={{ color: '#e51e1e' }}>오늘 마감</div>
                        ) : (
                          card.restDay?.split("일")[0] < 0 ? ( 
                            <div style={{ color: 'grey' }}>마감 완료</div> 
                        ):( 
                          <div>마감 D-{card.restDay.split("일")[0]}</div> 
                        )
                      )}
                    </RestDay>
                  </Category>
                </DescContainer>
              </CardWrapper>
            );
          })}
          {/* {isLoading? (
            <Loading>
            <img alt='로딩중'
          src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921'
          />
            </Loading>
          ):(false)} */}
        </ListContainer>
        {/* 인피니티 스크롤 인식 ref */}
        <div ref={ref} style={{ height: "30px", color: "white" }}>
          ¯\_(ツ)_/¯
        </div>
        <div style={{ height: "30px"}}></div>
        {/* <Footer/> */}
        <div onClick={() => navigate("/chatlist")}>
          <ChatFloatingBtn />
        </div>
      </Container>
    </>
  );
};

export default MainBoard;

const Cover = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 13px;
  opacity: 0.5;
`;

const DoneMent = styled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    padding: 10px;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    background-color: rgb(0, 0, 0);
    border-radius: 10px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  height: 100px;
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
  div {
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
  /* width: 100vw; */
  width: 100%;
  /* background-color: antiquewhite; */
  /* border: 1px solid black; */
`;

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
`;

const CardWrapper = styled.div`
position: relative;
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
    height: 210px;
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

const Des1Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 340px;
  padding: 10px 15px 0px 15px;
  /* margin: 0 auto; */
  box-sizing: border-box;
  /* height: fit-content; */
`;

const ProfileDiv = styled.div`
display: flex;
align-items: center;
width: 300px;
height: 40px;
`;

const ProfileImgDiv = styled.div`
  width: 40px;
  height: 30px;
  border-radius: 100%;
  border: 2px solid #bcd7ff;
  background-size: cover;
  background-position: center;
`;

const AuthorNicknameH4 = styled.h4`
width: 100%;
margin-left: 10px;
display: inline-block;
`;

const CountDiv = styled.div`
display: flex;
align-items: center;
`;

const CountNumSpan = styled.span`
margin-left: 2px;
`;

const Des2TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0 10px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 0 10px;
  font-family: "NotoSansKR";
  width: 72%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RestDay = styled.div`
  font-size: 12px;
  /* background-color: #f0f0f0; */
  /* border-radius: 1px; */
  color: #1e88e5;
  /* margin: 0 15px 0 0; */
`;

const Address = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 2px 20px;
  display: flex;
  align-items: center;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Dday = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 10px 20px;
  display: flex;
  align-items: center;
`;

const Category = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 10px 20px;
  display: flex;
  align-items: center;
`;

const CategoryWrapper = styled.div`
display: flex;
margin: 0 15px 0 0;
padding: 5px;
width: fit-content;
height: 20px;
align-items: center;
font-weight: bold;
font-family: "Noto Sans CJK KR";
color: #1e88e5;
background-color: aliceblue;
border-radius: 10px;
`;

const ToggleLeft = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 12px; */
`;

const displyStyle = css`
  display: flex;
  align-items: center;
`;

const ToggleWrap = styled.div`
  ${displyStyle}
  margin-top: 10px;
  margin-bottom: 10px;
  /* background-color: yellow; */
`;

const ToggleBtn = styled.div`
  ${displyStyle}
  position: relative;
  height: 35px;
  border-radius: 30px;
  border: 2px solid #1e88e5;
  cursor: pointer;
  background-color: ${(props) => props.theme.divBackGroundColor};
`;

const Toggle = styled.div`
  ${displyStyle}
  justify-content:space-around;
  & p:first-child {
    /* margin-left: 3px; */
    padding: 0 4px;
  }
  & p:nth-child(2) {
    padding: 0 4px;
  }
  p {
    font-weight: 700;
    color: #1e88e5;
    opacity: 0.5;
    margin-right: 3px;
  }
`;

const Circle = styled.div`
  ${displyStyle}
  flex-direction: center;
  background-color: #1e88e5;
  width: 62px;
  height: 35px;
  border-radius: 50px;
  position: absolute;
  left: -1px;
  transition: all 0.4s ease-in-out;
  ${(props) =>
    props.toggle &&
    css`
      transform: translate(95%, 0);
      transition: all 0.4s ease-in-out;
    `}
  p {
    width: 100%;
    color: white;
    font-weight: 700;
    text-align: center;
  }
`;