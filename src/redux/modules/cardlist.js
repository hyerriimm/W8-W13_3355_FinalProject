import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_HOST_PORT;

//모임 카드 리스트
export const __cardlist = createAsyncThunk(
  "/post",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${API_URL}/post/all`, {
        headers: {
          authorization: localStorage.getItem("ACCESSTOKEN"),
          refreshtoken: localStorage.getItem("REFRESHTOKEN"),
        },
      });
      // console.log(data.data.data);
      // if(data.data.success === false)
      //   alert(data.data.error.message)
      //   else alert(data.data.data)
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cardlist = createSlice({
  name: "cardlist",
  initialState: {
    cardlist: [],
    error: null,
    isloading: false,
  },
  reducers: {},
  extraReducers: {
    [__cardlist.pending]: (state) => {
      state.isLoading = true;
    },
    [__cardlist.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cardlist = action.payload;

      // Promise가 fullfilled일 때 dispatch
    },
    [__cardlist.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // Promise가 rejected일 때 dispatch
    },
  },
});

export const {} = cardlist.actions;
export default cardlist.reducer;
