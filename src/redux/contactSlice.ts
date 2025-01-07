import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { headers, contactUrl } from "../config";
import axios from "axios";
import { contactState, IContact, IRequest } from "../model";




const initialState: contactState = {
  requests: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const sendContactRequest = createAsyncThunk(
    "contact/sendRequest",
    async (
      { name, email, message,phoneNumber }:IContact,
      { rejectWithValue }
    ) => {
      try {
        const response = await axios.post(
          contactUrl,
          { name, email, message,phoneNumber },
          { headers }
        );
        return response.data;
      } catch (error: any) {
        console.error("API Error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
  
  const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(sendContactRequest.pending, (state) => {
          state.status = "loading";
        })
        .addCase(sendContactRequest.fulfilled, (state, action:PayloadAction<IRequest>) => {
          state.status = "succeeded";
          state.requests.push(action.payload);
        })
        .addCase(sendContactRequest.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        });
    },
  });
  
  export default contactSlice.reducer;
  
