import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const __getChatinfo = createAsyncThunk(
  "/chat/room/{roomId}/info",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        process.env.REACT_APP_HOST_PORT +
          `/chat/room/${payload}/info`,
        {
          headers: {
            Authorization: localStorage.getItem("ACCESSTOKEN"),
            RefreshToken: localStorage.getItem("REFRESHTOKEN"),
          },
        }
      );
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getChatinfo = createSlice({
  name: "chatinfo",
  initialState: {},
  reducers: {},

  extraReducers: {
    //전체내일정 가져오기
    [__getChatinfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getChatinfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.chatinfo = action.payload;
    },
    [__getChatinfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default getChatinfo.reducer;
