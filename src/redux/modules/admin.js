import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_HOST_PORT;

// 신고 내역 조회 / 회원
export const __getReportedMembers = createAsyncThunk(
  "admin/__getReportedMembers",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${API_URL}/admin/member`, {
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

// 신고 내역 조회 / 게시글
export const __getReportedPosts = createAsyncThunk(
    "admin/__getReportedPosts",
    async (payload, thunkAPI) => {
      try {
        const data = await axios.get(`${API_URL}/admin/post`, {
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

  // 신고 내역 조회 / 댓글
export const __getReportedComments = createAsyncThunk(
    "admin/__getReportedComments",
    async (payload, thunkAPI) => {
      try {
        const data = await axios.get(`${API_URL}/admin/comment`, {
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

// 신고된 회원 처리 
export const __refuse = createAsyncThunk(
  "admin/__refuse",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${API_URL}/admin/member/${payload.reportId}`,
        { applicationId: payload },
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

// 신고된 게시글 처리
export const __accept = createAsyncThunk(
  "admin/__accept",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${API_URL}/admin/post/${payload.reportId}`,
        { applicationId: payload },
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

// 신고된 댓글 처리
export const __applycancel = createAsyncThunk(
  "admin/__applycancel",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${API_URL}/admin/comment/${payload.reportId}`,
        { postId: payload },
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
    ReportedMembers: [],
    ReportedPosts: [],
    ReportedComments: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getReportedMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getReportedMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ReportedMembers = action.payload;
      })
      .addCase(__getReportedMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

      builder
      .addCase(__getReportedPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getReportedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ReportedPosts = action.payload;
      })
      .addCase(__getReportedPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

      builder
      .addCase(__getReportedComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getReportedComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ReportedComments = action.payload;
      })
      .addCase(__getReportedComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = application.actions;
export default admin.reducer;
