import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const API_URL = process.env.REACT_APP_HOST_PORT;

//찜 리스트 조회
export const __wish = createAsyncThunk(
  "/mypage/wish",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${API_URL}/mypage/wish`, {
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

  export const wishlist = createSlice({
    name: "wishlist",
    initialState: {
      wishlist: [],
      error: null,
      isloading: false
    },
    reducers: {},
    extraReducers: {
      [__wish.pending]: (state) => {
        state.isLoading = true;
      },
      [__wish.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.wishlist = action.payload;
      },
      [__wish.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    }
  }
  );
  
  export default wishlist.reducer;