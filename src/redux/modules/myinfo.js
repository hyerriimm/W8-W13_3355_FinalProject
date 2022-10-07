import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_HOST_PORT;

//내 정보 조회
export const __getMyInfo = createAsyncThunk(
  "/mypage/info",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${API_URL}/mypage/info`, {
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

export const myinfo = createSlice({
  name: "myinfo",
  initialState: {
    myinfo: [],
    error: null,
    isloading: false,
  },
  reducers: {},
  extraReducers: {
    [__getMyInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myinfo = action.payload;
    },
    [__getMyInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default myinfo.reducer;
