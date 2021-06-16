import { createSlice } from "@reduxjs/toolkit"
import * as R from "ramda"
import {
  getRandomData,
} from "../../../utility/getRandomData"
import { signOut } from "../authenticationSlice"
import { getFields, getInitialGroupedTree } from "./modules/modules"

const initialState = {
  entries: [],
  groupedTree: {},
  fields: { year: [], payer: [], category: [] },
}

const groupedEntriesSlice = createSlice({
  name: "groupedEntries",
  initialState,
  reducers: {
    updateEntries(state, { payload: { entries } }) {
      const entriesArr = R.values(entries)
      const groupedTree = R.pipe(getInitialGroupedTree)(entriesArr)
      const fields = getFields(groupedTree)
      state.entries = entriesArr
      state.groupedTree = groupedTree
      state.fields = fields
    },
  },
})

export const groupedEntriesReducer = groupedEntriesSlice.reducer
export const { updateEntries } = groupedEntriesSlice.actions
