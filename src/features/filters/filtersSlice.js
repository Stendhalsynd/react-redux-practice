import { createSlice } from "@reduxjs/toolkit";

export const StatusFilters = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

const initialState = {
  status: StatusFilters.All,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    statusFilterChanged: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const filterStatus = (state) => state.filters.status;

export const { statusFilterChanged } = filtersSlice.actions;

export default filtersSlice.reducer;
