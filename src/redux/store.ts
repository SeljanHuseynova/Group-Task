import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: {
    rootReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; //  because the state structure is dynamic and based on your
// only using typeof for state's type is wrong => gives the type of the function itself, not the type of the value it returns.
// typeof store.getState; =>  This gives (state: any) => RootState

export type AppDispatch = typeof store.dispatch; // we do not write returntype for dispatch => is not a function that returns a value, it is an existing property of the store ==> writing returntype for dispathc => This dooes not work because dispatch doesn't return its type, it's already a property
export default store;
