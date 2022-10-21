import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {
  deleteComment,
  updateComment,
} from "../../../../redux/modules/comment";
import ModalComment from "./ModalComment";




const CommentItem = ({ item, getCommentList }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const Id = localStorage.getItem("Id");
  const logIn = localStorage.getItem("ACCESSTOKEN");

  const [isUpdate, setIsUpdate] = useState(false);
  const [comment, setComment] = useState({});




  //등록
  const setUpdate = () => {
    if (!isUpdate) {
      setComment(item.content);
    }
    setIsUpdate(!isUpdate);
  };



  //수정
  const handleUpdate = async (e) => {
    if (e.key === "Enter") {
      if (!comment) {
        alert("댓글을 입력해주세요.");
        return false;
      }

      await dispatch(
        updateComment({
          commentId: item.commentId,
          comment,
        })
      );

      setIsUpdate(false);
      getCommentList();
    }
  };


  //삭제
  const handleDelete = async () => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) {
      return;
    }

    await dispatch(
      deleteComment({
        commentId: item.commentId,
        // comment: "test",
      })
    );
    // window.location.reload();

    getCommentList();
  };

  const change = (e) => {
    const { value } = e.target;

    setComment(value);
  };


  //신고 모달
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  
  //댓글 신고 기능
  const initialState = {
    content: "",
  };
  const [content, setContent] = useState(initialState);

  const ReportCommentBtn = async () => {
    if (item.content.trim() === "") {
      return alert("내용을 입력해야 신고가 가능합니다.");
    }
    if (
      window.confirm("댓글을 신고하시겠습니까?\n신고 후 취소는 불가능합니다.")
    ) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_HOST_PORT}/report/comment/${item.commentId}`,
          content,
          {
            headers: {
              authorization: localStorage.getItem("ACCESSTOKEN"),
              refreshtoken: localStorage.getItem("REFRESHTOKEN"),
            },
          }
        );

        if (response.data.success === true) {
          alert(response.data.data);
          setContent(initialState);
          navigate(`/detail/${item.postId}`);
          return closeModal();
        }
        if (response.data.success === false) {
          alert(response.data.error.message);
          return;
        }
      } catch (error) {
        console.log(error);
      }
      navigate(`/detail/${item.postId}`);
    }
  };



  return (
    <Item>
      <First>
        <Left>
          <ProfileImg
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${item.memberImage})`,
              backgroundPosition: "center",
            }}
            onClick={() => {
              if (logIn && Id === item.memberId) {
                navigate("/mypage");
              } else if (logIn && Id !== item.memberId) {
                navigate(`/someonesmypage/${item.commentMemberId}`);
              } else {
                return;
              }
            }}
          />
          <Nickname>{item.memberNickname}</Nickname>
        </Left>
        {Id === item.memberId ? (
          isUpdate ? (
            <RightButton onClick={setUpdate}>취소</RightButton>
          ) : (
            <Right>
              <RightButton onClick={setUpdate}>수정</RightButton>
              <RightButton onClick={handleDelete}>삭제</RightButton>
            </Right>
          )
        ) : (
          <Right>
            <RightButton onClick={openModal}>신고</RightButton>
            <ModalComment
              open={modalOpen}
              close={closeModal}
              header={`${item.memberNickname}님 신고하기`}
              comment={`${item.content}`}
              ReportCommentBtn={ReportCommentBtn}
              setContent={setContent}
            >
              {/* Modal.js의  <main> {props.children} </main>에 내용이 입력된다.  */}
            </ModalComment>
          </Right>
        )}
      </First>

      {isUpdate ? (
        <Stcontainer>
          <Input
            value={comment}
            onChange={change}
            onKeyDown={handleUpdate}
            placeholder="댓글을 입력 후 Enter를 눌러주세요"
            type="text"
          />
        </Stcontainer>
      ) : (
        <Content>{item.content}</Content>
      )}
    </Item>
  );
};





export default CommentItem;

const Stcontainer = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  /* padding: 0 10px; */
`;

const Input = styled.input`
  height: 40px;
  width: 237px;
  padding: 0 10px;
  border: 1px solid #a1a1a1;
  border-radius: 5px;
  outline: none;
  :focus {
    outline: none;
    border-color: #18a0fb;
    box-shadow: 0 0 5px #18a0fb;
  }
`;

const Item = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

const First = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
`;

const RightButton = styled.div`
  cursor: pointer;
  font-size: 10px;
  :hover {
    color: #2196f3;
  }
`;

const ProfileImg = styled.div`
  display: flex;
  width: 21px;
  height: 21px;
  border-radius: 100%;
  border: 1px solid gray;
`;

const Nickname = styled.div`
  font-size: 14px;
  font-weight: bold;
  width: 70px;
`;

const Content = styled.div`
  font-size: 12px;
`;
