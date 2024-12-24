import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import Reservation from "../pages/Reservation";
import reservationReducer from '../redux/reservationSlice';

const store = configureStore({
  reducer: {
    reservation: reservationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
