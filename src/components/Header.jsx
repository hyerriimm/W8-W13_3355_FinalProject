import { React, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();
    const [accesstoken,setAccesstoken] = useState(undefined);
    const [profileImg,setProfileImg] = useState(undefined);
    const profile = `${profileImg}` // "https://avatars.dicebear.com/api/adventurer-neutral/:seed.svg"

    const modalRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => {
      setIsOpen(!isOpen)
    };


    useEffect(()=>{
      const timeout = setTimeout(()=>{
        setAccesstoken(localStorage.getItem("ACCESSTOKEN"));
    },1000);
      return ()=>{clearTimeout(timeout);}
    },[window.location.reload, accesstoken, navigate]);

    useEffect(()=>{
      setAccesstoken(localStorage.getItem("ACCESSTOKEN"));
      setProfileImg(localStorage.getItem("ImgURL"));
    });


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
        setProfileImg(localStorage.removeItem("ImgURL"));
        localStorage.removeItem("Id");
        alert('로그아웃 되었습니다.')
        navigate('/')
      } else {
          console.log("로그인 유지");
      }
  };
    
    return (
        <>
        <HdContainer>
            <Logo onClick={()=>navigate('/')}>3355</Logo>
            <BtnWrapper>            
                { accesstoken ? 
                ( <>
                  <AddBtn onClick={()=>navigate('/form')}>모임등록</AddBtn>
                  <BtnProfile 
                  style={{backgroundSize:'cover',backgroundImage:`url(${profile})`, backgroundPosition: 'center'}}
                  ref={modalRef} onClick={handleModal}>
                      {/* <img src={ profile } alt="profile"/> */}
                  </BtnProfile>
                  </>
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
    opacity: 0.94;
    backdrop-filter: blur(60px);
    width: 100%;
    margin: 0 auto;
    height: 55px;
    z-index: 100;
`

const Logo = styled.span`
  padding: 0 0 0 30px;
  text-align: center;
  font-size: 20px;
  letter-spacing: 3.5px;
  font-weight: 800;
  color: #102442;
  cursor: pointer;
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
    height: 30px;
    width: 69px;
    margin: 0 25px 0 0;
    text-align: center;
    border-radius: 4px;
    font-size: 12.5px;
    font-weight: 600;
    border-radius: 4px;
    border: 1px solid #2196F3;
    background-color: #2196F3;
    color: white !important;
    cursor: pointer;
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

      /* img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          object-fit: cover;
      } */
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