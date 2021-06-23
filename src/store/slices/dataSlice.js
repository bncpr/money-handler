import { createAction, createSlice } from "@reduxjs/toolkit"
import * as R from "ramda"
import { updateEntries } from "./groupedEntriesSlice/groupedEntriesSlice"

export const getUserEntriesFulfilled = createAction(
  "data/getUserEntries/fulfilled",
)
export const getUserEntriesNoEntries = createAction(
  "data/getUserEntries/noEntries",
)

const initialState = {
  entries: {},
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: {
    [getUserEntriesFulfilled]: (state, { payload }) => {
      return R.mergeDeepRight(state, payload)
    },
    [updateEntries]: (state, { payload }) => {
      state.entries = payload.entries
    },
  },
})

export const dataReducer = dataSlice.reducer
