import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RefreshRateState {
  value: number;
}

const initialState: RefreshRateState = {
  value: 1000,
};

export const refreshRateSlice = createSlice({
  name: "refreshRate",
  initialState,
  reducers: {
    setRefreshRate: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setRefreshRate } = refreshRateSlice.actions;

export default refreshRateSlice.reducer;
