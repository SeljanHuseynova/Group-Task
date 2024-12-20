import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tables: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
initialState;

const reservationSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default reservationSlice.reducer;
