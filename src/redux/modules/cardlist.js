import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_HOST_PORT;

//모임 카드 리스트 최신순
export const __cardlist = createAsyncThunk(
  "__cardlist",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${API_URL}/post/all?page=${payload}`, {
        headers: {
          authorization: localStorage.getItem("ACCESSTOKEN"),
          refreshtoken: localStorage.getItem("REFRESHTOKEN"),
        },
      });
      // console.log(data.data.data);
      // if(data.data.success === false)
      //   alert(data.data.error.message)
      //   else alert(data.data.data)
      return thunkAPI.fulfillWithValue({data: data.data.data, page:payload});
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//모임 카드 리스트 마감순
export const __donecardlist = createAsyncThunk(
  "__donecardlist",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${API_URL}/post/all/day?page=${payload}`, {
        headers: {
          authorization: localStorage.getItem("ACCESSTOKEN"),
          refreshtoken: localStorage.getItem("REFRESHTOKEN"),
        },
      });
      // console.log(data.data.data);
      // if(data.data.success === false)
      //   alert(data.data.error.message)
      //   else alert(data.data.data)
      return thunkAPI.fulfillWithValue({ data: data.data.data, page: payload });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const cardlist = createSlice({
  name: "cardlist",
  initialState: {
    cardList: [],
    closingOrderList:[],
    currentPage:0,
    firstPage:true,
    hasNextPage:true,
    hasPreviousPage:false,
    totalPage:0,
    totalPost:0,
    error: null,
    isloading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(__cardlist.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(__cardlist.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.page === 0) {
        state.cardList = action.payload.data.postList;
        state.currentPage = action.payload.data.currentPage;
        state.firstPage = action.payload.data.firstPage;
        state.hasNextPage = action.payload.data.hasNextPage;
        state.hasPreviousPage = action.payload.data.hasPreviousPage;
        state.totalPage = action.payload.data.totalPage;
        state.totalPost = action.payload.data.totalPost;
      } else {
        state.cardList.push( ...action.payload.data.postList);
        state.currentPage = action.payload.data.currentPage;
        state.firstPage = action.payload.data.firstPage;
        state.hasNextPage = action.payload.data.hasNextPage;
        state.hasPreviousPage = action.payload.data.hasPreviousPage;
        state.totalPage = action.payload.data.totalPage;
        state.totalPost = action.payload.data.totalPost;
      }
    })
    .addCase(__cardlist.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // Promise가 rejected일 때 dispatch
    });

    builder
    .addCase(__donecardlist.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(__donecardlist.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.page === 0) {
        state.closingOrderList = action.payload.data.postList;
        state.currentPage = action.payload.data.currentPage;
        state.firstPage = action.payload.data.firstPage;
        state.hasNextPage = action.payload.data.hasNextPage;
        state.hasPreviousPage = action.payload.data.hasPreviousPage;
        state.totalPage = action.payload.data.totalPage;
        state.totalPost = action.payload.data.totalPost;
      } else {
        state.closingOrderList.push( ...action.payload.data.postList);
        state.currentPage = action.payload.data.currentPage;
        state.firstPage = action.payload.data.firstPage;
        state.hasNextPage = action.payload.data.hasNextPage;
        state.hasPreviousPage = action.payload.data.hasPreviousPage;
        state.totalPage = action.payload.data.totalPage;
        state.totalPost = action.payload.data.totalPost;
      }
    })
    .addCase(__donecardlist.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // Promise가 rejected일 때 dispatch
    });
  },
});

export const {} = cardlist.actions;
export default cardlist.reducer;
