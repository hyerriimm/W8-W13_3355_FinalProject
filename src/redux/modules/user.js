import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const API_URL = process.env.REACT_APP_HOST_PORT;

//회원가입
export const signUp = createAsyncThunk(
  "member/signup",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload)
      const data = await axios.post(`${API_URL}/member/signup`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data.data);
      if (data.data.success === false) alert(data.data.error.message);
      else alert(data.data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const user = createSlice({
  name: "user",
  initialState: {
    data: [],
    success: false,
    error: null,
    isloading: false,
  },
  reducers: {},
});

export const _getUsersName = createAsyncThunk(
  "getUsersName",
  async (payload, thunkAPI) => {
    // console.log(payload)
    try {
      const data = await axios.get(`${API_URL}`);
      // console.log(data.data.data)
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export default user.reducer;
