import { configureStore } from "@reduxjs/toolkit";
import refreshRateReducer from "./slices/refreshRateSlice";

export const store = configureStore({
  reducer: {
    refreshRate: refreshRateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
