import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// 채팅 대화 내용 불러오기 (eventId = 게시글 번호, page = 50개씩 불러오는 인피니티 스크롤)
export const __getChat = createAsyncThunk(
  "/chat/message/{roomId}",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        process.env.REACT_APP_HOST_PORT +
          `/chat/message?roomId=${payload.id}&page=${payload.page}`,
        {
          headers: {
            Authorization: localStorage.getItem("ACCESSTOKEN"),
            RefreshToken: localStorage.getItem("REFRESHTOKEN"),
          },
        }
      );
      // console.log(data);
      if (data.data.success === false) alert(data.data.error.message);
      return thunkAPI.fulfillWithValue({
        data: data.data.data,
        page: payload.page,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 채팅방 리스트
export const __getChatList = createAsyncThunk(
  "/chat/rooms",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        process.env.REACT_APP_HOST_PORT + `/chat/rooms`,
        {
          headers: {
            Authorization: localStorage.getItem("ACCESSTOKEN"),
            RefreshToken: localStorage.getItem("REFRESHTOKEN"),
          },
        }
      );
      if (data.data.success === false) {
        alert(data.data.error.message);
        window.location.replace("/");
      }
      return thunkAPI.fulfillWithValue({ data: data.data });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// createSlice를 통한 redux 생성 - store에서 사용할 수 있는 내용들을 담고 있음
export const chat = createSlice({
    name:"chat",
    initialState: {
      chatRoomList: [],
        data: [],
        chatList: [],
        chatInfo:[],
        chatRoomTitle: null,
        currentPage:0,
        isFirstPage:true,
        hasPreviousPage:false,
        totalPage:0,
        totalMessage:0,
        success: false,
        error: null,
        isLoading: false
      },
    reducers:{},
    // 내부에서 동작하는 함수 외 외부에서 선언해준 함수 동작을 보조하는 기능
    extraReducers: (builder) => {
      // 대화 내용 불러오기
      builder
        .addCase(__getChat.pending, (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        })
        .addCase(__getChat.fulfilled, (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          // 처음으로 데이터 값 불러올때는 배열에 추가식이 아닌 state값 수정
          if (action.payload.page === 0) {
            // console.log('처음 요청하는 페이지', action.payload.page);
            state.chatList = action.payload.data.chatMessageList;
            state.chatRoomTitle = action.payload.data.chatRoomTitle;
            state.currentPage = action.payload.data.currentPage;
            state.isFirstPage = action.payload.data.isFirstPage;
            state.hasPreviousPage = action.payload.data.hasPreviousPage;
            state.totalPage = action.payload.data.totalPage;
            state.totalMessage = action.payload.data.totalMessage;
          } else {
            // 이후 인피니티 스크롤 시 데이터 앞에 저장
            // console.log('버튼 눌러서 요청하는 페이지',action.payload.page, '서버에서 받은 총 페이지 수', action.payload.data.totalPage );
            state.chatList.push(...action.payload.data.chatMessageList);
            state.currentPage = action.payload.data.currentPage;
            state.isFirstPage = action.payload.data.isFirstPage;
            state.hasPreviousPage = action.payload.data.hasPreviousPage;
            state.totalPage = action.payload.data.totalPage;
            state.totalMessage = action.payload.data.totalMessage;
          }
        })
        .addCase(__getChat.rejected, (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        });

      // 채팅방 리스트
      builder
        .addCase(__getChatList.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(__getChatList.fulfilled, (state, action) => {
          state.isLoading = false;
          state.chatRoomList = action.payload.data.data;
          // Promise가 fullfilled일 때 dispatch
        })
        .addCase(__getChatList.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          // Promise가 rejected일 때 dispatch
        });
    },
    
});

export default chat.reducer;
