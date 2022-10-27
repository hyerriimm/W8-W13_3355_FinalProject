import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { __getChatList } from '../../../redux/modules/chat';

const ChatList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const ChatList = useSelector((state) => state.chat.chatRoomList);
    // console.log(ChatList);

  useEffect(() => {
    dispatch(__getChatList());
  }, []);


    return (
        <>
            <StDiv style={{ justifyContent: 'flex-start' }}>
                <img
                    alt='뒤로가기'
                    src={process.env.PUBLIC_URL + '/img/backspace.png'}
                    style={{ width: '25px', height: '25px', marginRight: '10px' }}
                    onClick={() => navigate("/")}
                />
                <h3>채팅 전체보기</h3>
            </StDiv>
            <Container>
              <ListContainer>
                {!ChatList? (<div>아직 참여중인 모임이 존재하지 않습니다.</div>):(false)}
                {ChatList?.map((chatroom) => {
                  return (
                    <CardWrapper key={chatroom.roomId} onClick={() => { navigate(`/chatlist/${chatroom.roomId}`) }}>
                      {/* <ImageContainer>
                        <img src={chatroom.imgUrl} alt="" />
                      </ImageContainer> */}
                      <DescContainer>
                        <TitleWrapper>
                          <Title>{chatroom.name}</Title>
                          {chatroom.numOfMember === 0 ? 
                          (<Title style={{color: 'grey'}}>{chatroom.numOfMember}</Title>):
                          (<Title style={{color: '#1E88E5'}}>{chatroom.numOfMember}</Title>)}
                          {chatroom.numOfUnread === 0 ? 
                          (false) : 
                          (<RedCountBtn>{chatroom.numOfUnread}</RedCountBtn>)}
                        </TitleWrapper>
                        <Address>{chatroom.address}</Address>
                        <Dday>{chatroom.dday}</Dday>
                        {chatroom.numOfMember-1 <= 0 ? (<Member0Div>아직 대화 상대가 없습니다.</Member0Div>) : (<MemberNumDiv>{chatroom.numOfMember-1}명과 대화 중</MemberNumDiv>)}
                      </DescContainer>
                    </CardWrapper>
                  );
                })}
              </ListContainer>
            </Container>
        </>
    )
};

export default ChatList;

const StDiv = styled.div`
  display: flex;
  width: 80vw;
  min-width: 320px;
  max-width: 640px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 10px;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    /* border: 1px solid black; */
`

const ListContainer = styled.div`
    flex-direction: column;
    align-items: center;    
    /* background-color: yellow; */
`

const CardWrapper = styled.div`
  display: flex;
  border: 2px solid #E3F2FD;
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
  /* background-color: antiquewhite; */
  
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 13px 0 0 0;
  position: relative;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 0 10px;
  font-family: 'NotoSansKR';
  max-width: 75%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RedCountBtn = styled.button`
  background-color: red;
  box-shadow: 0 0 5px 0 red;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  /* top: 10px; */
  right: 10px;
  width: fit-content;
  height: 20px;
  border: none;
  border-radius: 50%;
`;

const Address = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 10px 0 2px 10px;
  font-family: 'NotoSansKR';
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Dday = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 10px 10px;
  font-family: 'NotoSansKR';
`;

const Member0Div = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 10px 10px;
  font-family: 'NotoSansKR';
  color: #FF0000;
`;

const MemberNumDiv = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 10px 10px;
  font-family: 'NotoSansKR';
  color: #1E88E5;
`;