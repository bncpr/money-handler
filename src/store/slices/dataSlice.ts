import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DataSliceState } from "../../types/DataSliceState"
import { signOut } from "./authenticationSlice"

const initialState: DataSliceState = {
  entries: {},
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    cacheEntries(_, action: PayloadAction<DataSliceState>) {
      return action.payload
    },
  },
  extraReducers: {
    [signOut.type]: () => initialState,
  },
})

export const dataReducer = dataSlice.reducer
export const { cacheEntries } = dataSlice.actions
