import { createSlice } from "@reduxjs/toolkit"
import * as R from "ramda"
import { getUserEntriesFulfilled } from "../dataSlice"
import {
  getFields,
  getInitialGroupedTree,
  groupMonths
} from "./modules/modules"

const groupedEntriesSlice = createSlice({
  name: "groupedEntries",
  initialState: {
    entries: [],
    groupedTree: {},
    fields: { year: [], payer: [], category: [] },
  },
  extraReducers: {
    [getUserEntriesFulfilled]: (state, { payload: { entries } }) => {
      const entriesArr = R.values(entries)
      const groupedTree = R.pipe(
        getInitialGroupedTree,
        // groupMonths
      )(entriesArr)
      const fields = getFields(groupedTree)
      state.entries = entriesArr
      state.groupedTree = groupedTree
      state.fields = fields
    },
  },
})

export const groupedEntriesReducer = groupedEntriesSlice.reducer
