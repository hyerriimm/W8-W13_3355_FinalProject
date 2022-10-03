import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from 'axios';
import { signUp, _getUsersName } from "../../../redux/modules/user";

const API_URL = process.env.REACT_APP_HOST_PORT; 

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

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
    {name:"one",level:1,checked:false},
    {name:"two",level:2,checked:false},
    {name:"three",level:2,checked:false},
    {name:"four",level:3,checked:false},
  ]);

  const checkboxHandler= (e)=>{
    if(e.target.name!=="one"){
        setInputs(inputs.map(
            (item)=>item.name===e.target.name
                ?({...item, checked: e.currentTarget.checked})
                :({...item})
        ))
        setClicker(clicker+1)
    }else{
        setInputs(inputs.map(
            (item)=>({...item, checked: e.currentTarget.checked})
        ))
    }
}

    const [clicker,setClicker]=useState(0);
    useEffect(()=>{
        const A = inputs.filter((item)=>item.level>1).length;
        const B = inputs.filter((item)=>item.level>1 && item.checked===true).length
        if(A===B){
            setInputs(inputs.map((item)=>item.name==="one"
                ?({...item,checked: true})
                :({...item})
            ))
        }else{
            setInputs(inputs.map((item)=>item.name==="one"
                ?({...item,checked: false})
                :({...item})
            ))
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
        if (userId.trim() === '' || 
            password.trim() === '' || 
            passwordCheck.trim() === '' ||
            nickname.trim() === ''
            ) {
                return alert('모든 항목을 입력해야 회원가입이 가능합니다.')
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
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('password', password);
        formData.append('passwordCheck', passwordCheck);
        formData.append('nickname', nickname);
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

        <form onSubmit={onSubmitHandler}
        style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <>
                <Input 
                    placeholder='아이디'
                    type="text"
                    name="userId"
                    onChange={(e)=>setUserId(e.target.value)}/>
                    {/* {
                        user.userId && (Idcheck.length === 0
                        ? (regexuserId.test(user.userId)
                        ? <div style={{color:"green", fontSize:"8px"}}>사용가능한 이메일입니다</div>
                        : <div style={{color:"red", fontSize:"8px"}}>이메일을 다시 확인해주세요</div>)
                        : <div style={{color:"red", fontSize:"8px"}}>이미 있는 이메일입니다.</div>)
                    } */}
                <button type='button' onClick={userIdCheckHandler}>중복확인</button>


                <Input  
                    placeholder='비밀번호를 입력하세요'
                    type="password"
                    name="password"
                    onChange={(e)=>setPassword(e.target.value)}/>
                    {
                    password && (regexPassword.test(password)
                    ? <div style={{color:"green", fontSize:"8px"}}>사용가능한 비밀번호 입니다</div>
                    : <div style={{color:"red", fontSize:"8px"}}>영문, 숫자를 포함하여 4~12자리 비밀번호를 입력해주세요</div>
                    // <div style={{color:"red", fontSize:"8px"}}>영문, 숫자, 특수문자를 사용하여 8~16자리 비밀번호를 입력해주세요</div>
                    )
                    }

                <Input  
                    placeholder='비밀번호를 다시 한번 입력하세요'
                    type="password"
                    name="passwordCheck"
                    onChange={(e)=>setPasswordCheck(e.target.value)}/>
                    {
                    passwordCheck && (password !== passwordCheck
                    ? <div style={{color:"red", fontSize:"8px"}}>비밀번호가 일치하지 않습니다</div>
                    : <div style={{color:"green", fontSize:"8px"}}>비밀번호가 일치합니다</div>)
                    }

                <Input  
                    placeholder='닉네임을 입력하세요'
                    type="text"
                    name="nickname"
                    onChange={(e)=>setNickname(e.target.value)}/>
                <button type='button' onClick={nicknameCheckHandler}>중복확인</button>

            <ImgFile
                    src={previewImg}
                    alt="" />
            
                <ImgInput
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    name="imgFile"
                    onChange={onChange}
                    ref={fileInput} />


                <Button
                    type='button'
                    style={{backgroundColor:'#DC781B'}}
                    onClick={() => { fileInput.current.click(); }}>
                        사진등록</Button>
            </>

            <>
            <StTitle>이용약관</StTitle>
            <AgreeBox>
                <input 
                    type="checkbox"
                    name="one"
                    checked={inputs[0].checked} onChange={(e)=>{checkboxHandler(e)}}
                    /> 모두 동의합니다
                    <br/>

                <input 
                    type="checkbox"
                    name="two"
                    onChange={(e)=>{checkboxHandler(e);}} checked={inputs[1].checked}
                    /> 서비스 약관 동의(필수)
                    <br/>

                <input
                    type="checkbox"
                    name="three"
                    onChange={(e)=>{checkboxHandler(e);}} checked={inputs[2].checked}
                    /> 개인정보 수집 및 이용 동의(필수)
                    <br/>

                <input 
                    type="checkbox"
                    name="four"
                    onChange={(e)=>{checkboxHandler(e);}} checked={inputs[3].checked}
                    /> 마케팅 정보 수신 동의(선택)

            </AgreeBox>
            </>

                <Button
                    type='submit'
                    style={{backgroundColor:'#038E00'}}>가입하기</Button>
        </form>

        </Stcontainer>
    </LoginLayout> 
    )
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

const StTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    color: black;
`

const Input = styled.input`
    height: 40px;
    width: 237px;
    padding: 0 10px;
    margin-top: 7px;
    margin-bottom: 7px;
    margin-left: 0px;
    margin-right: 0px;
    border: 1px solid #a1a1a1;
    outline: none;
    :hover {
        filter: brightness(95%);}
`
const ImgFile = styled.img`
    width: 237px;
    height: 237px;
    margin-top: 7px;
    border: 1px solid #a1a1a1;
    border-radius: 100%;
`
const ImgInput = styled.input`
    height: 237px;
    width: 237px;
    padding: 0 10px;
    margin-top: 7px;
    margin-bottom: 7px;
    margin-left: 0px;
    margin-right: 0px;
    border: 1px solid #a1a1a1;
    outline: none;
`

const Button = styled.button`
    height: 40px;
    width: 237px;
    padding: 0 10px;
    margin-top: 20px;
    margin-bottom: 30px;
    margin-left: 0px;
    margin-right: 0px;
    border: transparent;
    border-radius: 5px;
    outline: none;
    color:white;
    cursor: pointer;
    :hover {
        filter: brightness(95%);}
`  

const AgreeBox = styled.div`
    flex-direction: row;
`
