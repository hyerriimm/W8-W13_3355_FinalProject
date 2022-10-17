import React from "react";
import "../../../assets/css/modal.css";
import styled from "styled-components";

const AgreementModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <StDiv>
              <button onClick={() => {}}>취소</button>
              <button onClick={() => {}} style={{ backgroundColor: "#2196F3" }}>
                동의합니다
              </button>
            </StDiv>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default AgreementModal;



const StDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
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

