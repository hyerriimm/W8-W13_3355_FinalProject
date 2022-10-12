import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_HOST_PORT;

// 신고 내역 조회 / 회원, 게시글 , 댓글
export const __getReportedList = createAsyncThunk(
  "admin/__getReportedList",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${API_URL}/admin/report/list`, {
        headers: {
          authorization: localStorage.getItem("ACCESSTOKEN"),
          refreshtoken: localStorage.getItem("REFRESHTOKEN"),
        },
      });
      // console.log(data.data.data);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 신고처리 반려 
export const __withdraw = createAsyncThunk(
  "admin/__withdraw",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${API_URL}/admin/report/withdraw/${payload}`,
        { reportId: payload },
        {
          headers: {
            authorization: localStorage.getItem("ACCESSTOKEN"),
            refreshtoken: localStorage.getItem("REFRESHTOKEN"),
          },
        }
      );
      // console.log(data);
      if (data.data.success === false) {
        alert(data.data.error.message);
      } else {
        alert(data.data.data);
        window.location.reload();
      }
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 신고처리 제재
export const __execute = createAsyncThunk(
  "admin/__execute",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${API_URL}/admin/report/execute/${payload}`,
        { reportId: payload },
        {
          headers: {
            authorization: localStorage.getItem("ACCESSTOKEN"),
            refreshtoken: localStorage.getItem("REFRESHTOKEN"),
          },
        }
      );
      // console.log(data);
      if (data.data.success === false) {
        alert(data.data.error.message);
      } else {
        alert(data.data.data);
        window.location.reload();
      }
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const admin = createSlice({
  name: "admin",
  initialState: {
    ReportedList:[],
    ReportedMembers: [],
    ReportedPosts: [],
    ReportedComments: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder
    .addCase(__getReportedList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(__getReportedList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ReportedList = action.payload;
    })
    .addCase(__getReportedList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// export const {} = application.actions;
export default admin.reducer;
