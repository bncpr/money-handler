import { createAction, createSlice } from "@reduxjs/toolkit"
import * as R from "ramda"
import { signOut } from "./authenticationSlice"

export const getUserEntriesFulfilled = createAction(
  "data/getUserEntries/fulfilled"
)
export const getUserEntriesNoEntries = createAction(
  "data/getUserEntries/noEntries"
)

const initialState = {
  entries: {},
  fields: {
    category: [],
    payer: [],
    year: [],
    tags: [],
  },
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    removeEntry(state, { payload }) {
      state.entries = R.omit([payload], state.entries)
    },
    updateEntry(state, { payload: { entryId, entry } }) {
      state.entries[entryId] = entry
    },
    updateFields(state, { payload }) {
      state.fields = payload
    },
  },
  extraReducers: {
    [getUserEntriesFulfilled]: (state, { payload }) => {
      return R.mergeDeepRight(state, payload)
    },
    [signOut]: state => initialState,
  },
})

export const dataReducer = dataSlice.reducer
export const { removeEntry, updateEntry, updateFields } = dataSlice.actions
