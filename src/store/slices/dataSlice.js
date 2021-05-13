import { createSlice } from "@reduxjs/toolkit"
import { withDefaultArrays } from "../../utility/utility"

const dataSlice = createSlice({
  name: "data",
  initialState: {
    entries: {},
    categories: [],
    payers: [],
    years: [],
    filteredData: [],
    filters: { year: "", month: "", category: "", payer: "" },
    filterables: {
      years: [],
      categories: [],
      payers: [],
    },
  },
  reducers: {
    getUserEntriesFulfilled(state, { payload }) {
      return Object.assign(state, payload)
    },
    setFilter(state, { payload: { key, value } }) {
      state.filters[key] = value || ""
    },
  },
  extraReducers: {
    "data/initData/fulfilled": (_, action) => action.payload,
    "data/getYear/fulfilled": (state, action) => {
      const { year, data } = action.payload
      state[year] = data
    },
  },
})

export const dataReducer = dataSlice.reducer
export const { getUserEntriesFulfilled, setFilter } = dataSlice.actions
