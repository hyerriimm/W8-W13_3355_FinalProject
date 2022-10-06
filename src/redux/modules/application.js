import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_HOST_PORT;

// 지원자 리스트 정보 가져오기
export const __getApplication = createAsyncThunk(
  "application/__getApplication",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${API_URL}/post/application/${payload}`, {
        headers: {
          authorization: localStorage.getItem("ACCESSTOKEN"),
          refreshtoken: localStorage.getItem("REFRESHTOKEN"),
        },
      });
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 거절하기
export const __refuse = createAsyncThunk(
  "application/__refuse",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${API_URL}/post/application/disapprove/${payload}`,
        { applicationId: payload },
        {
          headers: {
            authorization: localStorage.getItem("ACCESSTOKEN"),
            refreshtoken: localStorage.getItem("REFRESHTOKEN"),
          },
        }
      );
      console.log(data);
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

// 수락하기
export const __accept = createAsyncThunk(
  "application/__accept",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${API_URL}/post/application/approve/${payload}`,
        { applicationId: payload },
        {
          headers: {
            authorization: localStorage.getItem("ACCESSTOKEN"),
            refreshtoken: localStorage.getItem("REFRESHTOKEN"),
          },
        }
      );
      console.log(data);
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

//내활동 - 참여신청 지원취소
export const __applycancel = createAsyncThunk(
  "application/__applycancel",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${API_URL}/post/application/cancel/${payload}`,
        { postId: payload },
        {
          headers: {
            authorization: localStorage.getItem("ACCESSTOKEN"),
            refreshtoken: localStorage.getItem("REFRESHTOKEN"),
          },
        }
      );
      console.log(data);
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

export const application = createSlice({
  name: "application",
  initialState: {
    applicants: [],
    detailTitle: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applicants = action.payload.applicants;
        state.detailTitle = action.payload.title;
      })
      .addCase(__getApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = application.actions;
export default application.reducer;
