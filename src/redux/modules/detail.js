import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const API_URL = process.env.REACT_APP_HOST_PORT;

// 로컬스토리지에서 토큰 가져오기
const ACCESSTOKEN = localStorage.getItem('ACCESSTOKEN');
const REFRESHTOKEN = localStorage.getItem('REFRESHTOKEN');

//카드 상세
export const __detail = createAsyncThunk(
    "detail/__detail", 
    async (payload, thunkAPI) => { 
        try {
            const data = await axios.get(`${API_URL}/post/detail/${payload}`, {
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

//게시글 삭제
  export const __delete = createAsyncThunk(
    "detail/__delete", 
    async (payload, thunkAPI) => { 
        try {
            const data = await axios.delete(`${API_URL}/post/${payload}`, {
              headers: {
                authorization: localStorage.getItem("ACCESSTOKEN"),
                refreshtoken: localStorage.getItem("REFRESHTOKEN")
              }
            });
            // console.log(data.data.data);
            if(data.data.success === false)
              alert(data.data.error.message)
              else alert(data.data.data)
            return thunkAPI.fulfillWithValue(data.data.data);
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
        }
      });

//게시글 찜
export const __addWish = createAsyncThunk(
  "detail/__addWish", 
  async (payload, thunkAPI) => { 
      try {
          const data = await axios.post(`${API_URL}/post/add/wish/${payload}`, payload, {
            headers: {
              authorization: localStorage.getItem("ACCESSTOKEN"),
              refreshtoken: localStorage.getItem("REFRESHTOKEN")
            }
          });
          // console.log(data.data.data);
          // if(data.data.success === false) {
          //   alert(data.data.error.message)
          // } else {
          //   alert('게시글 찜 완료')
          // }
          return thunkAPI.fulfillWithValue(data.data.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    });

// 게시글 찜 취소
export const __removeWish = createAsyncThunk(
  "detail/__removeWish", 
  async (payload, thunkAPI) => { 
      try {
          const data = await axios.post(`${API_URL}/post/remove/wish/${payload}`, payload, {
            headers: {
              authorization: localStorage.getItem("ACCESSTOKEN"),
              refreshtoken: localStorage.getItem("REFRESHTOKEN")
            }
          });
          // console.log(data.data.data);
          // if(data.data.success === false) {
          //   alert(data.data.error.message)
          // } else {
          //   alert('게시글 찜 취소')
          // }
          return thunkAPI.fulfillWithValue(data.data.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    });

export const detail = createSlice({
  name: 'detail',
  initialState: {
    detail: [],
    detail_wishPeople:[],
    wishData: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // 게시글 상세
    builder
    .addCase(__detail.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(__detail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
      state.detail_wishPeople = action.payload.wishPeople;
      // Promise가 fullfilled일 때 dispatch
    })
    .addCase(__detail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload; 
      // Promise가 rejected일 때 dispatch
    });

    // 삭제
    builder
    .addCase(__delete.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(__delete.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.detail = action.payload;
      // Promise가 fullfilled일 때 dispatch
    })
    .addCase(__delete.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload; 
      // Promise가 rejected일 때 dispatch
    });

    // 찜
    builder
    .addCase(__addWish.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(__addWish.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wishData = action.payload;
      // Promise가 fullfilled일 때 dispatch
    })
    .addCase(__addWish.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload; 
      // Promise가 rejected일 때 dispatch
    });

    // 찜 삭제
    builder
    .addCase(__removeWish.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(__removeWish.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wishData = action.payload;
      // Promise가 fullfilled일 때 dispatch
    })
    .addCase(__removeWish.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload; 
      // Promise가 rejected일 때 dispatch
    });
  },
});

// export const {} = detail.actions;
export default detail.reducer;