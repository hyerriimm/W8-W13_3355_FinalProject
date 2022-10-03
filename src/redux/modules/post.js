import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_HOST_PORT;

export const getPost = createAsyncThunk("comment", async (postId, thunkAPI) => {
  try {
    const data = await axios.get(`${API_URL}/post/detail/${postId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.data.success === false) alert(data.data.error.message);
    else alert(data.data.data);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
