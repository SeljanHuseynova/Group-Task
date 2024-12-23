import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { headers, reservUrl } from "../config";
import axios from "axios";
import {Table} from '../model';



interface ReservationState {
  tables: Table[];
  status: string;
  error: string | null;
}

const initialState: ReservationState = {
  tables: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchTables = createAsyncThunk(
  "items/fetchTables",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${reservUrl}?select=*&order=id.asc`, {
        headers,
      });
      console.log("API Response:", response.data); 
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message); 
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const reservationSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTables.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tables = action.payload;
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as any;
      });
  },
});

export default reservationSlice.reducer;
