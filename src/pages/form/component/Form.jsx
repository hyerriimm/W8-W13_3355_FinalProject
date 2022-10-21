import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { DatePicker, RangeDatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import 'moment/locale/ko';
import MapContainer from './MapContainer';

const API_URL = process.env.REACT_APP_HOST_PORT; 

const Form = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [maxNum, setMaxNum] = useState(""); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dDay, setDday] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [previewImg, setPreviewImg] = useState('');
  const imgFileInputRef = useRef();
  const imgFileUploadBtnRef = useRef();

  const [address, setAddress] = useState("주소를 선택해주세요");
  const [detailAddress, setDetailAddress] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placeUrl, setPlaceUrl] = useState(null);
  const [placeX, setPlaceX] = useState("");
  const [placeY, setPlaceY] = useState("");

  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState(" ");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
  };

  const resetAllStates = () => {
    setCategory('');
    setTitle('');
    setContent('');
    setMaxNum('');
    setStartDate('');
    setEndDate('');
    setDday('');
    setPreviewImg('');
    setImgFile(null);
    setAddress('');
    setDetailAddress('');
    setPlaceName('');
    setPlaceUrl('');
    setPlaceX('');
    setPlaceY('');
    setInputText("");
    setPlace(" ");
  };

  const onChangeImgFileInput = (e) => {
    setImgFile(e.target.files[0]);
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (title.trim() === '' ||
        address.trim() === '' ||
        content.trim() === '' ||
        category.trim() === '' ||
        maxNum.trim() === '' ||
        startDate === null||
        endDate === null ||
        dDay === null
        // imgFile === null
    ) {
      return alert('모든항목을 입력해야 등록 가능합니다.')
    }
    const formData = new FormData();
    formData.append('category', category);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('maxNum', Number(maxNum));
    formData.append('startDate', new Date(+startDate + 3240 * 10000).toISOString().split("T")[0]);
    formData.append('endDate', new Date(+endDate + 3240 * 10000).toISOString().split("T")[0]);
    formData.append('dDay', new Date(+dDay + 3240 * 10000).toISOString().split("T")[0]);
    if (imgFile !== null) {
      formData.append('imgFile', imgFile);
    }
    formData.append('address', address);
    formData.append('detailAddress', detailAddress);
    formData.append('placeName', placeName);
    formData.append('placeUrl', placeUrl);
    formData.append('placeX', placeX);
    formData.append('placeY', placeY);

    try {
      const ACCESSTOKEN = localStorage.getItem('ACCESSTOKEN');
      const REFRESHTOKEN = localStorage.getItem('REFRESHTOKEN');
      const response = await axios.post(`${API_URL}/post`, formData, {
        headers: {
          "Content-Type":"multipart/form-data",
          "Authorization":ACCESSTOKEN,
          "RefreshToken":REFRESHTOKEN,
        }
      });
          
      if (response.data.success === true) {
          alert(response.data.data);
          return navigate('/');
      };
      if (response.data.success === false) {
          alert(response.data.error.message);
          return
      };
  } catch (error) {
      console.log(error);
  }
    navigate('/');
    resetAllStates();
  };


  return (
    <StContainer>
    <Item2>
      <StDiv>
        <BackSpaceImg
          alt='뒤로가기'
          src='img/backspace.png'
          onClick={() => navigate('/')}
        />
        <h3>모임 등록</h3>
      </StDiv>
      <StDiv style={{ flexDirection: 'column', alignItems:'normal' }}>
        <StImg
          src={previewImg? previewImg : 'img/addimage.png'}
          alt='썸네일 사진을 등록해주세요.'
          onClick={() => {
            imgFileUploadBtnRef.current.click();
          }}
        />
        <StInput
          type='file'
          style={{ display: 'none' }}
          accept='image/*'
          name='imgFile'
          onChange={onChangeImgFileInput}
          ref={imgFileInputRef}
        />
        <StButton
          style={{ backgroundColor: '#1E88E5' }}
          type='button'
          ref={imgFileUploadBtnRef}
          onClick={() => {
            imgFileInputRef.current.click();
          }}
        >
          썸네일 사진 등록
        </StButton>
      </StDiv>
      <CategoryDiv>
        <CategorySelect
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>모임 분류를 선택해주세요.</option>
          <option value="exercise">운동</option>
          <option value="travel">여행</option>
          <option value="reading">독서</option>
          <option value="study">공부</option>
          <option value="religion">종교</option>
          <option value="online">온라인</option>
          <option value="etc">기타</option>
        </CategorySelect>
      </CategoryDiv>
      <StDiv>
        <StInput
          required
          name='title'
          maxLength={50}
          placeholder='제목 (50자 이내)'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </StDiv>
      <StDiv>
        <StTextarea
        cols='27'
        rows='10'
          required
          name='content'
          placeholder='내용 (250자 이내)'
          maxLength={250}
          onChange={(e) => setContent(e.target.value)}
        />
      </StDiv>
      <MaxNumDiv>
      <div style={{fontWeight:'bold'}}>모집 인원 (3~5명) </div>
        <MaxNumInput
          required
          name='maxNum'
          type='text'
          placeholder='3~5'
          value={maxNum}
          maxLength={1}
          onChange={(e) =>
            setMaxNum(
              e.target.value.replace(/[^3-5.]/g, '').replace(/(\.*)\./g, '$1')
            )
          }
        />
        <span style={{marginLeft:'10px'}}>명</span>
      </MaxNumDiv>
      <DatePickerDiv>
        <div style={{fontWeight:'bold'}}>모집 기간</div>
        <div style={{marginTop:'10px'}}>
        <RangeDatePicker
            startText='시작'
            endText='끝'
            startPlaceholder=" 모집 시작일"
            endPlaceholder=" 모집 종료일 "
            // locale='ko'
            clear
            // portal
            onChange={(start, end)=>{
              setStartDate(start);
              setEndDate(end);
            }}
          />
        </div>
      </DatePickerDiv>
      <DatePickerDiv>
        <div style={{fontWeight:'bold'}}>모임 날짜</div>
        <div style={{marginTop:'10px'}}>
          <DatePicker
            onChange={(date) => setDday(date.$d)}
            locale='ko'
            showDefaultIcon
            clear
          />
        </div>
      </DatePickerDiv>
      <hr style={{width:'100%', marginTop:'15px'}}/>
        <div style={{fontWeight:'bold'}}>모임 장소</div>
      <AddressDiv>
        <form className="inputForm" onSubmit={handleSubmit}>
          <input
          placeholder='주소 찾기 (키워드, 도로명 주소, 지번 주소 입력 가능)'
          onChange={(e)=>setInputText(e.target.value)}
          value={inputText}
          />
          <button type="submit">검색</button>
          <div style={{fontWeight:'bold', color:'grey', marginBottom:'10px'}}>※ 검색 후 지도의 핀을 눌러 선택해주세요.</div>
        </form>
        <MapContainer 
        searchPlace={place} 
        setAddress={setAddress}
        setPlaceName={setPlaceName}
        setPlaceUrl={setPlaceUrl}
        setPlaceX={setPlaceX}
        setPlaceY={setPlaceY}
        />
        <div style={{marginTop:'10px',color:'#18a0fb'}}><strong>{placeName}</strong></div>
        <div style={{margin:'10px 0',color:'#18a0fb'}}>{address}</div>
      </AddressDiv>
          <DetailAddressInput
            name='detailAddress'
            maxLength={30}
            placeholder='(선택) 상세 주소를 입력해주세요.'
            type='text'
            value={detailAddress || ''}
            onChange={(e) => setDetailAddress(e.target.value)}
          />
      <StButton type='button' style={{ backgroundColor: '#038E00' }}
      onClick={onSubmitHandler}>
        모임 등록하기
      </StButton>
    </Item2>
    </StContainer>
  );
};

export default Form;

const StContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 0 auto;
  grid-template-areas:
    'a b b b c';
`;

const Item2 = styled.div`
  /* background-color: yellow; */
  grid-area: b;
  min-width: 375px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto; 
`;

const BackSpaceImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  border: transparent;
  cursor: pointer;
  :hover {
            filter: brightness(90%);
            box-shadow: 2px 2px 10px 0 #bcd7ff;
  }
`;

const StInput = styled.input`
    box-sizing: border-box;
    min-width: 100%;
    min-height: 40px;
    border: transparent;
    border-bottom: 1px solid grey;
    margin-top: 10px;
    padding-left: 10px;
    :focus {
      outline: none;
      border-color: #18a0fb;
      box-shadow: 0 0 5px #18a0fb;
    }
`

const MaxNumInput = styled.input`
    box-sizing: border-box;
    width: 80px;
    min-height: 40px;
    border: transparent;
    border: 1px solid #ddd;
    font-size: 15px;
    margin-top: 10px;
    padding-left: 10px;
    :focus {
      outline: none;
      border-color: #18a0fb;
      box-shadow: 0 0 5px #18a0fb;
    }
`

const StTextarea = styled.textarea` 
font-family:'Noto Sans KR', sans-serif;
   width: 100%; 
   height: 200px;
   margin-top: 10px;
   padding-left: 10px;
   border: transparent;
   border-bottom: 1px solid grey;
   :focus {
      outline: none;
      border-color: #18a0fb;
      box-shadow: 0 0 5px #18a0fb;
    }
`;

const StImg = styled.img`
min-width: 300px;
max-width: 410px;
/* min-height: 200px; */
`;

const StDiv = styled.div`
  min-width: 100%;
  max-width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const CategoryDiv = styled.div`
display: inline-block;
flex-direction: column;
margin-top: 10px;
`;

const CategorySelect = styled.select`
  height: 40px;
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 1px solid grey;
`;

const MaxNumDiv = styled.div`
display: inline-block;
flex-direction: column;
padding-left: 10px;
margin-top: 10px;
`;

const DatePickerDiv = styled.div`
display: flex;
flex-direction: column;
padding-left: 10px;
margin-top: 10px;
`;

const AddressDiv = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px;
div {
  padding-left: 10px;
}
input {
  box-sizing: border-box;
  border: 1px solid #ddd;
  min-height: 40px;
  padding-left: 10px;
  margin-bottom:10px;
  width:87%;
  height:35px;
  @media only screen and (max-width: 720px) {
  width: 86%;
  }
  :focus {
      outline: none;
      border-color: #18a0fb;
      box-shadow: 0 0 3px #18a0fb;
    }
}
button {
  background-color: #18a0fb;
  margin-left: 10px;
  height: 40px;
  color: white;
  border: transparent;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  :hover {
            filter: brightness(90%);
            box-shadow: 1px 1px 3px 0 #bcd7ff;
  }
}
`;

const DetailAddressInput = styled.input`
    box-sizing: border-box;
    min-width: 100%;
    min-height: 40px;
    /* border: transparent; */
    border: 1px solid #ddd;
    padding-left: 10px;
    :focus {
      outline: none;
      border-color: #18a0fb;
      box-shadow: 0 0 3px #18a0fb;
    }
`;

const StButton = styled.button`
  min-width: 300px;
  min-height: 45px;
  color: white;
  border: transparent;
  border-radius: 6px;
  margin-top: 20px;
  font-size: 15px;
  cursor: pointer;
  :hover {
            filter: brightness(90%);
            box-shadow: 1px 1px 3px 0 #bcd7ff;
  }
`;
