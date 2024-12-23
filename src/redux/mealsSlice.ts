import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { headers, mealsUrl } from "../config";
import axios from "axios";
import { Meals } from "../model";

interface ReservationState {
  meals: Meals[];
  status: string;
  error: string | null;
}

const initialState: ReservationState = {
  meals: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchMeals = createAsyncThunk(
  "items/fetchMeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${mealsUrl}?select=*&order=id.asc`, {
        headers,
      });
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const mealsSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as any;
      });
  },
});

export default mealsSlice.reducer;
