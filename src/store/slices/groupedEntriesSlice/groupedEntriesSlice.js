import { createSlice } from "@reduxjs/toolkit"
import * as R from "ramda"
import { signOut } from "../authenticationSlice"
import { getUserEntriesFulfilled } from "../dataSlice"
import { getFields, getInitialGroupedTree } from "./modules/modules"

const initialState = {
  entries: [],
  groupedTree: {},
  fields: { year: [], payer: [], category: [] },
}
const groupedEntriesSlice = createSlice({
  name: "groupedEntries",
  initialState,
  extraReducers: {
    [getUserEntriesFulfilled]: (state, { payload: { entries } }) => {
      const entriesArr = R.values(entries)
      const groupedTree = R.pipe(getInitialGroupedTree)(entriesArr)
      const fields = getFields(groupedTree)
      state.entries = entriesArr
      state.groupedTree = groupedTree
      state.fields = fields
    },
    [signOut]: () => initialState,
  },
})

export const groupedEntriesReducer = groupedEntriesSlice.reducer
