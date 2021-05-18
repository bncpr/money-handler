import { createAction, createSlice } from "@reduxjs/toolkit"
import { lensProp, merge, over, values } from "ramda"
import * as R from "ramda"
import { getInitFilterables } from "../modules/getInitFilterables"

export const getUserEntriesFulfilled = createAction(
  "data/getUserEntries/fulfilled"
)
export const getUserEntriesNoEntries = createAction(
  "data/getUserEntries/noEntries"
)

const initialFilters = {
  year: "",
  month: "",
  payer: "",
  category: "",
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    entries: [],
    categories: [],
    payers: [],
    years: [],
    surfaceData: [],
    filters: initialFilters,
    filteredStack: [],
    filterables: {
      year: { values: [] },
      month: { values: [] },
      category: { values: [] },
      payer: { values: [] },
    },
  },
  reducers: {
    initFilterables(state) {
      state.filterables = getInitFilterables(state)
    },
    setFilter(state, { payload: { key, value } }) {
      state.filters[key] = value
    },
    updateFilteredStack(state, { payload }) {
      state.filteredStack = payload
    },
    updateSurfaceData(state, { payload }) {
      state.surfaceData = payload
    },
    updateFilterables(state, { payload }) {
      state.filterables = payload
    },
  },
  extraReducers: {
    [getUserEntriesFulfilled]: (state, { payload }) => {
      return merge(state, over(lensProp("entries"), values, payload))
    },
    "data/initData/fulfilled": (_, action) => action.payload,
    "data/getYear/fulfilled": (state, action) => {
      const { year, data } = action.payload
      state[year] = data
    },
  },
})

export const dataReducer = dataSlice.reducer
export const {
  setFilter,
  updateSurfaceData,
  updateFilteredStack,
  updateFilterables,
  initFilterables,
} = dataSlice.actions
