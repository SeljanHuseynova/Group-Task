import { combineReducers } from "@reduxjs/toolkit";
import reservationReducer from "../redux/reservationSlice";
import mealsReducer from '../redux/mealsSlice';
import contactReducer from '../redux/contactSlice';

const rootReducer = combineReducers({
  reservation: reservationReducer,
  meals:mealsReducer,
  contact:contactReducer,
});

export default rootReducer;
