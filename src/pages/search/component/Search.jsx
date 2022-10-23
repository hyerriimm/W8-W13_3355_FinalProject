import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { IoSearchSharp } from 'react-icons/io5';
import { IoSearchCircle } from 'react-icons/io5';
import { MdClear } from "react-icons/md";
import { BiHeart } from "react-icons/bi";
import { RiChat3Line } from "react-icons/ri";
import { CgPin } from "react-icons/cg";
import { BiCalendarCheck } from "react-icons/bi";
import ChatFloatingBtn from '../../../components/ChatFloatingBtn';

const Search = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('ALL');
  const [barOpened, setBarOpened] = useState(false);
  const formRef = useRef();
  const inputFocus = useRef();
  const [resList, setResList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  const page = useRef(0);
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 1,
  });

  // console.log('렌더링');

  useEffect(()=> {
    window.scrollTo(0, 0);
    setBarOpened(true);
    // dispatch(__cardlist(page.current));
  }, []);


  // 인피니티 스크롤 기능 (다음페이지 데이터 받아옴)
  const fetch = useCallback(async() => {
    page.current += 1;
    // console.log(page.current);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_PORT}/post/search?page=${page.current}`,
        { keyword: input, category: category },
        {
          headers: {
            authorization: localStorage.getItem('ACCESSTOKEN'),
            refreshtoken: localStorage.getItem('REFRESHTOKEN'),
          },
        }
      );
      if (response.data.success === true) {
        if (page.current === 0) {
          setResList([...response.data.data.postList]);
        } else {
          setResList((list) => [...list, ...response.data.data.postList]);
          if (response.data.data.hasNextPage === true) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          };
        }
      }
      if (response.data.success === false) {
        alert(response.data.error.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (hasNextPage && inView) {
      fetch();
    }
  }, [inView]);


  const onFormSubmit = async (e) => {
    // 폼 제출하면, input 비우고, 서치바 닫고, and do something with input
    e.preventDefault();
    // setInput('');
    // setBarOpened(false);
    // After form submit, do what you want with the input value
    // setPage(0);
    page.current = 0;
    setResList([]);
    // console.log(`input과 함께 폼 제출됨: ${input}, ${category}`);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_PORT}/post/search?page=0`,
        { keyword: input, category: category },
        {
          headers: {
            authorization: localStorage.getItem('ACCESSTOKEN'),
            refreshtoken: localStorage.getItem('REFRESHTOKEN'),
          },
        }
      );
      // console.log(response.data.data);
      if (response.data.success === true) {
        setResList([...response.data.data.postList]);
        setHasNextPage(response.data.data.hasNextPage);
      }
      if (response.data.success === false) {
        alert(response.data.error.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  if (resList.length === 0) {
    return (
      <>
      <Container className='App'>
        <Form
          barOpened={barOpened}
          onClick={() => {
            // When form clicked, set state of baropened to true and focus the input
            setBarOpened(true);
            // inputFocus.current.focus();
          }}
          // on focus open search bar
          onFocus={() => {
            setBarOpened(true);
            // inputFocus.current.focus();
          }}
          // on blur close search bar
          // onBlur={() => {
          //   setBarOpened(false);
          // }}
          // On submit, call the onFormSubmit function
          onSubmit={onFormSubmit}
          ref={formRef}
        >
          <Button type='button' barOpened={barOpened}>
            <IoSearchSharp color='#2196F3' size='25px' />
          </Button>
          <CategoryDiv>
            <CategorySelect
              name='category'
              onChange={(e) => {
                setCategory(e.target.value);
                setInput('');
              }}
            >
              <option value='ALL'>전체</option>
              <option value='EXERCISE'>운동</option>
              <option value='TRAVEL'>여행</option>
              <option value='READING'>독서</option>
              <option value='STUDY'>공부</option>
              <option value='RELIGION'>종교</option>
              <option value='ONLINE'>온라인</option>
              <option value='ETC'>기타</option>
            </CategorySelect>
          </CategoryDiv>
          <Input
            onChange={(e) => setInput(e.target.value)}
            ref={inputFocus}
            value={input}
            barOpened={barOpened}
            placeholder='검색어를 입력하세요.'
          />
          <CleanButton type='button' barOpened={barOpened}
          onClick={()=>setInput('')}
          >
            <MdClear />
          </CleanButton>
        </Form>
      </Container>
      <Stack>
        <div>검색된 내용이 없습니다.</div>
      </Stack>
      <div onClick={() => navigate('/chatlist')}>
        <ChatFloatingBtn />
      </div>
      </>
    );
  }

  return (
    <>
      <Container className='App'>
        <Form
          barOpened={barOpened}
          onClick={() => {
            // When form clicked, set state of baropened to true and focus the input
            setBarOpened(true);
            // inputFocus.current.focus();
          }}
          // on focus open search bar
          onFocus={() => {
            setBarOpened(true);
            // inputFocus.current.focus();
          }}
          // on blur close search bar
          // onBlur={() => {
          //   setBarOpened(false);
          // }}
          // On submit, call the onFormSubmit function
          onSubmit={onFormSubmit}
          ref={formRef}
        >
          <Button type='button' barOpened={barOpened}>
            <IoSearchSharp color='#2196F3' size='25px' />
          </Button>
          <CategoryDiv>
            <CategorySelect
              name='category'
              onChange={(e) => {
                setCategory(e.target.value);
                // setInput('');
              }}
            >
              <option value='ALL'>전체</option>
              <option value='EXERCISE'>운동</option>
              <option value='TRAVEL'>여행</option>
              <option value='READING'>독서</option>
              <option value='STUDY'>공부</option>
              <option value='RELIGION'>종교</option>
              <option value='ONLINE'>온라인</option>
              <option value='ETC'>기타</option>
            </CategorySelect>
          </CategoryDiv>
          <Input
            onChange={(e) => setInput(e.target.value)}
            ref={inputFocus}
            value={input}
            barOpened={barOpened}
            placeholder='검색어를 입력하세요.'
          />
          <CleanButton type='button' barOpened={barOpened}
          onClick={()=>setInput('')}
          >
            <MdClear />
          </CleanButton>
        </Form>
      </Container>

      <Container2>
        <ListContainer>
          {resList
            ? resList?.map((card) => {
                return (
                  <CardWrapper
                  key={uuidv4()}
                  onClick={() => navigate(`/detail/${card.id}`)}
                >
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
                      <RestDay>
                        {card.restDay?.split("일")[0] == 0 ? (
                          <div style={{ color: '#e51e1e' }}>오늘 마감</div>
                        ) : (
                          card.restDay?.split("일")[0] < 0 ? ( 
                            <div style={{ color: '#e51e1e' }}>마감 완료</div> 
                          ):( 
                            <div>마감 D-{card.restDay.split("일")[0]}</div> 
                          )
                        )}
                      </RestDay>
                    </Des2TitleWrapper>
                    <Address>
                      <CgPin style={{ marginRight: "2px" }} />
                      {card.address}
                    </Address>
                    <Dday>
                      <BiCalendarCheck style={{ marginRight: "2px" }} />
                      {card.dday}
                    </Dday>
                  </DescContainer>
                </CardWrapper>
                );
              })
            : false}
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
      </Container2>
    </>
  );
};

export default Search;

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin: 10px auto;
`;

const Form = styled.form`
  /* position: relative; */
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  /* Change width of the form depending if the bar is opened or not */
  width: ${(props) => (props.barOpened ? '30rem' : '15px')};
  /* width: 30rem; */
  /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
  cursor: ${(props) => (props.barOpened ? 'auto' : 'pointer')};
  padding: 10px 10px 10px 0;
  padding-left: ${(props) => (props.barOpened ? '0px' : '13px')};
  height: 15px;
  border-radius: 10rem;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  @media only screen and (max-width: 414px) {
    width: ${(props) => (props.barOpened ? '80vw' : '15px')};
  }
`;

const Button = styled.button`
  line-height: 1;
  pointer-events: ${(props) => (props.barOpened ? 'auto' : 'none')};
  cursor: ${(props) => (props.barOpened ? 'pointer' : 'none')};
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CleanButton = styled.button`
  line-height: 1;
  pointer-events: ${(props) => (props.barOpened ? 'auto' : 'none')};
  cursor: ${(props) => (props.barOpened ? 'pointer' : 'none')};
  font-size: ${(props) => (props.barOpened ? '25px' : '0px')};
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  color: #2196F3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: font-size 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const CategoryDiv = styled.div`
  width: fit-content;
  display: inline-block;
  flex-direction: column;
  width: 100px;
  /* margin-top: 10px; */
z-index: 1;
`;

const CategorySelect = styled.select`
  /* height: 40px; */
  display: inline-block;
  z-index: 200;
  width: 100%;
  border: none;
  outline: none;
  /* border-bottom: 1px solid grey; */
`;

const Input = styled.input`
  display: inline-block;
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${(props) => (props.barOpened ? '1rem' : '0rem')};
  border: none;
  color: black;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  /* &::placeholder {
    color: white;
  } */

  @media only screen and (max-width: 414px) {
    width: 80%;
    margin-left: ${(props) => (props.barOpened ? '10px' : '0rem')};
  }
`;

const Container2 = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* width: 100vw; */
  width: 100%;
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
width: 150px;
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
  font-size: 11px;
  /* background-color: #f0f0f0; */
  /* border-radius: 1px; */
  color: #1e88e5;
  margin: 0 15px 0 0;
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

