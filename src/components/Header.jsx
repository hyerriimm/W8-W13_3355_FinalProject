import { React, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __getMyInfo } from '../redux/modules/myinfo';
import { IoSearchSharp } from 'react-icons/io5';
import { MdAddCircle } from "react-icons/md";

import SSE from './SSE';

import Logo3355 from '../assets/img/3355logo_simple.png';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ACCESSTOKEN = localStorage.getItem('ACCESSTOKEN');
    const myinfo = useSelector((state)=>state.myinfo.myinfo);

    useEffect(()=>{
      if (ACCESSTOKEN) {
        dispatch(__getMyInfo())
      }
      },[ACCESSTOKEN])

    // console.log(myinfo);

    const [accesstoken,setAccesstoken] = useState(undefined);
    // const [profileImg,setProfileImg] = useState(undefined);
    // const profile = `${profileImg}` // "https://avatars.dicebear.com/api/adventurer-neutral/:seed.svg"

    const modalRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => {
      setIsOpen(!isOpen)
    };


    // useEffect(()=>{
    //   const timeout = setTimeout(()=>{
    //     setAccesstoken(localStorage.getItem("ACCESSTOKEN"));
    // },1000);
    //   return ()=>{clearTimeout(timeout);}
    // },[window.location.reload, accesstoken, navigate]);

    // useEffect(() => {
    //   setAccesstoken(localStorage.getItem("ACCESSTOKEN"));
    //   // setProfileImg(localStorage.getItem("ImgURL"));
    // }, [accesstoken]);
    
    useEffect(() => {
      const onClickOutside = (e) => {
          if (modalRef.current !== null && !modalRef.current.contains(e.target)) {
              setIsOpen(!isOpen);
          }
      };
      if (isOpen) {
          window.addEventListener("click", onClickOutside);
      }
      return () => {
          window.removeEventListener("click", onClickOutside);
      };
    });
    

    const siteLogout = () => {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        setAccesstoken(localStorage.removeItem("ACCESSTOKEN"));
        setAccesstoken(localStorage.removeItem("REFRESHTOKEN"));
        localStorage.removeItem("Role");
        localStorage.removeItem("ImgURL");
        // setProfileImg(localStorage.removeItem("ImgURL"));
        localStorage.removeItem("Id");
        alert('로그아웃 되었습니다.')
        window.location.replace('/')
      } else {
          // console.log("로그인 유지");
      }
  };


    return (
        <>
        <HdContainer>
            <Logo onClick={()=>navigate('/')}>
              <img src={Logo3355} alt=''/>
            </Logo>
            <BtnWrapper>            
                { ACCESSTOKEN ? 
                ( localStorage.getItem("Role") === "ROLE_ADMIN" ?
                  (
                    <>
                    <AddBtn style={{border:'1px solid #1a399c',backgroundColor:'#1a399c'}} onClick={()=>navigate('/admin')}>신고함</AddBtn>
                    <AddBtn onClick={()=>navigate('/search')}
                    style={{display:'flex', alignItems:'center', justifyContent:'center', width:'fit-content'}}
                    >
                      <IoSearchSharp color='white' size='20px' />
                    </AddBtn>
                    <AddBtn onClick={()=>navigate('/form')}><MdAddCircle size='15px' style={{marginRight:'3px'}}/>등록</AddBtn>
                    <BtnProfile 
                    style={{backgroundSize:'cover',backgroundImage:`url(${myinfo?.imgUrl})`, backgroundPosition: 'center'}}
                    ref={modalRef} onClick={handleModal}>
                        {/* <img src={ profile } alt="profile"/> */}
                    </BtnProfile>
                    </>
                  ): (
                    <>
                    <AddBtn onClick={()=>navigate('/search')}
                    style={{display:'flex', alignItems:'center', justifyContent:'center', width:'fit-content'}}
                    >
                      <IoSearchSharp color='white' size='20px' />
                    </AddBtn>
                    <AddBtn onClick={()=>navigate('/form')}><MdAddCircle size='15px' style={{marginRight:'3px'}}/>등록</AddBtn>
                    <SSE basicSSE={true}/>
                    <BtnProfile 
                    style={{backgroundSize:'cover',backgroundImage:`url(${myinfo?.imgUrl})`, backgroundPosition: 'center'}}
                    ref={modalRef} onClick={handleModal}>
                        {/* <img src={ profile } alt="profile"/> */}
                    </BtnProfile>
                    </>
                  )
                )
                :
                ( <><LoginBtn onClick={()=>navigate('/login')}>로그인</LoginBtn></>
                )}
            </BtnWrapper>
        </HdContainer>
        {isOpen === false ? null 
        :
        <Menu>
          <MenuText onClick={()=>navigate('/mypage')}><span className="highlight">마이페이지</span></MenuText>
          <MenuText onClick={siteLogout}>로그아웃</MenuText>
        </Menu>
        }
        </>
    );
};

export default Header;

const HdContainer = styled.div`
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    /* opacity: 0.94; */
    backdrop-filter: blur(60px);
    width: 100%;
    margin: 0 auto;
    height: 70px;
    z-index: 100;
    box-shadow: 0 1px 10px -4px gray;
    @media only screen and (max-width: 767px) {
    height: 55px;
  }
`

const Logo = styled.div`
  padding: 0 0 0 30px;
  text-align: center;
  font-size: 20px;
  letter-spacing: 3.5px;
  font-weight: 800;
  color: #102442;
  cursor: pointer;
  @media only screen and (max-width: 767px) {
    padding: 0 0 0 10px;
    }
  img {
    height: 70px;
    @media only screen and (max-width: 767px) {
      height: 55px;
    }
  }
`
const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
`

// const  = styled.div`
//   margin: 0 30px 0 0;
//   text-align: center;
//   font-size: 14px;
//   font-family: 'NotoSansKR';
//   font-weight: 600;
//   cursor: pointer;
// `

const AddBtn = styled.button`
display: flex;
align-items: center;
justify-content: center;
    height: 30px;
    /* width: 70px; */
    margin: 0 15px 0 0;
    text-align: center;
    border-radius: 4px;
    font-size: 12.5px;
    font-weight: 600;
    border-radius: 4px;
    border: 1px solid #2196F3;
    background-color: #2196F3;
    color: white !important;
    cursor: pointer;
    @media only screen and (max-width: 500px) {
      margin: 0 10px 0 0;
    }
`
const LoginBtn = styled.button`
    height: 30px;
    width: 65px;
    margin: 0 30px 0 0;
    text-align: center;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 4px;
    border: 0.5px solid #2196F3;
    background-color: white;
    color: #1565C0 !important;
    cursor: pointer;
`

const BtnProfile = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin: 0 30px 0 0;
  text-align: center;
  font-size: 14px;
  border: 2.5px solid #42A5F5;
  cursor: pointer;
  :hover {
            filter: brightness(110%);
         }          
  @media only screen and (max-width: 400px) {
    margin: 0 10px 0 0;
  }
`

const ModalBackdrop = styled.div`
    
`

const Menu = styled.div`
    background: #fff;
    border-radius: 8px;
    position: fixed;
    top: 50px;
    right: 25px;
    width: 128px;
    padding: 15px 0 10px 0;
    text-align: center;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    z-index: 1000;
`

const MenuText = styled.div`
    margin: 0 10px 5px 10px;
    padding: 2px;
    font-size: 14px;
    cursor: pointer;
    :hover {
      background-color : #ededed;
    }  

`