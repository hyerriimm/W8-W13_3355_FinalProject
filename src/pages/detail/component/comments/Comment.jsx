import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { createComment, getComments } from "../../../../redux/modules/comment";
import CommentItem from "./CommentItem";

const Comment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState();
  const [commentList, setCommentList] = useState([]);

  const getCommentList = async () => {
    const _commentList = await dispatch(getComments(id));

    if (_commentList.payload?.data?.length > 0) {
      setCommentList(_commentList.payload.data);
    }
  };

  useEffect(() => {
    getCommentList();
  }, []);

  const submit = async () => {
    if (!comment) {
      alert("댓글을 입력해주세요.");
      return false;
    }

    commentClear();
    await dispatch(
      createComment({
        postId: id,
        comment,
      })
    );

    getCommentList();
  };

  // 엔터로 댓글달기
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const change = (e) => {
    const { value } = e.target;

    setComment(value);
  };

  const commentClear = () => {
    setComment({ commentId: "", comment: "" });
  };

  const commentItems = commentList.map((item) => {
    return (
      <CommentItem
        item={item}
        key={item.commentId}
        onKeyPress={handleKeyPress}
        getCommentList={getCommentList}
      ></CommentItem>
    );
  });

  return (
    <>
      <Layout>
        <div>
          <Stcontainer>
            <Input
              onChange={change}
              onKeyPress={handleKeyPress}
              placeholder="댓글을 입력해주세요"
              type="text"
              maxLength={250}
            />

            <Button type="button" onClick={submit}>
              등록
            </Button>
          </Stcontainer>
          <Comments>{commentItems}</Comments>
        </div>
      </Layout>
    </>
  );
};

export default Comment;

const Comments = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: 22px;
`;

const Layout = styled.div`
  background-color: white;
  min-width: 375px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

const Stcontainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  height: 40px;
  width: 237px;
  padding: 0 10px;
  margin-top: 30px;
  margin-bottom: 7px;
  margin-left: 0px;
  margin-right: 0px;
  border: 1px solid #a1a1a1;
  border-radius: 5px;
  outline: none;
  :focus {
    outline: none;
    border-color: #18a0fb;
    box-shadow: 0 0 5px #18a0fb;
  }
`;

const Button = styled.button`
  height: 40px;
  width: 113px;
  padding: 0 10px;
  margin-top: 30px;
  margin-bottom: 7px;
  margin-left: 5px;
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
