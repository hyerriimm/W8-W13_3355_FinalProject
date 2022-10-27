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
            alt="뒤로가기"
            src={`${process.env.PUBLIC_URL}/img/backspace.png`}
            style={{ width: "25px", height: "25px", marginRight: "10px" }}
            onClick={() => navigate(-1)}
          />
          <h3>참여 신청하기</h3>
        </StDiv>

        <Item1>
          <Img src={detail.postImgUrl} alt="" />
          <PostContent>
            <div>
              <TitleDiv>
                <h3>{detail.title}</h3>
              </TitleDiv>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ProfileImg src={detail.memberImgUrl} alt="profile" />
                  <h4 style={{ width: "150px" }}>{detail.authorNickname}</h4>
                </div>
              </div>
              <br />
              <strong>모임 설명</strong>
              <div>{detail.content}</div>
              <br />
              <strong>모집 기간</strong>
              <div>
                {" "}
                {detail.startDate} ~ {detail.endDate}
              </div>
              <br />
              <strong>모집 인원</strong>
              <div>
                {detail.currentNum}/{detail.maxNum}
              </div>
              <br />
              {/* <div><strong>모임 일자: </strong> {detail.dday}</div> */}
              <strong>모임 일자</strong>
              <div>{detail.dday}</div>
              <br />
              <strong>모임 장소</strong>
              <div
                style={{
                  color: "#18A0FB",
                  fontStyle: "oblique",
                  cursor: "pointer",
                  width: "fit-content",
                }}
                onClick={() => window.open(detail.placeUrl, "_blank")}
              >
                {detail.placeName}
              </div>
              <div>
                ( {detail.address}{" "}
                {detail.detailAddress === "undefined"
                  ? false
                  : detail.detailAddress}{" "}
                )
              </div>
            </div>
          </PostContent>
        </Item1>

        <StDiv style={{ flexDirection: "column"}}>
          <h4 style={{ margin: "0 auto" }}>나를 소개해주세요</h4>
          <StTextarea
            cols="27"
            rows="10"
            value={content.content}
            name="content"
            maxLength={250}
            onChange={(e) => setContent({ content: e.target.value })}
            placeholder="나를 소개하는 이야기를 입력해주세요. (250자 이내)"
          />
        </StDiv>

        <BtnsDiv>
          <StButton
            type="button"
            style={{ backgroundColor: "#D9D9D9" }}
            onClick={() => {
              if (
                window.confirm(
                  "입력하신 사항은 저장되지 않습니다.\n지원을 취소하시겠습니까?"
                )
              ) {
                navigate(-1);
                setContent(initialState);
              }
            }}
          >
            이전으로
          </StButton>
          <StButton type="submit" style={{ backgroundColor: "#2196F3" }}>
            확인
          </StButton>
        </BtnsDiv>
      </Item2Form>
    </StContainer>
  );
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
  width: 90%;
  height: 200px;
  margin-top: 10px;
  padding: 10px;
  border: transparent;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  resize: none;
  :focus {
    outline: none;
    border-color: #18a0fb;
    box-shadow: 0 0 5px #18a0fb;
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
  margin-bottom: 30px;
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
    padding: 0 15px;
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