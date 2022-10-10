import React, { useRef, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { __detail } from '../../../redux/modules/detail';

const API_URL = process.env.REACT_APP_HOST_PORT; 

const ApplyForm = () => {
  const navigate = useNavigate();
  const params_id = useParams().id;
  const dispatch = useDispatch();
  
  const { detail } = useSelector((state)=> state.detail);

  const initialState = {
    content: '',
  }
  const [content, setContent] = useState(initialState);

  useEffect(()=>{
    dispatch(__detail(params_id))
  },[])

  const onEditHandler = async (e) => {
    e.preventDefault();
    if (content.content.trim() === '') {
      return alert('내용을 입력해야 지원이 가능합니다.')
    }
    if (window.confirm('모임에 지원하시겠습니까?')) {
      try {
        const response = await axios.post(`${API_URL}/post/application/${detail.id}`, content, {
          headers: {
            authorization: localStorage.getItem("ACCESSTOKEN"),
            refreshtoken: localStorage.getItem("REFRESHTOKEN")
          }
        });
            
        if (response.data.success === true) {
            alert(response.data.data);
            setContent(initialState);
            return navigate(`/detail/${detail.id}`);
        };
        if (response.data.success === false) {
            alert(response.data.error.message);
            return
        };
      } catch (error) {
        console.log(error);
      };
    };
  };

  return (
    <StContainer>
      <Item2Form onSubmit={onEditHandler}>

        <StDiv>
          <img
            alt='뒤로가기'
            src={`${process.env.PUBLIC_URL}/img/backspace.png`}
            style={{ width: '25px', height: '25px', marginRight:'10px' }}
            onClick={() => navigate(-1)}
          />
          <h3>참여 신청하기</h3>
        </StDiv>

        <ApplyTitleDiv>
          <div> 지원할 모임명</div>
          <h4>{detail.title}</h4>
        </ApplyTitleDiv>
        
        <StDiv style={{flexDirection:'column', alignItems:"flex-start"}}>
            <h4 style={{marginLeft:'10px'}}>나를 소개해주세요</h4>
            <StTextarea
              cols='27'
              rows='10'
                value={content.content}
                name='content'
                maxLength={250}
                onChange={(e) => setContent({content: e.target.value})}
                placeholder='나를 소개하는 이야기를 입력해주세요. (250자 이내)' 
            />
        </StDiv>

        <BtnsDiv>
          <StButton
          type='button' 
          style={{backgroundColor:'#D9D9D9'}}
          onClick={() => {
            if (window.confirm('입력하신 사항은 저장되지 않습니다.\n지원을 취소하시겠습니까?')) {
              navigate(-1);
              setContent(initialState);
            }
            }}>
            이전으로
          </StButton>
          <StButton 
          type='submit'
          style={{backgroundColor:'#2196F3'}}>
            확인
          </StButton>
        </BtnsDiv>

      </Item2Form>
    </StContainer>
  )
};

export default ApplyForm

const StContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 0 auto;
  grid-template-areas: 'a';
`;

const Item2Form = styled.form`
  /* background-color: yellow; */
  grid-area: a;
  min-width: 375px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const StDiv = styled.div`
  min-width: 100%;
  max-width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const StTextarea = styled.textarea`
  font-family: "Noto Sans KR", sans-serif;
  width: 100%;
  height: 200px;
  margin-top: 10px;
  padding-left: 10px;
  border: transparent;
  border-bottom: 1px solid grey;
  resize: none;
  :focus {
    outline: none;
    border-color: #18a0fb;
    box-shadow: 0 0 5px #18a0fb;
  }
`;

const ApplyTitleDiv = styled.div`
  max-width: 375px;
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

const BtnsDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StButton = styled.button`
  height: 45px;
  width: 150px;
  margin: 20px 5px 0 5px;
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