import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../config/config.env";

export const getUser = createAsyncThunk("user/getUser", async ({page,perPage}) => {
  return fetch(`${API_URL}/users?page=${page}&per_page=${perPage}`).then( res => res.json())
  
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: null,
    totalPage:null,
    currentPage:1,
    perPage : 2
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.currentPage = payload.page
      state.totalPage = payload.total_pages
      state.users = payload.data;
      state.perPage = payload.per_page
      state.status = "success";
    },
    [getUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default userSlice.reducer;
