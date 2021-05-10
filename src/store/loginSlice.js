import { createSlice } from "@reduxjs/toolkit"

const loginSlice = createSlice({
  name: "login",
  initialState: {
    signIn: true,
    signUp: false,
    email: "",
    password: "",
  },
  reducers: {
    changeInputValue(state, { payload: { key, value } }) {
      state[key] = value
    },
    toggleSignMode(state) {
      if (state.signIn) {
        state.signIn = false
        state.signUp = true
      } else {
        state.signIn = true
        state.signUp = false
      }
    },
  },
})

export const loginReducer = loginSlice.reducer
export const { changeInputValue, toggleSignMode } = loginSlice.actions
