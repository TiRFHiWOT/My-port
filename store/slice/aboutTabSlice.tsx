import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTab: "skills",
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setTab(state, action) {
      state.selectedTab = action.payload;
    },
  },
});

export const { setTab } = tabSlice.actions;
export default tabSlice.reducer;
