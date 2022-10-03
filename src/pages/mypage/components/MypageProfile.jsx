import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __getMyInfo } from '../../../redux/modules/myinfo';
import { fontSize } from '@mui/system';


const MypageProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myinfo = useSelector((state) => state.myinfo.myinfo);

    console.log(myinfo)

    useEffect(() => {
        window.scrollTo(0, 0); // 스크롤 맨 위로
        dispatch(__getMyInfo());
    }, [])


    const profile = `${myinfo.imgUrl}`

    return (
        <>
            <Container>
                <ProfileWrapper>
                    <Profile>
                        <img src={profile} alt="profile" />
                    </Profile>
                    <DescWrapper>
                        <StNickName>{myinfo.nickname}</StNickName>
                        <StId>{myinfo.userId}
                            {myinfo.root == 'normal' ? (
                                <Sttag style={{ fontSize: "10px" }}>일반계정</Sttag>
                            ) : (
                                <ImgKakao
                                    src='img/kakao_login_small.png'
                                    alt='카카오 로그인 버튼'>
                                </ImgKakao>
                            )}
                        </StId>
                    </DescWrapper>
                </ProfileWrapper>
                <EditBtn onClick={() => { navigate('/mypage/infoedit') }}>계정수정</EditBtn>
            </Container>
            <BtnSet>
                <Wish onClick={() => { navigate('/mypage/wish') }}>찜 목록</Wish>
                <Activity onClick={() => { navigate('/mypage/activity') }}>내 활동</Activity>
            </BtnSet>
        </>
    );
}

export default MypageProfile;

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    margin: auto;
    margin-top: 30px;
    /* border: 1px solid black */
`

const ProfileWrapper = styled.div`
    display: flex;
    width: 60vw;
    max-width: 450px;
    /* border: 1px solid black */
`

const Profile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  border: 0.5px solid #ededed;
      img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          object-fit: cover;
      }
`

const DescWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    margin-left: 25px;
    /* border: 1px solid black */

`

const StNickName = styled.div`
    font-size: 16px;
    font-weight: 600;
    font-family: 'NotoSansKR';
    /* border: 1px solid black; */

`

const StId = styled.div`
    display: flex;
    margin-top: 5px;
    font-size: 13px;
    font-family: 'NotoSansKR';  
    /* border: 1px solid black; */
`

const Sttag = styled.button`
    border: transparent;
    border-radius: 2px;
    background-color: #f3f3f3;
    padding: 0 5px;
    margin: 0 5px;
    margin-left: 10px;
    /* margin-right: 10px; */
    font-size: 8px;
    font-weight: 300;
    height: 15px;
`;


const ImgKakao = styled.img`
    height: 15px;
    margin: 0 5px;
    margin-left: 10px;
`;


const EditBtn = styled.button`
    border-radius: 4px;
    height: 26px;
    width: 70px;
    font-size: 12px;
    border: 0px;
    margin: 20px 0 0 0;
    cursor: pointer;
    :hover {
        background-color: #e0e0e0;
         }
`

const BtnSet = styled.div`
    display: flex;
    justify-content: space-evenly;
    height: 38px;
    width: 300px;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    /* border: 0.5px solid lightgray; */
    border-radius: 4px;

`

const Wish = styled.button`
    height: 36px;
    width: 140px;
    margin: auto;
    text-align: center;
    border-radius: 4px;
    font-size: 12px;
    text-decoration: none;
    border-radius: 4px;
    border: 0.5px solid #2196F3;
    background-color: white;
    color: #1565C0 !important;
    cursor: pointer;
    :hover {
        background-color: #2196F3;
        color: white !important;
         }    
`

const Activity = styled.button`
    height: 36px;
    width: 140px;
    margin: auto;
    text-align: center;
    border: 0.5px solid #2196F3;
    background-color: white;
    border-radius: 4px;
    font-size: 12px;
    text-decoration: none; 
    color: #1565C0 !important;
    cursor: pointer;
    :hover {
        background-color: #2196F3;
        color: white !important;
         }
`
