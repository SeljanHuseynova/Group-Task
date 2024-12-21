import { combineReducers } from "@reduxjs/toolkit";
import reservationReducer from "../redux/reservationSlice";

const rootReducer = combineReducers({
  reservation: reservationReducer,
});

export default rootReducer;
