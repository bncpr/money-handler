import { createSlice } from "@reduxjs/toolkit"
const initialErrors = { email: "", password: "", other: "" }

const loginSlice = createSlice({
  name: "login",
  initialState: {
    signIn: true,
    email: "",
    password: "",
    errors: { ...initialErrors },
  },
  reducers: {
    changeInputValue(state, { payload: { key, value } }) {
      state.errors = { ...initialErrors }
      state[key] = value
    },
    toggleSignMode(state) {
      state.errors = { ...initialErrors }
      state.signIn = !state.signIn
    },
    updateError(state, { payload: { key, value } }) {
      state.errors[key] = value
    },
  },
})

export const loginReducer = loginSlice.reducer
export const {
  changeInputValue,
  toggleSignMode,
  updateError,
} = loginSlice.actions
