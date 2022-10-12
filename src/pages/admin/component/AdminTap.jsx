import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import {__withdraw, __execute} from '../../../redux/modules/admin'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({postList, commentList, memberList}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <Box sx={{ width: '90%', margin: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="신고된 게시글" {...a11yProps(0)} />
          <Tab label="신고된 댓글" {...a11yProps(1)} />
          <Tab label="신고된 회원" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* 신고된 게시글 */}
      <TabPanel value={value} index={0}>
        <Container>
          <ListContainer>
            {postList?.slice().reverse().map((post) => {
              return (
                <CardWrapper 
                key={uuidv4()}
                onClick={() => { navigate(`/detail/${post.postId}`) }}
                >
                  <ImgNDescDiv>
                    {/* <ImageContainer>
                      <img src={post.postUrl} alt="" />
                    </ImageContainer> */}
                    <DescContainer>
                      <span style={{fontSize:'13px', color:'#2196f3'}}>신고대상&nbsp;</span>
                      <PostId onClick={() => { navigate(`/detail/${post.postId}`) }}>Post No.{post.postId}</PostId>
                      <TitleWrapper>
                        <span style={{fontSize:'13px', color:'#2196f3'}}>신고사유&nbsp;</span>
                        <Title>{post.content}</Title>
                      </TitleWrapper>
                    </DescContainer>
                  </ImgNDescDiv>
                  <BtnWrapper>
                    <WithdrawButton
                      type='button'
                      onClick={()=>{
                          if (window.confirm('해당 게시글에 대한 신고를 반려하시겠습니까?')) {
                              dispatch(__withdraw(Number(post.reportId)))
                        }
                      }}
                    >
                      반려
                    </WithdrawButton>
                    <ExecuteButton
                      type="button"
                      onClick={() => {
                        if (window.confirm("해당 게시글을 제재하시겠습니까?")) {
                          dispatch(__execute(Number(post.reportId)));
                        }
                        return;
                      }}
                    >
                      제재
                    </ExecuteButton>
                  </BtnWrapper>
                </CardWrapper>
              );
            })}
          </ListContainer>
        </Container>
      </TabPanel>

      {/* 신고된 댓글 */}
      <TabPanel value={value} index={1}>
        <Container>
          <ListContainer>
            {commentList?.slice().reverse().map((comment) => {
              return (
                <CardWrapper key={uuidv4()}>
                  {/* onClick={() => { navigate(`/detail/${comment.postId}`) }} */}
                  <ImgNDescDiv>
                    {/* <ImageContainer>
                      <img src={comment.postUrl} alt="" />
                    </ImageContainer> */}
                      <DescContainer>
                      <span style={{fontSize:'13px', color:'#2196f3'}}>신고대상&nbsp;</span>
                        <PostId onClick={() => { navigate(`/detail/${comment.postId}`) }}>Comment No.{comment.commentId}&nbsp; (Post No.{comment.postId})</PostId>
                      <div style={{backgroundColor:'#f3f3f3', borderRadius:'10px', padding:'0 10px'}}>
                          <Circle>
                            <img src={comment.memberUrl} alt="" />
                            <div style={{fontSize:'13px', display:'flex', alignItems:'center'}}>&nbsp;{comment.nickname}</div>
                          </Circle>
                          <Circle>
                            <div style={{fontSize:'13px', display:'flex', alignItems:'center', fontFamily: "NotoSansKR"}}>
                          {comment.reportCommentContent}</div>
                          </Circle>
                      </div>
                          <TitleWrapper>
                            <span style={{fontSize:'13px', color:'#2196f3'}}>신고사유&nbsp;</span>
                            <Title>{comment.content}</Title>
                          </TitleWrapper>
                      </DescContainer>
                    </ImgNDescDiv>
                    <BtnWrapper>
                      <WithdrawButton
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              "해당 댓글에 대한 신고를 반려하시겠습니까?"
                            )
                          ) {
                            dispatch(__withdraw(Number(comment.reportId)));
                          }
                        }}
                      >
                        반려
                      </WithdrawButton>
                      <ExecuteButton
                        type="button"
                        onClick={() => {
                          if (window.confirm("해당 댓글을 제재하시겠습니까?")) {
                            dispatch(__execute(Number(comment.reportId)));
                          }
                          return;
                        }}
                      >
                        제재
                      </ExecuteButton>
                    </BtnWrapper>
                  </CardWrapper>
                );
              })}
          </ListContainer>
        </Container>
      </TabPanel>

      {/* 신고된 회원 */}
      <TabPanel value={value} index={2}>
        <Container>
          <ListContainer>
            {memberList?.slice().reverse().map((member) => {
              return (
                <CardWrapper
                  key={uuidv4()}
                  onClick={() => {navigate(`/someonesmypage/${member.memberId}`);}}>
                  <ImgNDescDiv>
                    {/* <ImageContainer>
                      <img src={member.imgUrl} alt="" />
                    </ImageContainer> */}
                    <DescContainer>
                      <span style={{fontSize:'13px', color:'#2196f3'}}>신고대상&nbsp;</span>
                      <Circle>
                        <img src={member.memberImgUrl} alt="" />
                        <div style={{fontSize:'13px', display:'flex', alignItems:'center'}}>&nbsp;{member.reportNickname}</div>
                      </Circle>
                      <TitleWrapper>
                        <span style={{fontSize:'13px', color:'#2196f3'}}>신고사유&nbsp;</span>
                        <Title>{member.content}</Title>
                      </TitleWrapper>
                    </DescContainer>
                  </ImgNDescDiv>
                  <BtnWrapper>
                    <WithdrawButton
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            "해당 게시글에 대한 신고를 반려하시겠습니까?"
                          )
                        ) {
                          dispatch(__withdraw(Number(member.reportId)));
                        }
                      }}
                    >
                      반려
                    </WithdrawButton>
                    <ExecuteButton
                      type="button"
                      onClick={() => {
                        if (window.confirm("해당 게시글을 제재하시겠습니까?")) {
                          dispatch(__execute(Number(member.reportId)));
                        }
                        return;
                      }}
                    >
                      제재
                    </ExecuteButton>
                  </BtnWrapper>
                </CardWrapper>
              );
            })}
          </ListContainer>
        </Container>
      </TabPanel>
    </Box>
  );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    /* border: 1px solid black; */
`

const ListContainer = styled.div`
    flex-direction: column;
    align-items: center;    

`

const CardWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  border: 0.5px solid #E3F2FD;
  width: 85vw;
  min-width: 320px;
  max-width: 640px;
  border-radius: 4px;
  padding: 5px;
  box-shadow: 0.5px 0.5px 1px 0 #cce0ff;
  margin: 10px;
  cursor: pointer;
  :hover {
            /* filter: brightness(90%); */
            /* box-shadow: 1px 1px 3px 0 #bcd7ff; */
  }
`;

const ImgNDescDiv = styled.div`
display: flex;
width: 100%;
align-items: center;
/* justify-content: flex-start; */
`;

const DescContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-left: 10px;
  /* background-color: #ff9100; */
  /* background-color: antiquewhite; */
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* align-items: center; */
  margin: 13px 0 0 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  margin: 0 5px 0 10px;
`;


const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  /* margin: 0 0 0 10px; */
  font-family: 'NotoSansKR';
`;

const PostId = styled.div`
  font-size: 13px;
  font-weight: 400;
`;

const WithdrawButton = styled.button`
  height: 30px;
  width: 50px;
  padding: 0 10px;
  margin-bottom: 7px;
  margin-right: 5px;
  border: transparent;
  border-radius: 5px;
  outline: none;
  background-color: #bbb;
  color: white;
  cursor: pointer;
  :hover {
    filter: brightness(95%);
  }
`;

const ExecuteButton = styled.button`
  height: 30px;
  width: 50px;
  padding: 0 10px;
  /* margin-bottom: 7px; */
  margin-right: 5px;
  border: transparent;
  border-radius: 5px;
  outline: none;
  background-color: #1a399c;
  color: white;
  cursor: pointer;
  :hover {
    filter: brightness(95%);
  }
`;

const Circle = styled.div`
  display: flex;
  width: 100%;
  margin-top: 7px;
  margin-bottom: 7px;
  img {
    width: 21px;
    height: 21px;
    border: 1px solid gray;
    border-radius: 100%;
  }
`;
