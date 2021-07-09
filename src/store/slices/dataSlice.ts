import { createSlice } from "@reduxjs/toolkit"
import { DataSliceState } from "../../types/DataSliceState"
import { updateEntries } from "./groupedEntriesSlice/groupedEntriesSlice"

const initialState: DataSliceState = {
  entries: {},
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: {
    [updateEntries.type]: (state, { payload }) => {
      state.entries = payload.entries
    },
  },
})

export const dataReducer = dataSlice.reducer
