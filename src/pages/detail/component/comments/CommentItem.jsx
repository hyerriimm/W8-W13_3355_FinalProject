import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  deleteComment,
  updateComment,
} from "../../../../redux/modules/comment";

const CommentItem = ({ item, getCommentList }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [isUpdate, setIsUpdate] = useState(false);
  const [comment, setComment] = useState({});

  const Id = localStorage.getItem("Id");


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
        comment: "test",
      })
    );
    window.location.reload();

    getCommentList();
  };

  const change = (e) => {
    const { value } = e.target;

    setComment(value);

  };


console.log(item)

  return (
    <Item>
      <First>
        <Left>
          <Circle>
            <img src={item.memberImage} />
          </Circle>
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
          false
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
  justify-content: center;
  align-items: center;
  padding: 0 10px;
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
  gap: 30px;
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
`;

const Circle = styled.div`
  display: flex;
  width: 21px;
  height: 21px;
  border-radius: 100%;
  border: 1px solid gray;

  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;

const Nickname = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const Content = styled.div`
  font-size: 12px;
`;
