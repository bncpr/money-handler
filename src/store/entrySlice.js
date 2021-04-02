import { createSlice } from "@reduxjs/toolkit";

const entrySlice = createSlice({
  name: 'entry',
  initialState: {
    date: new Date().toJSON().slice(0, 10),
    payer: '',
    value: '',
    category: '',
    subcategories: {}
  },
  reducers: {
    changeValue(state, action) {
      let { name, value } = action.payload
      state[name] = value
    },
    tickTagValue(state, action) {
      const { name, checked } = action.payload
      state.subcategories[name] = !checked
    }
  }
})

export const entryReducer = entrySlice.reducer
export const { changeValue, tickTagValue } = entrySlice.actions