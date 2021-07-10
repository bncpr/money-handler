import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DataSliceState } from "../../../types/DataSliceState"
import { Entry } from "../../../types/Entry"
import { DictEntryArray, GroupedTree } from "../../../types/GroupedTree"
import { getGroupedMonths } from "./modules/getGroupedMonths"
import { getFields, getInitialGroupedTree } from "./modules/modules"

interface GroupedMonths {
  [year: string]: DictEntryArray
}

type SliceState = {
  entries: Entry[]
  groupedTree: GroupedTree
  groupedMonths: GroupedMonths
  fields: {
    year: string[]
    payer: string[]
    category: string[]
  }
}

const initialState: SliceState = {
  entries: [],
  groupedTree: { year: {}, payer: {}, category: {} },
  groupedMonths: {},
  fields: { year: [], payer: [], category: [] },
}

const groupedEntriesSlice = createSlice({
  name: "groupedEntries",
  initialState,
  reducers: {
    updateEntries(state, action: PayloadAction<DataSliceState>) {
      const entriesArr = Object.values(action.payload.entries)

      const groupedTree = getInitialGroupedTree(entriesArr)
      state.fields = getFields(groupedTree)
      
      state.groupedMonths = getGroupedMonths(groupedTree.year)

      state.entries = entriesArr
      state.groupedTree = groupedTree
    },
  },
})

export const groupedEntriesReducer = groupedEntriesSlice.reducer
export const { updateEntries } = groupedEntriesSlice.actions
