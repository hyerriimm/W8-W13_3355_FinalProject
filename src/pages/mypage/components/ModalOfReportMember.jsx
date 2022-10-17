import React from "react";
import "../../../assets/css/modal.css";
import styled from "styled-components";


const ModalOfReportMember = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { header, isReportMode, setIsReportMode, setContent, ReportMemberBtn } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={isReportMode ? "openModal modal" : "modal"}>
      {isReportMode ? (
        <section>
          <header>
            <Header><span style={{color:'#2196F3'}}>{header}</span>님 신고하기</Header>
            <button className="close" onClick={()=>setIsReportMode(false)}>
              &times;
            </button>
          </header>
          <main>
            <Item1>
            <div>신고 사유</div>
            <textarea
              className="content"
              onChange={(e)=> setContent({content:e.target.value})}
              placeholder="신고 사유를 작성해주세요. (250자 이내)"
              maxLength="250"
            />
            </Item1>
          </main>
          <footer>
            <StDiv>
              <button onClick={()=>setIsReportMode(false)}>취소하기</button>
              <button
                onClick={ReportMemberBtn}
                style={{ backgroundColor: "#2196F3" }}
              >
                신고하기
              </button>
            </StDiv>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ModalOfReportMember;

const Header = styled.div`
    font-size: 13px;
    font-weight: bold;
`;

const Item1 = styled.div`
  div {
    font-size: 12px;
    font-weight: bold;
    /* margin-top: 15px; */
    margin-bottom: 5px;
  }
  textarea {
    font-family:'Noto Sans KR', sans-serif;
    box-sizing: border-box;
    width: 100%;
    height: 120px;
    font-size: 13px;
    padding-left: 10px;
    padding-top: 7px;
    resize: none;
    :focus {
      outline: none;
      border-color: #18a0fb;
      box-shadow: 0 0 5px #18a0fb;
    }
  }
`;

const StDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 100px;
    height: 35px;
    padding: 6px 12px;
    border-radius: 5px;
    font-size: 13px;
    margin: 0 10px;
    :hover {
      filter: brightness(90%);
      box-shadow: 1px 1px 3px 0 #bcd7ff;
    }
  }
`;
