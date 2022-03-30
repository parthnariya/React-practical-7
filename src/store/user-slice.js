import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/getUser", async (page) => {
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/users?page=${page}`).then( res => res.json())
  
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: null,
    totalPage:null,
    currentPage:1
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.currentPage = payload.page
      state.totalPage = payload.total_pages
      state.users = payload.data;
      state.status = "success";
    },
    [getUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default userSlice.reducer;
