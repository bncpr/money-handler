import { createSlice } from "@reduxjs/toolkit"

const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
  },
  reducers: {
    changeInputValue(state, { payload: { key, value } }) {
      state[key] = value
    },
  },
})

export const loginReducer = loginSlice.reducer
export const { changeInputValue } = loginSlice.actions
