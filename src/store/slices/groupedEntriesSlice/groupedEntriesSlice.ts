import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Entry } from "../../../types/Entry"
import { GroupedTree } from "../../../types/GroupedTree"
import { signOut } from "../authenticationSlice"

interface GroupedMonths {
  [year: string]: Record<string, Entry[]>
}

export type Fields = Record<"year" | "payer" | "category", string[]>

export type GroupedEntriesSliceState = {
  entries: Entry[]
  groupedTree: GroupedTree
  groupedMonths: GroupedMonths
  fields: Fields
}

const initialState: GroupedEntriesSliceState = {
  entries: [],
  groupedTree: { year: {}, payer: {}, category: {} },
  groupedMonths: {},
  fields: { year: [], payer: [], category: [] },
}

const groupedEntriesSlice = createSlice({
  name: "groupedEntries",
  initialState,
  reducers: {
    updateEntries(_, action: PayloadAction<GroupedEntriesSliceState>) {
      return action.payload
    },
  },
  extraReducers: {
    [signOut.type]: () => initialState,
  },
})

export const groupedEntriesReducer = groupedEntriesSlice.reducer
export const { updateEntries } = groupedEntriesSlice.actions
