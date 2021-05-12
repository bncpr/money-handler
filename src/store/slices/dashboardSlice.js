import { createSlice } from "@reduxjs/toolkit"
import { colorsGenerator } from "../../utility/colors"
import {
  extractCategoriesFromYear,
  extractPayersFromYear,
} from "../../utility/utility"

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isLoading: false,
    year: null,
    month: null,
    chartType: "bar",
    showBy: "month",
    series: false,
    withPayers: false,
    withStacks: false,
    withCategories: false,
    payerColors: {},
    categoryColors: {},
  },
  reducers: {
    turnLoadingOn(state) {
      state.isLoading = true
    },
    turnLoadingOff(state) {
      state.isLoading = false
    },
    changeYear(state, { payload }) {
      state.year = payload
    },
    changeShowBy(state, { payload }) {
      state.showBy = payload
    },
    toggleWithPayers(state) {
      state.withPayers = !state.withPayers
      state.series = state.withPayers ? "payer" : false
      state.withCategories = false
    },
    toggleWithStacks(state) {
      state.withStacks = !state.withStacks
    },
    toggleWithCategories(state) {
      state.withCategories = !state.withCategories
      state.series = state.withCategories ? "category" : false
      state.withPayers = false
    },
  },
  extraReducers: {
    "data/getYear/fulfilled": (state, action) => {
      const { data } = action.payload
      const categories = extractCategoriesFromYear(data)
      const payers = extractPayersFromYear(data)
      categories.forEach(category => {
        if (!(category in state.categoryColors)) {
          state.categoryColors[category] = colorsGenerator.next().value
        }
      })
      payers.forEach(payer => {
        if (!(payer in state.payerColors)) {
          state.payerColors[payer] = colorsGenerator.next().value
        }
      })
      return state
    },
  },
})

export const dashboardReducer = dashboardSlice.reducer
export const {
  turnLoadingOff,
  turnLoadingOn,
  changeYear,
  toggleWithPayers,
  toggleWithStacks,
  toggleWithCategories,
  changeShowBy,
} = dashboardSlice.actions
