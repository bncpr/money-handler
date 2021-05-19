import { createAction, createSlice } from "@reduxjs/toolkit"

export const getUserEntriesFulfilled = createAction(
  "data/getUserEntries/fulfilled"
)
export const getUserEntriesNoEntries = createAction(
  "data/getUserEntries/noEntries"
)

const dataSlice = createSlice({
  name: "data",
  initialState: {
    entries: {},
    categories: [],
    payers: [],
    years: [],
  },
  extraReducers: {
    [getUserEntriesFulfilled]: (state, { payload }) => {
      return Object.assign(state, payload)
    },
  },
})

export const dataReducer = dataSlice.reducer
