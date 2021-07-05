import { createSlice } from "@reduxjs/toolkit"
import * as R from "ramda"
import { Entry } from "../../../types/Entry"
import { getFields, getInitialGroupedTree } from "./modules/modules"

type GroupedTree = {
  year: {
    [x: string]: Entry[]
  }
  payer: {
    [x: string]: Entry[]
  }
  category: {
    [x: string]: Entry[]
  }
}

type SliceState = {
  entries: Entry[]
  groupedTree: GroupedTree
  fields: {
    year: string[]
    payer: string[]
    category: string[]
  }
}

const initialState: SliceState = {
  entries: [],
  groupedTree: { year: {}, payer: {}, category: {} },
  fields: { year: [], payer: [], category: [] },
}

const groupedEntriesSlice = createSlice({
  name: "groupedEntries",
  initialState,
  reducers: {
    updateEntries(state, { payload: { entries } }) {
      const entriesArr = R.values(entries)
      const groupedTree = getInitialGroupedTree(entriesArr)
      const fields = getFields(groupedTree)
      state.entries = entriesArr
      state.groupedTree = groupedTree
      state.fields = fields
    },
  },
})

export const groupedEntriesReducer = groupedEntriesSlice.reducer
export const { updateEntries } = groupedEntriesSlice.actions
