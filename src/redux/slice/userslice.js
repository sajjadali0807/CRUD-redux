import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    createInfo: [],
    isLoading: false,
    deleteInfo: [],
    updateInfo: [],
  },
  reducers: {
    // This action represents the create API
    createAction: (state, { payload }) => {
      state.createInfo = payload.response;
      state.isLoading = payload.isloading;
    },

    deleteAction: (state, { payload }) => {
      state.deleteInfo = payload.response;
      state.isLoading = payload.isloading;
    },

    updateAction: (state, { payload }) => {
      state.updateInfo = payload.response;
      state.isLoading = payload.isloading;
    },
  },
});

export const { createAction, deleteAction, updateAction } = userSlice.actions;

export const userSelector = (state) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
