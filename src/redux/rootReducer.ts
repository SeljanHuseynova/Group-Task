import { combineReducers } from "@reduxjs/toolkit";
import reservationReducer from "../redux/reservationSlice";
import mealsReducer from "../redux/mealsSlice";

const rootReducer = combineReducers({
  reservation: reservationReducer,
  meals: mealsReducer,
});

export default rootReducer;
