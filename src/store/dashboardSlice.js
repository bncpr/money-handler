import { createSlice } from "@reduxjs/toolkit"
import { colorsGenerator } from "../utility/colors"
import {
  extractCategoriesFromYear,
  extractPayersFromYear,
} from "../utility/utility"

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    year: null,
    month: null,
    withPayers: false,
    payerColors: {},
    categoryColors: {},
  },
  reducers: {
    changeYear(state, action) {
      state.year = action.payload
    },
    toggleWithPayers(state) {
      state.withPayers = !state.withPayers
    },
  },
  extraReducers: {
    "data/getYear/fulfilled": (state, action) => {
      const categories = extractCategoriesFromYear(action.payload.data)
      const payers = extractPayersFromYear(action.payload.data)
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
export const { changeYear, toggleWithPayers } = dashboardSlice.actions
