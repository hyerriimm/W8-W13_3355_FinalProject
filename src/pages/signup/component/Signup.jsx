import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from 'axios';
import { signUp, _getUsersName } from "../../../redux/modules/user";
// import AgreementModal from "./AgreementModal"
import MarketingAgreement from "./MarketingAgreement";
import RequiredAgreement from "./RequiredAgreement";




const API_URL = process.env.REACT_APP_HOST_PORT; 

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [idCheckRes, setIdCheckRes] = useState("");
  const [nickCheckRes, setNickCheckRes] = useState("");


  //이미지
  const [previewImg, setPreviewImg] = useState();
  const [imgFile, setImgFile] = useState(null);
  const fileInput = useRef(null); 
  const onChange = (e) => {
    // if (e.target.files[0]) {
    // setFile(e.target.files[0]);
    // } else { // //업로드 취소할 시
    // setImage(profileImg);
    // return;
    // } //화면에 프로필 사진 표시
    setImgFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
          setPreviewImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const resetAllStates = () => {
    setUserId("");
    setPassword("");
    setPasswordCheck("");
    setNickname("");
    setImgFile(null);
    setPreviewImg("");
    setAge("");
    setGender("");
};

    // //중복확인
    // useEffect(()=>{dispatch(_getUsersName())},[])
    
    // const userIdList = useSelector(state => state.user.userId)
    // const userNicknameList = useSelector(state => state.user.nickname)

    // const Idcheck = userIdList.filter((e)=> e.userId == user.userId)
    // const Nicknamecheck = userIdList.filter((e)=> e.nickname == user.nickname)


    //유효성검사
    const regexuserId =  /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
    // const regexPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const regexPassword = /^(?=.*?[a-zA-z])(?=.*?[0-9]).{4,12}$/;


  //체크박스 전체 선택 및 해제
  const [inputs, setInputs] = useState([
    { name: "allCheck", level: 1, checked: false },
    { name: "ageCheck", level: 2, checked: false },
    { name: "requiredAgreement", level: 2, checked: false },
    { name: "marketingAgreement", level: 3, checked: false },
  ]);

  const checkboxHandler= (e)=>{
    if (e.target.name !== "allCheck") {
      setInputs(
        inputs.map((item) =>
          item.name === e.target.name
            ? { ...item, checked: e.currentTarget.checked }
            : { ...item }
        )
      );
      setClicker(clicker + 1);
    } else {
      setInputs(
        inputs.map((item) => ({ ...item, checked: e.currentTarget.checked }))
      );
    }
}

    const [clicker,setClicker]=useState(0);
    useEffect(()=>{
        const A = inputs.filter((item)=>item.level>1).length;
        const B = inputs.filter((item)=>item.level>1 && item.checked===true).length
        if(A===B){
            setInputs(
              inputs.map((item) =>
                item.name === "allCheck"
                  ? { ...item, checked: true }
                  : { ...item }
              )
            );
        }else{
            setInputs(
              inputs.map((item) =>
                item.name === "allCheck"
                  ? { ...item, checked: false }
                  : { ...item }
              )
            );
        }
    },[clicker])


    const userIdCheckHandler = async() => {
        if (userId.trim() === ''
        ) {
        return alert('아이디를 입력해주세요.')
        }
        try {
            const response = await axios.post(`${API_URL}/member/id`, {idCheck: userId});
                
            if (response.data.success === true) {
                alert(response.data.data);
                setIdCheckRes(response.data.success);
                return
            };
            if (response.data.success === false) {
                alert(response.data.error.message);
                setIdCheckRes(response.data.success);
                return
            };
        } catch (error) {
            console.log(error);
        }
    };

    const nicknameCheckHandler = async() => {
        if (userId.trim() === ''
        ) {
        return alert('닉네임을 입력해주세요.')
        }
        try {
            const response = await axios.post(`${API_URL}/member/nickname`, {nickCheck: nickname});
                
            if (response.data.success === true) {
                alert(response.data.data);
                setNickCheckRes(response.data.success);
                return
            };
            if (response.data.success === false) {
                alert(response.data.error.message);
                setNickCheckRes(response.data.success);
                return
            };
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (
          userId.trim() === "" ||
          password.trim() === "" ||
          passwordCheck.trim() === "" ||
          nickname.trim() === "" ||
          age.trim() === "" ||
          gender.trim() === ""
        ) {
          return alert("모든 항목을 입력해야 회원가입이 가능합니다.");
        };
        if (idCheckRes === "") {
            return alert('아이디 중복검사는 필수입니다.')
        };
        if (nickCheckRes === "") {
            return alert('닉네임 중복검사는 필수입니다.')
        };
        if (idCheckRes === false) {
            alert('이미 존재하는 아이디입니다.\n새로운 아이디를 입력 후 중복검사 바랍니다.');
            return setIdCheckRes("");
        };
        if (nickCheckRes === false) {
            alert('이미 존재하는 닉네임입니다.\n새로운 아이디를 입력 후 중복검사 바랍니다.');
            return setNickCheckRes("");
        };
        if (inputs[1].checked === false || inputs[2].checked === false) {
          alert('필수이용약관에 동의해주세요.');
          return
        };

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('password', password);
        formData.append('passwordCheck', passwordCheck);
        formData.append('nickname', nickname);
        formData.append("age", age);
        formData.append("gender", gender);
        formData.append("ageCheck", inputs[1].checked);
        formData.append("requiredAgreement", inputs[2].checked);
        formData.append("marketingAgreement", inputs[3].checked);
        if (imgFile !== null) {
            formData.append('imgFile', imgFile);
        };

        dispatch(signUp(formData));
        navigate('/login');
        resetAllStates();
    };

  return (
    <LoginLayout>
      <Stcontainer>
        <StTitle>회원가입</StTitle>

        <form
          onSubmit={onSubmitHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <>
            <Item>
              <Input2
                placeholder="아이디"
                type="text"
                name="userId"
                onChange={(e) => setUserId(e.target.value)}
              />

              <OverlapButton type="button" onClick={userIdCheckHandler}>
                중복확인
              </OverlapButton>
            </Item>
            <Input
              placeholder="비밀번호를 입력하세요"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {
              password &&
                (regexPassword.test(password) ? (
                  <div style={{ color: "green", fontSize: "8px" }}>
                    사용가능한 비밀번호 입니다
                  </div>
                ) : (
                  <div style={{ color: "red", fontSize: "8px" }}>
                    영문, 숫자를 포함하여 4~12자리 비밀번호를 입력해주세요
                  </div>
                ))
              // <div style={{color:"red", fontSize:"8px"}}>영문, 숫자, 특수문자를 사용하여 8~16자리 비밀번호를 입력해주세요</div>
            }

            <Input
              placeholder="비밀번호를 다시 한번 입력하세요"
              type="password"
              name="passwordCheck"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            {passwordCheck &&
              (password !== passwordCheck ? (
                <div style={{ color: "red", fontSize: "8px" }}>
                  비밀번호가 일치하지 않습니다
                </div>
              ) : (
                <div style={{ color: "green", fontSize: "8px" }}>
                  비밀번호가 일치합니다
                </div>
              ))}

            <Item>
              <Input2
                placeholder="닉네임을 입력하세요"
                type="text"
                name="nickname"
                onChange={(e) => setNickname(e.target.value)}
              />
              <OverlapButton type="button" onClick={nicknameCheckHandler}>
                중복확인
              </OverlapButton>
            </Item>

            <Input
              placeholder="나이를 입력하세요"
              type="number"
              name="age"
              min={15}
              max={100}
              onChange={(e) => setAge(e.target.value)}
            />

            <select
              name="gender"
              style={{
                height: "40px",
                width: "273px",
                borderRadius: "5px",
                border: "1px solid #a1a1a1",
                padding: "0 10px",
                marginTop: "7px",
              }}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>성별을 선택해주세요</option>
              <option value="male">남자</option>
              <option value="female">여자</option>
            </select>

            <ImgFile src={previewImg} alt="" />
            <ImgInput
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              name="imgFile"
              onChange={onChange}
              ref={fileInput}
            />

            <Button
              type="button"
              style={{ backgroundColor: "#1E88E5" }}
              onClick={() => {
                fileInput.current.click();
              }}
            >
              사진등록
            </Button>
          </>

          <>
            <StTitle>이용약관</StTitle>
            <AgreeBox>
              <input
                type="checkbox"
                name="allCheck"
                checked={inputs[0].checked}
                onChange={(e) => {
                  checkboxHandler(e);
                }}
              />
              모두 동의합니다
              <br />
              <input
                type="checkbox"
                name="ageCheck"
                onChange={(e) => {
                  checkboxHandler(e);
                }}
                checked={inputs[1].checked}
              />
              만 14세 이상입니다<span>(필수)</span>
              <br />
              <input
                type="checkbox"
                name="requiredAgreement"
                onChange={(e) => {
                  checkboxHandler(e);
                }}
                checked={inputs[2].checked}
              />
              이용약관<span>(필수)</span>
              <Agree>
                <RequiredAgreement />
              </Agree>
              <br />
              <input
                type="checkbox"
                name="marketingAgreement"
                onChange={(e) => {
                  checkboxHandler(e);
                }}
                checked={inputs[3].checked}
              />
              마케팅 정보 수신 동의<Color>(선택)</Color>
              <Agree>
                <MarketingAgreement />
              </Agree>
            </AgreeBox>
          </>
          <Button type="submit" style={{ backgroundColor: "#038E00" }}>
            가입하기
          </Button>
        </form>
      </Stcontainer>
    </LoginLayout>
  );
  
  }




export default Signup


const LoginLayout = styled.div`
    background-color: white;
    min-width:375px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Stcontainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    color: black;
`

const Input = styled.input`
  height: 40px;
  width: 250px;
  padding: 0 10px;
  margin-top: 7px;
  margin-bottom: 7px;
  margin-left: 0px;
  margin-right: 0px;
  border: 1px solid #a1a1a1;
  border-radius: 5px;
  outline: none;
  :hover {
    filter: brightness(95%);
  }
`;

const Input2 = styled.input`
    height: 40px;
    width: 170px;
    padding: 0 10px;
    margin-top: 7px;
    margin-bottom: 7px;
    margin-left: 0px;
    margin-right: 0px;
    border-radius: 5px;
    border: 1px solid #a1a1a1;
    outline: none;
    :hover {
        filter: brightness(95%);
    }
`;

const ImgFile = styled.img`
    width: 150px;
    height: 150px;
    margin-top: 7px;
    border: 1px solid #a1a1a1;
    border-radius: 100%;
`
const ImgInput = styled.input`
    height: 150px;
    width: 150px;
    padding: 0 10px;
    margin-top: 7px;
    margin-bottom: 7px;
    margin-left: 0px;
    margin-right: 0px;
    border: 1px solid #a1a1a1;
    outline: none;
`
const OverlapButton = styled.button`
  height: 40px;
  width: 75px;
  padding: 0 10px;
  margin-left: 5px;
  border: transparent;
  border-radius: 5px;
  outline: none;
  color: white;
  background-color: #d9d9d9;
  cursor: pointer;
  :hover {
    filter: brightness(95%);
  }
`;  

const Button = styled.button`
  height: 40px;
  width: 250px;
  padding: 0 10px;
  margin-top: 20px;
  margin-bottom: 30px;
  margin-left: 0px;
  margin-right: 0px;
  border: transparent;
  border-radius: 5px;
  outline: none;
  color: white;
  cursor: pointer;
  :hover {
    filter: brightness(95%);
  }
`;  

const AgreeBox = styled.div`
  flex-direction: row;
  span {
    font-size: 10px;
    color: red;
    font-weight: 600;
  }
`;

const Color = styled.div`
  font-size: 10px;
  font-weight: 600;
  float: right;
  margin-top: 7px;
  margin-right: 70px;
`;

const Agree = styled.div`
  border: 1px solid #a1a1a1;
  width: 250px;
  height: 130px;
  overflow: scroll;
  margin-top: 7px;
  font-size: 10px;
  padding: 0 10px;
`;

