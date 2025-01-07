import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { headers, reservUrl } from "../config";
import axios from "axios";
import { ICustomerData, ReservationState, Table } from "../model";

const initialState: ReservationState = {
  tables: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchTables = createAsyncThunk(
  "tables/fetchTables",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${reservUrl}?select=*&order=id.asc`, {
        headers,
      });
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const bookATable = createAsyncThunk(
  "tables/bookATable",
  async (
    { tableId, customerData }: { tableId: number; customerData: ICustomerData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${reservUrl}?id=eq.${tableId}`,
        {
          isReserved: true,
          name: customerData.name,
          surname: customerData.surname,
          phoneNumber: customerData.phoneNumber,
        },
        { headers }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const cancelReservation = createAsyncThunk(
  "tables/cancelReservation",
  async ({ tableId }: { tableId: number }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${reservUrl}?id=eq.${tableId}`,
        {
          isReserved: false,
          name: null,
          surname: null,
          phoneNumber: null,
        },
        { headers }
      );
      return response.data;
    } catch (error: any) {
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
      .addCase(
        fetchTables.fulfilled,
        (state, action: PayloadAction<Table[]>) => {
          state.status = "succeeded";
          state.tables = action.payload;
        }
      )
      .addCase(fetchTables.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(bookATable.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bookATable.fulfilled, (state, action: PayloadAction<Table>) => {
        state.status = "succeeded";
        const updatedTable = action.payload;
        state.tables = state.tables.map((table) =>
          table.id === updatedTable.id ? updatedTable : table
        );
      })
      .addCase(bookATable.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(cancelReservation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        cancelReservation.fulfilled,
        (state, action: PayloadAction<Table>) => {
          state.status = "succeeded";
          const updatedTable = action.payload;
          state.tables = state.tables.map((table) =>
            table.id === updatedTable.id ? updatedTable : table
          );
        }
      )
      .addCase(cancelReservation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as any;
      });
  },
});

export default reservationSlice.reducer;
