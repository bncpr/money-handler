import { createSlice } from "@reduxjs/toolkit"

const dataSlice = createSlice({
  name: "data",
  initialState: {},
  extraReducers: {
    "data/initData/fulfilled": (_, action) => action.payload,
    "data/getYear/fulfilled": (state, action) => {
      const { year, data } = action.payload
      state[year] = data
    },
  },
})

export const dataReducer = dataSlice.reducer
