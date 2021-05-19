import { createSlice } from "@reduxjs/toolkit"
import { zipObj } from "ramda"
import { colorsGenerator } from "../../utility/colors"
import { getUserEntriesFulfilled } from "./dataSlice"

const assignColors = (array, colorsGen) =>
  zipObj(
    array,
    array.map(() => colorsGen.next().value)
  )

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    colors: {},
  },
  extraReducers: {
    [getUserEntriesFulfilled]: (
      state,
      { payload: { categories, payers } }
    ) => {
      const categoryColors = assignColors(categories, colorsGenerator)
      const payerColors = assignColors(payers, colorsGenerator)
      state.colors = { categoryColors, payerColors }
    },
  },
})

export const dashboardReducer = dashboardSlice.reducer
