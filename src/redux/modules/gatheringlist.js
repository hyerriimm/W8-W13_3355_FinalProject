import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const API_URL = process.env.REACT_APP_HOST_PORT;

//참여 중인 모임 조회
export const __parti = createAsyncThunk(
  "/mypage/participation",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${API_URL}/mypage/participation`, {
        headers: {
          authorization: localStorage.getItem("ACCESSTOKEN"),
          refreshtoken: localStorage.getItem("REFRESHTOKEN")
        }
      });
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

//내가 주최한 모임 조회
export const __lead = createAsyncThunk(
  "/mypage/leader",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${API_URL}/mypage/leader`, {
        headers: {
          authorization: localStorage.getItem("ACCESSTOKEN"),
          refreshtoken: localStorage.getItem("REFRESHTOKEN")
        }
      });
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

export const gatheringlist = createSlice({
  name: "gatheringlist",
  initialState: {
    partilist: [],
    leadlist: [],
    error: null,
    isloading: false
  },
  reducers: {},
  extraReducers: {
    [__parti.pending]: (state) => {
      state.isLoading = true;
    },
    [__parti.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.partilist = action.payload;
    },
    [__parti.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__lead.pending]: (state) => {
      state.isLoading = true;
    },
    [__lead.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.leadlist = action.payload;
    },
    [__lead.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
}
);

// export const { } = gatheringlist.actions;
export default gatheringlist.reducer;