import React from 'react';
import '../../../assets/css/modal.css';
import styled from 'styled-components';

const ModalOfApplyCheck = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, nickname, applicationId, onClickRefuseBtn, onClickAcceptBtn, applicantStatus } = props;

  if (applicantStatus === 'WAIT') {
    return (
      // 모달이 열릴때 openModal 클래스가 생성된다.
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className='close' onClick={close}>
                &times;
              </button>
            </header>
            <main>{props.children}</main>
            <footer>
              <StDiv>
                  <button onClick={()=>{onClickRefuseBtn(nickname,applicationId)}}>
                      거절하기
                  </button>
                  <button onClick={()=>{onClickAcceptBtn(nickname,applicationId)}}
                  style={{backgroundColor:'#2196F3'}}>
                      수락하기
                  </button>
              </StDiv>
              {/* <button className='close' onClick={close}>
                close
              </button> */}
            </footer>
          </section>
        ) : null}
      </div>
    );
  };

  if (applicantStatus === 'DENIED') {
    return (
      // 모달이 열릴때 openModal 클래스가 생성된다.
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className='close' onClick={close}>
                &times;
              </button>
            </header>
            <main>{props.children}</main>
            <footer>
              <button className='close' onClick={close}>
                닫기
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  };

  if (applicantStatus === 'APPROVED') {
    return (
      // 모달이 열릴때 openModal 클래스가 생성된다.
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className='close' onClick={close}>
                &times;
              </button>
            </header>
            <main>{props.children}</main>
            <footer>
              <button className='close' onClick={close}>
                닫기
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  };
};

export default ModalOfApplyCheck;

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
`
