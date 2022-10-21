import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import styled from 'styled-components';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// import { VscBellDot } from "react-icons/vsc";
import { VscBell } from "react-icons/vsc";
import { BsFillTrashFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";


const SSE = ({basicSSE, chatSSE}) => {
  // const dispatch = useDispatch();
  const ref = useRef(null);
  const ACCESSTOKEN = localStorage.getItem('ACCESSTOKEN');
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const [alertOpen, setAlertOpen] = useState(false);
  const [getList, setGetList] = useState([]);
  const [getCount, setGetCount] = useState(0); // 안 읽은 숫자
  const [getChatList, setGetChatList] = useState([]);
  const [isNewChatStatus, setIsNewChatStatus] = useState(false);

  // 새로운 채팅 있는지 없는지 확인----------------------------------------------
const IsNewChat = async() => {
  await axios.get(`${process.env.REACT_APP_HOST_PORT}/notifications/chat`, {
    headers: {
      authorization: localStorage.getItem("ACCESSTOKEN"),
      refreshtoken: localStorage.getItem("REFRESHTOKEN"),
    },
  }).then((res)=>{
    console.log(res.data.unreadMessage);
    if (res.data.unreadMessage === true) {
      setIsNewChatStatus(true);
    } else {
      setIsNewChatStatus(false);
    }
  }).catch((error)=>{});
};

// 종알림 누를때마다 알림list, 안 읽은 숫자 가져오기-------------------------------
const GetList = useCallback(async() => {
  await axios.get(`${process.env.REACT_APP_HOST_PORT}/notifications`, {
    headers: {
      authorization: localStorage.getItem("ACCESSTOKEN"),
      refreshtoken: localStorage.getItem("REFRESHTOKEN"),
    },
  }).then((res)=>{
    if (res.data) {
      setGetList(res.data);
    } else {
      setGetList([]);
    }
  }).catch((error)=>{});
},[]);

const GetCount = useCallback(async() => {
  await axios.get(`${process.env.REACT_APP_HOST_PORT}/notifications/count`, {
    headers: {
      authorization: localStorage.getItem("ACCESSTOKEN"),
      refreshtoken: localStorage.getItem("REFRESHTOKEN"),
    },
  }).then((res)=>{
    setGetCount(res.data.count);
    if (res.data.count) {
      setGetCount(res.data.count);
    } else {
      setGetCount(0);
    }
  }).catch((error)=>{});
},[]);

  useEffect(() => {
    if (ACCESSTOKEN) {
      GetList();
      GetCount();
      IsNewChat();
    }
  }, [alertOpen, ACCESSTOKEN]);
// -----------------------------------------------------------------------------


// SSE 연결, message받기---------------------------------------------------------
  useEffect(() => {
    if (ACCESSTOKEN) {
      let eventSource;
      const fetchSse = async () => {
        try {
          eventSource = new EventSource(
            `${process.env.REACT_APP_HOST_PORT}/subscribe`,
            {
              headers: {
                Authorization: localStorage.getItem('ACCESSTOKEN'),
                RefreshToken: localStorage.getItem('REFRESHTOKEN'),
              },
              heartbeatTimeout: 1000*60*30, //30분 (변경사항 없을 때 끊고 재연결 하는 시간)
            }
          );

          /*--------------- EVENTSOURCE ONOPEN --------------- */
          // eventSource.addEventListener('open', async (e) => {
          //   if (e) {
          //     console.log('EVENTSOURCE ONOPEN')
          //   }
          // });

          /*--------------- EVENTSOURCE ONMESSAGE --------------- */
          eventSource.addEventListener('message', async (e) => {
            if (e.type === 'message' && e.data.startsWith('{')) {
              const data = await JSON.parse(e.data);
              // console.log(data);
              if (data.id !== null && data.notificationType !== 'CHAT') {
                setGetList((prev) => [data, ...prev]);
                setGetCount((prev) => prev+1);
              } 
              if (data.id !== null && data.notificationType === 'CHAT') {
                setGetChatList((prev) => [data, ...prev]);
              } 
            }
          });

          /*--------------- EVENTSOURCE ONERROR --------------- */
          eventSource.addEventListener('error', async (e) => {
            if (e) {
              // console.log('EVENTSOURCE ONERROR')
              eventSource.close();
            }
          });
        } catch (error) {}
      };
      fetchSse();
      return () => {
        // console.log('CLOSE; 페이지 이동')
        eventSource.close();
      }
    }
  }, [ACCESSTOKEN]);
// -----------------------------------------------------------------------------


// 종 눌러서 알림창 on/off
  const openAlert = () => {
    setAlertOpen((prev) => !prev);
  };

// 종 바깥 눌러서 알림창 off
  const clickOutSide = (e) => {
    if (alertOpen && !ref.current.contains(e.target)) {
      setAlertOpen(false);
    }
  };

  useEffect(() => {
    if (alertOpen) document.addEventListener('mousedown', clickOutSide);
    return () => {
      document.removeEventListener('mousedown', clickOutSide);
    };
  });


//----------------------------알림 1개 지우기----------------------------
  const DeleteOneNoti = async(id, status) => {
    await axios.delete(`${process.env.REACT_APP_HOST_PORT}/notifications/delete/${id}`, {
      headers: {
        authorization: localStorage.getItem("ACCESSTOKEN"),
        refreshtoken: localStorage.getItem("REFRESHTOKEN"),
      },
    }).then((res)=>{
      if (res.data.success === false) alert(res.data.error.message);
      else {
        // alert(res.data.msg);
        setGetList(getList.filter((a, idx) => a.id !== id)); //알림내역에서 id가 일치하지 않는 것들만 다시 담기(=일치하는 거 빼기)
        if (getCount && status === false) {
          setGetCount((prev)=> prev-1);
          return;
        }
        if (!getCount) {
          setGetCount(0);
          return;
        }
      };
    }).catch((error)=>{});

    // chatApi
    // .notificationDelete(id)
    // .then((res) => {})
    // .catch((err) => {});
  };

// 알림 1개 지우는 함수 
  const messageDelete = async (id, status) => {
    DeleteOneNoti(id, status);
  };
//-----------------------------------------------------------------------


//----------------------------알림 모두 지우기----------------------------
  const DeleteAllNoti = async() => {
    await axios.delete(`${process.env.REACT_APP_HOST_PORT}/notifications/delete`, {
      headers: {
        authorization: localStorage.getItem("ACCESSTOKEN"),
        refreshtoken: localStorage.getItem("REFRESHTOKEN"),
      },
    }).then((res)=>{
      if (res.data.success === false) alert(res.data.error.message);
      else {
        setGetList([]); //알림내역에서 id가 일치하지 않는 것들만 다시 담기(=일치하는 거 빼기)
        setGetCount(0);
      };
    }).catch((error)=>{});
  };

// 모든 알림 지우는 함수
  const messageAllDelete = async () => {
    DeleteAllNoti();
  };
//-----------------------------------------------------------------------


//--------------------------------알림 읽기-------------------------------
const ReadNoti = async(id, url) => {
  await axios.post(`${process.env.REACT_APP_HOST_PORT}/notification/read/${id}`, {id: id}, {
    headers: {
      authorization: localStorage.getItem("ACCESSTOKEN"),
      refreshtoken: localStorage.getItem("REFRESHTOKEN"),
    },
  }).then((res)=>{
    if (res.status === 200) {
      window.location.href = url;
    };
  }).catch((error)=>{});
};

//  알림 눌러서 읽음처리 및 알림으로 온 댓글 or 지원확인 or 지원결과(마이페이지) 로 이동
  const messageRead = async (id, url,status) => {
      ReadNoti(id, url);
  };
//-----------------------------------------------------------------------



  return (
    <>
    {basicSSE? (
      <Wrap ref={ref}>
        {getList?.length === 0 ||  getCount == 0 ? (
          <BellDiv>
            <VscBell onClick={openAlert} size='25px'/>
          </BellDiv>
        ) : (
          <BellDiv>
            <RedCountBtn>{getCount}</RedCountBtn>
            <VscBell onClick={openAlert}  size='25px' style={{color:'red'}}/>
          </BellDiv>
        )}

        {alertOpen && (
          <AlertContent>
            <h4>알림</h4>
            {getList?.length === 0 ? (
              <p>새로운 알림이 없습니다.</p>
            ) : (
              <>
                <AllDelete onClick={messageAllDelete}> 
                  <BsFillTrashFill />
                  {/* <span>전체삭제</span> */}
                </AllDelete>

                {getList?.map((list) => {
                  return (
                    <React.Fragment key={uuidv4()}>
                      <ListWrap>
                        <List
                          status={list.status}
                          onClick={() => {
                            messageRead(list.id, list.url, list.status);
                          }}
                        >
                          {list.notificationContent}
                        </List>
                        <span
                        // style={{display:'flex', alignItems:'center', justifyContent:'center'}}
                          onClick={() => {
                            messageDelete(list.id, list.status);
                          }}
                        >
                          <TiDelete size='15px'/>
                        </span>
                      </ListWrap>
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </AlertContent>
        )}
      </Wrap>
    ):(false)}

    {chatSSE? (
      <>
      {/* { getChatList?.length === 0 ? (null) : (<RedLight></RedLight>)} */}
      {/* 이렇게 짜면 안됨 내가 쓴 채팅은 반영하면 안됨 */}
      { isNewChatStatus || getChatList?.length !== 0 ? (<RedLight></RedLight>) : (false)}

      </>
    ):(false)}
    </>
  );
};

export default SSE;

const Wrap = styled.div`
  position: relative;
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const BellDiv = styled.div`
  display: flex;
  align-items: center;
  width: 40px;
  height: 50px;
`;

const RedCountBtn = styled.button`
  background-color: red;
  box-shadow: 0 0 5px 0 red;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 3px;
  right: 0px;
  width: fit-content;
  height: 20px;
  border: none;
  border-radius: 50%;
`;

const RedLight = styled.div`
  background-color: red;
  box-shadow: 0 0 5px 0 red;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  right: 0px;
  width: 15px;
  height: 15px;
  border: none;
  border-radius: 50%;
`;

const AlertContent = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 35px;
  right: -30px;
  border-radius: 8px;
  width: 260px;
  height: 280px;
  padding: 16px;
  /* border: ${(props) => props.theme.border}; */
  /* background-color: ${(props) => props.theme.inputBoxBackground}; */
  box-shadow: 0px 4px 4px 0px rgb(0, 0, 0, 0.1);
  overflow-y: auto;
  h4 {
    display: flex;
    margin: 0 0 10px 0;
  }
  p {
    padding: 10px 0;
  }
  &::-webkit-scrollbar {
    width: 0px;
    height: 9px;
  }
`;

const ListWrap = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;
  span {
    padding-left: 8px;
    cursor: pointer;
  }
`;

const List = styled.div`
font-size: 13px;
  cursor: pointer;
  /* padding-top: 10px; */
  //position:relative;
  color: ${(props) => props.theme.textColor};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: ${(props) => (props.status ? '0.5' : '1')};
`;

const AllDelete = styled.div`
  background-color: ${(props) => props.theme.divBackGroundColor};
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px 5px 5px 5px;
  /* height: 32px; */
  border-radius: 50px;
  border: ${(props) => props.theme.alertBorder};
  cursor: pointer;
  span {
    color: ${(props) => props.theme.removeBtnColor};
    font-size: 0.875rem;
  }
`;