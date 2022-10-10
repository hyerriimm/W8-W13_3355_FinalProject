import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_HOST_PORT;

//댓글 조회
export const getComments = createAsyncThunk(
  "comment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${API_URL}/comment/${payload}`, {
        headers: {
          authorization: localStorage.getItem("ACCESSTOKEN"),
          refreshtoken: localStorage.getItem("REFRESHTOKEN"),
          "Content-Type": "multipart/form-data",
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//댓글 작성
export const createComment = createAsyncThunk(
  "comment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${API_URL}/comment/${payload.postId}`,
        { comment: payload.comment },
        {
          headers: {
            authorization: localStorage.getItem("ACCESSTOKEN"),
            refreshtoken: localStorage.getItem("REFRESHTOKEN"),
            "Content-Type": "application/json",
          },
        }
      );
      if (data.data.success === false) alert(data.data.error.message);
      else alert(data.data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//댓글 수정
export const updateComment = createAsyncThunk(
  "comment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.put(
        `${API_URL}/comment/${payload.commentId}`,
        { comment: payload.comment },
        {
          headers: {
            authorization: localStorage.getItem("ACCESSTOKEN"),
            refreshtoken: localStorage.getItem("REFRESHTOKEN"),
            "Content-Type": "application/json",
          },
        }
      );
      if (data.data.success === false) alert(data.data.error.message);
      else alert(data.data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//댓글 삭제
export const deleteComment = createAsyncThunk(
  "comment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `${API_URL}/comment/${payload.commentId}`,
        {
          headers: {
            authorization: localStorage.getItem("ACCESSTOKEN"),
            refreshtoken: localStorage.getItem("REFRESHTOKEN"),
            "Content-Type": "application/json",
          },
        }
      );
      if (data.data.success === false) alert(data.data.error.message);
      else alert(data.data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


//댓글 신고
export const reportComment = createAsyncThunk(
  "comment", async (payload, thunkAPI) => {
  try {
    const data = await axios.get(`${API_URL}/comment/${payload}`, {
      headers: {
        authorization: localStorage.getItem("ACCESSTOKEN"),
        refreshtoken: localStorage.getItem("REFRESHTOKEN"),
        "Content-Type": "multipart/form-data",
      },
    });
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});