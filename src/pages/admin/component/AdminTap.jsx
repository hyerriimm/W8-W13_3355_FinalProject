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
      <TabPanel value={value} index={0}>
        <Container>
          <ListContainer>
            {postList?.map((post) => {
              return (
                <CardWrapper key={uuidv4()}>
                  <ImageContainer>
                    <img src={post.imgUrl} alt="" />
                  </ImageContainer>
                  <DescContainer>
                    <PostId onClick={() => { navigate(`/detail/${post.postId}`) }}>{post.postId}번 게시물</PostId>
                    <TitleWrapper>
                      <Title>{post.content}</Title>
                    </TitleWrapper>
                    <BtnWrapper>
                        <button 
                        type='button'
                        onClick={()=>{
                            if (window.confirm('해당 게시글에 대한 신고를 반려하시겠습니까?')) {
                                dispatch(__withdraw(Number(post.reportId)))
                            }
                        }}
                        >
                        반려
                        </button>
                        <button
                        type='button'
                        onClick={()=>{
                            if (window.confirm('해당 게시글을 제재하시겠습니까?')) {
                                dispatch(__execute(Number(post.reportId)))
                            }
                            return
                        }}
                        >
                        제재
                        </button>
                    </BtnWrapper>
                  </DescContainer>
                </CardWrapper>
              );
            })}
          </ListContainer>
        </Container>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Container>
          <ListContainer>
            {commentList?.map((comment) => {
              return (
                <CardWrapper key={uuidv4()}>
                    {/* onClick={() => { navigate(`/detail/${comment.postId}`) }} */}
                  <ImageContainer>
                    <img src={comment.imgUrl} alt="" />
                  </ImageContainer>
                  <DescContainer>
                    <TitleWrapper>
                      <Title>{comment.content}</Title>
                    </TitleWrapper>
                    <BtnWrapper>
                        <button 
                        type='button'
                        onClick={()=>{
                            if (window.confirm('해당 게시글에 대한 신고를 반려하시겠습니까?')) {
                                dispatch(__withdraw(Number(comment.reportId)))
                            }
                        }}
                        >
                        반려
                        </button>
                        <button
                        type='button'
                        onClick={()=>{
                            if (window.confirm('해당 게시글을 제재하시겠습니까?')) {
                                dispatch(__execute(Number(comment.reportId)))
                            }
                            return
                        }}
                        >
                        제재
                        </button>
                    </BtnWrapper>
                  </DescContainer>
                </CardWrapper>
              );
            })}
          </ListContainer>
        </Container>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Container>
          <ListContainer>
            {memberList?.map((member) => {
              return (
                <CardWrapper key={uuidv4()} onClick={() => { navigate(`/someonesmypage/${member.memberId}`) }}>
                  <ImageContainer>
                    <img src={member.imgUrl} alt="" />
                  </ImageContainer>
                  <DescContainer>
                    <TitleWrapper>
                      <Title>{member.content}</Title>
                    </TitleWrapper>
                    <BtnWrapper>
                        <button 
                        type='button'
                        onClick={()=>{
                            if (window.confirm('해당 게시글에 대한 신고를 반려하시겠습니까?')) {
                                dispatch(__withdraw(Number(member.reportId)))
                            }
                        }}
                        >
                        반려
                        </button>
                        <button
                        type='button'
                        onClick={()=>{
                            if (window.confirm('해당 게시글을 제재하시겠습니까?')) {
                                dispatch(__execute(Number(member.reportId)))
                            }
                            return
                        }}
                        >
                        제재
                        </button>
                    </BtnWrapper>
                  </DescContainer>
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
            filter: brightness(90%);
            /* box-shadow: 1px 1px 3px 0 #bcd7ff; */
  }

`;

const ImageContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  
    img {
        display: flex;
        width: 100px;
        height: 115px;
        object-fit: cover;
        border-radius: 4px;
    }
`;

const DescContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-left: 10px;
  background-color: #ff9100;
  /* background-color: antiquewhite; */
  
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 13px 0 0 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin: 13px 0 0 0;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 0 10px;
  font-family: 'NotoSansKR';
`;

const RestDay = styled.div`
  font-size: 11px;
  /* background-color: #f0f0f0; */
  /* border-radius: 1px; */
  color: #1E88E5;
  margin: 0 15px 0 0
`;

const PostId = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 2px 10px;
`;

const Dday = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 10px 10px;
`;