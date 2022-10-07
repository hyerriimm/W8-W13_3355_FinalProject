import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { __wait, __apply } from "../../../redux/modules/gatheringlist";
import { __applycancel } from "../../../redux/modules/application";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import ChatFloatingBtn from '../../../components/ChatFloatingBtn';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const waitlist = useSelector((state) => state.gatheringlist.waitlist);
  const applylist = useSelector((state) => state.gatheringlist.applylist);



  useEffect(() => {
    dispatch(__wait());
  }, []);
  useEffect(() => {
    dispatch(__apply());
  }, []);



  return (
    <>
      <Stcontainer>
        <StDiv style={{ justifyContent: "flex-start" }}>
          <img
            alt="뒤로가기"
            src={`${process.env.PUBLIC_URL}/img/backspace.png`}
            style={{ width: "25px", height: "25px", marginRight: "10px" }}
            onClick={() => navigate("/mypage")}
          />
          <h3>내 활동</h3>
        </StDiv>

        <Box sx={{ width: "90%", margin: "auto" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="내 모임 관리" {...a11yProps(0)} />
              <Tab label="참여 신청 내역 보기" {...a11yProps(1)} />
            </Tabs>
          </Box>

          {/* 내 모임 관리 탭*/}
          <TabPanel value={value} index={0}>
            <Container>
              <ListContainer>
                {waitlist?.map((waitlist, index) => {
                  return (
                    <CardWrapper key={index}>
                      <DescContainer>
                        <TitleWrapper>
                          <Circle>
                            <img src={waitlist.imgUrl} alt="" />
                          </Circle>
                          <Title>
                            <div
                              style={{
                                fontWeight: "600",
                                color: "#2196F3",
                              }}
                            >
                              {waitlist.nickname}
                            </div>{" "}
                            님이
                            <div
                              style={{
                                fontWeight: "600",
                                color: "#2196F3",
                                width: "50px",
                                padding: "0 5px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {waitlist.title}
                            </div>{" "}
                            모임 참여를 신청하였습니다.
                          </Title>
                        </TitleWrapper>
                        <Btn>
                          <CheckButton
                            key={waitlist.postId}
                            onClick={() => {
                              navigate(`/detail/${waitlist.postId}`);
                            }}
                          >
                            신청 확인 하기
                          </CheckButton>
                        </Btn>
                      </DescContainer>
                    </CardWrapper>
                  );
                })}
              </ListContainer>
            </Container>
          </TabPanel>

          {/* 참여 신청 내역 탭*/}
          <TabPanel value={value} index={1}>
            <Container>
              <ListContainer>
                {applylist?.map((applylist) => {
                  return (
                    <CardWrapper key={applylist.postId}>
                      <ImageContainer>
                        <img
                          src={applylist.imgUrl}
                          alt=""
                          key={applylist.postId}
                          onClick={() => {
                            navigate(`/detail/${applylist.postId}`);
                          }}
                        />
                      </ImageContainer>
                      <ItemContainer>
                        {applylist.state === "DENIED" ? (
                          <Div>
                            <DDiv>
                              <div
                                style={{
                                  fontWeight: "600",
                                  color: "#ff0000",
                                  width: "50px",
                                  padding: "0 5px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {applylist.title}
                              </div>
                              모임 신청이
                              <div
                                style={{
                                  color: "#ff0000",
                                  fontWeight: "600",
                                }}
                              >
                                거절
                              </div>
                              되었습니다.
                            </DDiv>
                            <p
                              onClick={() => {
                                navigate(`/`);
                              }}
                              style={{ fontWeight: "600" }}
                            >
                              새로운 모임을 찾아보세요!
                            </p>
                          </Div>
                        ) : applylist.state === "APPROVED" ? (
                          <Div>
                            <DDiv>
                              <div
                                style={{
                                  fontWeight: "600",
                                  color: "#2196F3",
                                  width: "50px",
                                  padding: "0 5px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {applylist.title}
                              </div>
                              모임 신청이
                              <div
                                style={{
                                  color: "#2196F3",
                                  fontWeight: "600",
                                }}
                              >
                                승인
                              </div>
                              되었습니다.
                            </DDiv>
                            <ChatButton
                              key={applylist.postId}
                              onClick={() => {
                                navigate(`/chatlist/${applylist.postId}`);
                              }}
                            >
                              채팅바로가기
                            </ChatButton>
                          </Div>
                        ) : (
                          <Div>
                            <DDiv>
                              <div
                                style={{
                                  fontWeight: "600",
                                  width: "50px",
                                  padding: "0 5px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {applylist.title}
                              </div>
                              모임 신청에
                              <div
                                style={{
                                  fontWeight: "600",
                                }}
                              >
                                신청
                              </div>
                              되었습니다.
                            </DDiv>
                            <ButtonDiv>
                              <ConfirmButton
                                key={applylist.postId}
                                onClick={() => {
                                  navigate(`/detail/${applylist.postId}`);
                                }}
                              >
                                모임확인
                              </ConfirmButton>
                              <Cancelbutton
                                onClick={() => {
                                  if (
                                    window.confirm("지원을 취소하시겠습니까?")
                                  ) {
                                    dispatch(__applycancel(applylist.postId));
                                    navigate("/mypage/activity");
                                  }
                                }}
                              >
                                지원취소
                              </Cancelbutton>
                            </ButtonDiv>
                          </Div>
                        )}
                      </ItemContainer>
                    </CardWrapper>
                  );
                })}
              </ListContainer>
            </Container>
          </TabPanel>
        </Box>
        <div onClick={()=>navigate('/chatlist')}>
          <ChatFloatingBtn />
        </div>
      </Stcontainer>
    </>
  );
}


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
`;

const Stcontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ListContainer = styled.div`
  flex-direction: column;
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  border: 0.5px solid #e3f2fd;
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
`;

const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin-top: 7px;
  font-size: 13px;
  font-family: "NotoSansKR";
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 7px;
  margin-bottom: 7px;
`;

const Title = styled.div`
  font-size: 13px;
  font-family: "NotoSansKR";
  display: flex;
`;

const Circle = styled.div`
  display: flex;
  width: 21px;
  height: 21px;
  margin-right: 7px;
  border-radius: 100%;
  border: 1px solid gray;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const CheckButton = styled.button`
  height: 40px;
  width: 200px;
  padding: 0 10px;
  margin-top: px;
  margin-bottom: 7px;
  margin-right: 5px;
  border: transparent;
  border-radius: 5px;
  outline: none;
  background-color: #2196f3;
  color: white;
  cursor: pointer;
  :hover {
    filter: brightness(95%);
  }
`;

const ConfirmButton = styled.button`
  height: 40px;
  width: 100px;
  padding: 0 10px;
  margin-top: px;
  margin-bottom: 7px;
  margin-right: 5px;
  border: transparent;
  border-radius: 5px;
  outline: none;
  background-color: #2196f3;
  color: white;
  cursor: pointer;
  :hover {
    filter: brightness(95%);
  }
`;

const Cancelbutton = styled.button`
  height: 40px;
  width: 100px;
  padding: 0 10px;
  margin-top: px;
  margin-bottom: 7px;
  margin-right: 5px;
  border: transparent;
  border-radius: 5px;
  outline: none;
  background-color: #d9d9d9;
  color: white;
  cursor: pointer;
  :hover {
    filter: brightness(95%);
  }
`;

const ChatButton = styled.button`
  height: 40px;
  width: 200px;
  padding: 0 10px;
  margin-top: px;
  margin-bottom: 7px;
  margin-right: 5px;
  border: transparent;
  border-radius: 5px;
  outline: none;
  background-color: #2196f3;
  color: white;
  cursor: pointer;
  :hover {
    filter: brightness(95%);
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 15px;
  width: 100%;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;
