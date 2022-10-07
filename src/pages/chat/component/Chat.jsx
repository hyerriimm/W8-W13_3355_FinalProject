import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { __getChat } from "../../../redux/modules/chat";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { FaArrowCircleUp } from "react-icons/fa";

// 채팅 기능 컴포넌트
const Chat = () => {
  const navigate = useNavigate();
  // 게시물 id로 채팅 룸 아이디 연동
  const { id } = useParams();
  const dispatch = useDispatch();
  // 사용자랑 연결
  const client = useRef({});
  // 이전 채팅내용 불러오기
  const chatList = useSelector((state) => state.chat);
  const {
    isLoading,
    chatRoomTitle,
    currentPage,
    isFirstPage,
    hasNextPage,
    totalPage,
    totalMessage,
  } = useSelector((state) => state.chat);

  console.log(chatRoomTitle);

  // 인피니티스크롤로 다음페이지 채팅내역 불러오기
  const page = useRef(0);
  const [ref, inView] = useInView(); // ref가 화면에 나타나면 inView는 true, 아니면 false를 반환한다.
  const [stateHasNextPage, setHasNextPage] = useState(hasNextPage);

  // 실시간 채팅 쌓이는 state
  const [messages, setMessages] = useState([
    {
      message: "",
      sender: "",
    },
  ]);
  // 타이핑 치는 input과 연동
  const inputRef = useRef("");
  const [ment, setMent] = useState("");
  // 이전 채팅 불러와서 출력할 때 닉네임 비교하여 출력여부 결정하는 용도
  let index = 0;
  // 실시간 채팅 닉네임 비교하여 출력여부 결정하는 용도
  let index2 = 0;

  const scrollRef = useRef(null); //스크롤 하단 고정

  //스크롤 하단 고정
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [chatList.chatList, messages]);

  // 랜더링시 이전 채팅내용 불러오는 함수 및 stomp채팅 연결
  useEffect(() => {
    connect();
    dispatch(__getChat({ id, page: page.current })); //,page:page.current
    return () => disconnect();
  }, []);

  // 인피니티 스크롤 기능 (다음페이지 데이터 받아옴)
  const fetch = useCallback(() => {
    dispatch(__getChat({ id, page: page.current }));
    page.current += 1;
  }, []);
  useEffect(() => {
    // if (chatList.chatlist?.length < 10 ) {
    //   return
    // }
    if (inView && hasNextPage) {
      fetch();
    }
    // if (inView && Number(currentPage) <= Number(totalPage) ) {
    //   fetch();
    // }
  }, [inView]);

  // 웹소켓 서버와 연결
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `ws://${process.env.REACT_APP_CHAT_HOST}/ws-stomp/websocket`,
      connectHeaders: {
        Authorization: localStorage.getItem("ACCESSTOKEN"),
        RefreshToken: localStorage.getItem("REFRESHTOKEN"),
      },
      debug: function (str) {
        // console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        //구독요청
        // 구독을 통한 채팅방 연결
        // 처음 입장시 채팅방 서버에 입장한 것으로 인식
        subscribe();
        client.current.publish({
          destination: "/pub/chat/enter",
          headers: {
            Authorization: localStorage.getItem("ACCESSTOKEN"),
            RefreshToken: localStorage.getItem("REFRESHTOKEN"),
          },
          //전송할 데이터를 입력
          body: JSON.stringify({
            // type: 0,
            // message: "OOO님이 입장하셨습니다",
            message: "",
            roomId: id,
          }),
        });
      },
    });
    client.current.activate();
  };

  // sockJS로 소켓 미지원 브라우저 대응하기
  if (typeof WebSocket !== "function") {
    client.webSocketFactory = () => {
      return new SockJS(process.env.REACT_APP_CHAT_HOST);
    };
  }

  // 구독하기
  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room/${id}`, function (chat) {
      let content = JSON.parse(chat.body);
      console.log(content);
      setMessages((_messages) => [
        ..._messages,
        { message: content.message, sender: content.sender, img: content.img },
      ]);
    });
  };

  // 메세지 보내는 함수
  const submit = () => {
    console.log(
      JSON.stringify({
        // 타입 1 = 메세지 보내기
        // type: 1,
        message: inputRef.current.value,
        roomId: id,
      })
    );
    // 값이 없으면 전달 x
    if (inputRef.current.value === "") {
      return;
    }
    // 메세지 보내는 동작
    client.current.publish({
      destination: `/pub/chat/message`,
      headers: {
        Authorization: localStorage.getItem("ACCESSTOKEN"),
        RefreshToken: localStorage.getItem("REFRESHTOKEN"),
      },
      //전송할 데이터를 입력
      body: JSON.stringify({
        // type: 1,
        message: inputRef.current.value,
        roomId: Number(id),
      }),
    });
    // 보내고나서 채팅 입력 초기화
    setMent("");
  };

  // 에러처리를 담당하는 함수
  client.current.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  //연결 중단
  const disconnect = () => {
    //퇴장메시징(type1)
    client.current.publish({
      destination: "/pub/chat/message",
      headers: {
        Authorization: localStorage.getItem("ACCESSTOKEN"),
        RefreshToken: localStorage.getItem("REFRESHTOKEN"),
      },
      //전송할 데이터를 입력
      body: JSON.stringify({
        // type: 1,
        roomId: Number(id),
      }),
    });
    //구독해제
    client.current.unsubscribe();
    //웹소켓 비활성화
    client.current.deactivate();
  };

  // 엔터로 채팅하기
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  console.log(chatList);
  // console.log(messages);

  if (isLoading) {
    return (
      <Loading>
        <img
          alt="로딩중"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
        />
      </Loading>
    );
  }

  return (
    <>
      <StDiv>
        <img
          alt="뒤로가기"
          src={process.env.PUBLIC_URL + "/img/backspace.png"}
          style={{ width: "25px", height: "25px", marginRight: "10px" }}
          onClick={() => navigate(-1)}
        />
        <h3>{chatRoomTitle}</h3>
      </StDiv>
      <div
        style={{
          margin: "2%",
          border: "1px solid black",
          overflow: "scroll",
          height: "80vh",
        }}
      >
        {/* 인피니티 스크롤 인식 ref */}
        <div
          ref={ref}
          style={{ width: "10px", height: "10px", backgroundColor: "red" }}
        />
        {/* 이전 채팅내용 불러오기 */}
        {chatList?.chatList?.map((chat, i) => {
          if (chat.message === null) {
            return;
          } else {
            if (chat.sender === localStorage.getItem("Id")) {
              if (
                i > 0 &&
                chatList?.data[i]?.sender === chatList?.data[index]?.sender
              ) {
                index = i;
                return (
                  <div key={i}>
                    <ChatMessage
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <MyChat>{chat.message}</MyChat>
                    </ChatMessage>
                  </div>
                );
              } else {
                index = i;
                return (
                  <div key={i}>
                    {/* <ChatMessage>
                    <MyNick>{chat.sender}</MyNick>
                  </ChatMessage> */}
                    <ChatMessage
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <MyChat>{chat.message}</MyChat>
                    </ChatMessage>
                  </div>
                );
              }
            } else {
              if (
                i > 0 &&
                chatList?.data[i]?.sender === chatList?.data[index]?.sender
              ) {
                index = i;
                return (
                  <div key={i}>
                    <ChatMessage>
                      <Chatting>{chat.message}</Chatting>
                    </ChatMessage>
                  </div>
                );
              } else {
                index = i;
                return (
                  <div key={i}>
                    <ChatMessage>
                      <ProfileImg
                        style={{
                          backgroundSize: "cover",
                          backgroundImage: `url(${chat.img})`,
                          backgroundPosition: "center",
                        }}
                      ></ProfileImg>
                      <NickName>{chat.sender}</NickName>
                    </ChatMessage>
                    <ChatMessage>
                      <Chatting>{chat.message}</Chatting>
                    </ChatMessage>
                  </div>
                );
              }
            }
          }
        })}
        {/* 실시간 채팅 불러오기 */}
        {messages.map((msg, i) => {
          if (msg.sender === "알림") {
            return (
              <div key={i}>
                <p>{msg.message}</p>
              </div>
            );
          } else if (msg.sender === "") {
            return;
          } else {
            if (msg.sender === localStorage.getItem("Id")) {
              if (i > 0 && messages[i]?.sender === messages[index2]?.sender) {
                index2 = i;
                return (
                  <div key={i}>
                    <ChatMessage
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <MyChat>{msg.message}</MyChat>
                    </ChatMessage>
                  </div>
                );
              } else {
                index2 = i;
                return (
                  <div key={i}>
                    {/* <ChatMessage>
                      <MyNick>{msg.sender}</MyNick>
                    </ChatMessage> */}
                    <ChatMessage
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <MyChat>{msg.message}</MyChat>
                    </ChatMessage>
                  </div>
                );
              }
            } else {
              if (i > 0 && messages[i]?.sender === messages[index2]?.sender) {
                index2 = i;
                return (
                  <div key={i}>
                    <ChatMessage>
                      <Chatting>{msg.message}</Chatting>
                    </ChatMessage>
                  </div>
                );
              } else {
                index2 = i;
                return (
                  <div key={i}>
                    <ChatMessage>
                      <NickName>{msg.sender}</NickName>
                    </ChatMessage>
                    <ChatMessage>
                      <Chatting>{msg.message}</Chatting>
                    </ChatMessage>
                  </div>
                );
              }
            }
          }
        })}
        <div ref={scrollRef} />
      </div>
      <StInputDiv>
        <input
          ref={inputRef}
          onKeyPress={handleKeyPress}
          value={ment}
          onChange={(e) => {
            setMent(e.target.value);
          }}
        />
        <div
          onClick={() => {
            submit();
          }}
        >
          <FaArrowCircleUp
            style={{
              color: "grey",
              display: "flex",
              justifyContent: "center",
              fontSize: "30px",
            }}
          />
        </div>
      </StInputDiv>
      {/* 스크롤 하단 고정 */}
    </>
  );
};
export default Chat;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
`;

const StDiv = styled.div`
  display: flex;
  width: 85vw;
  min-width: 320px;
  max-width: 640px;
  justify-content: flex-start;
  align-items: center;
  /* margin: 0 auto; */
  margin: 2%;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const ChatMessage = styled.div`
  background-color: white;
  display: flex;
`;
const MyNick = styled.p`
  margin: 10px 0 3px 0;
  background-color: white;
  margin-right: 10px;
  text-align: right;
`;
const MyChat = styled.p`
  margin: 3px 0;
  background-color: #18a0fb;
  color: white;
  text-align: right;
  width: fit-content;
  max-width: 50%;
  padding: 10px;
  border-radius: 10px;
`;

const ProfileImg = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 2.5px solid #42a5f5;
`;

const NickName = styled.p`
  background-color: white;
  margin: 10px 0 10px 10px;
`;

const Chatting = styled.p`
  margin: 3px 0;
  background-color: #ddd;
  width: fit-content;
  max-width: 50%;
  padding: 10px;
  border-radius: 10px;
  margin-left: 40px;
`;

const StInputDiv = styled.div`
  position: fixed; //포인트!
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 63px;
  bottom: 40px; //위치
  /* left: 40px; //위치 */
  width: 100vw;
  height: 30px;
  input {
    width: 80%;
    height: 100%;
    outline: none;
    margin-right: 10px;
    border: 1px solid grey;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.5);
    padding-left: 10px;
  }
  button {
    background-color: black;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    box-sizing: content-box;
  }
  div {
    background-color: white;
    border-radius: 50%;
  }
`;
