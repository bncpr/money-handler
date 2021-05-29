import { createAction, createSlice } from "@reduxjs/toolkit"
import * as R from "ramda"

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
    fields: {
      category: [],
      payer: [],
      year: [],
      tags: []
    }
  },
  reducers: {
    removeEntry(state, { payload }) {
      state.entries = R.omit([payload], state.entries)
    },
    updateEntry(state, { payload: { entryId, entry } }) {
      state.entries[entryId] = entry
    },
  },
  extraReducers: {
    [getUserEntriesFulfilled]: (state, { payload }) => {
      return Object.assign(state, payload)
    },
  },
})

export const dataReducer = dataSlice.reducer
export const { removeEntry, updateEntry } = dataSlice.actions
