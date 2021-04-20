// import { createSlice } from "@reduxjs/toolkit";
// import { addTag } from "./dataSlice";

// const initialState = {
//   date: new Date().toJSON().slice(0, 10),
//   payer: '',
//   value: '',
//   category: '',
//   subcategories: {}
// }

// const entrySlice = createSlice({
//   name: 'entry',
//   initialState,
//   reducers: {
//     resetEntryState(state) { Object.assign(state, initialState) },
//     changeValue(state, action) {
//       let { name, value } = action.payload
//       state[name] = value
//     },
//     tickTagValue(state, action) {
//       const { name, checked } = action.payload
//       state.subcategories[name] = !checked
//     }
//   },
//   extraReducers: {
//     [addTag]: (state, action) => {
//       const { name, value } = action.payload
//       if (name === 'tag') {
//         state.subcategories[value] = true
//       } else {
//         state[name] = value
//       }
//     }
//   }
// })

// export const entryReducer = entrySlice.reducer
// export const { changeValue, tickTagValue, resetEntryState } = entrySlice.actions