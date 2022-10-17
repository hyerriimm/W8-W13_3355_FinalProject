import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { createComment, getComments } from "../../../../redux/modules/comment";
import CommentItem from "./CommentItem";
import axios from 'axios';

const Comment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState();
  const [commentList, setCommentList] = useState([]);

  // console.log(comment);

// console.log('댓글렌더링');
  // const getCommentList = async () => {
  //   const _commentList = await dispatch(getComments(id));

  //   if (_commentList.payload?.data?.length > 0) {
  //     setCommentList(_commentList.payload.data);
  //   }
  // };

// 댓글 리스트 가져오기-----------------------------------------------------------------------
  const GetCommentList =useCallback( async() => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST_PORT}/comment/${id}`, {
        headers: {
          authorization: localStorage.getItem("ACCESSTOKEN"),
          refreshtoken: localStorage.getItem("REFRESHTOKEN"),
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log('리스트 불러와', data.data.data);
      if (data.data.data) {
        setCommentList(data.data.data);
      } else {
        setCommentList([]);
      }
    } catch (error) {
      console.log(error);
    }
  },[]);

  useEffect(() => {
    GetCommentList();
  }, []);
// -----------------------------------------------------------------------------------------

// 댓글 달기-----------------------------------------------------------------------
  const submit = async() => {
    if (!comment) {
      alert("댓글을 입력해주세요.");
      return false;
    }

    await dispatch(createComment({ postId: id, comment:comment }));
    setComment();

    GetCommentList();
  };

// 엔터로 댓글달기
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };
// ------------------------------------------------------------------------------


  const commentItems = commentList.map((item) => {
    return (
      <CommentItem
        item={item}
        key={item.commentId}
        onKeyPress={handleKeyPress}
        getCommentList={GetCommentList}
      ></CommentItem>
    );
  });

  return (
    <>
      <Layout>
        <div>
          <Stcontainer>
            <Input
              value={comment || ''}
              onChange={(e)=>setComment(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="댓글을 입력해주세요 (250자 이내)"
              type="text"
              maxLength={250}
            />

            <Button type="button" onClick={submit}>
              등록
            </Button>
          </Stcontainer>
          {commentList === null ? false : (
            <Comments>{commentItems}</Comments>
          )}
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
