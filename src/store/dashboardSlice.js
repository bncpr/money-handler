import { createSlice } from "@reduxjs/toolkit";


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    year: null,
    month: null,
  },
  reducers: {
    changeYear(state, action) {
      state.year = action.payload
    }
  }
})

export const dashboardReducer = dashboardSlice.reducer
export const { changeYear } = dashboardSlice.actions