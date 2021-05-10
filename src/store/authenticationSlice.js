import { createSlice } from "@reduxjs/toolkit"

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    signedIn: false,
    user: null,
  },
  reducers: {
    signIn(state, action) {
      state.user = action.payload
      state.signedIn = true
    },
    signOut(state) {
      state.user = null
      state.signedIn = false
    },
  },
})

export const authenticationReducer = authenticationSlice.reducer
export const { signIn, signOut } = authenticationSlice.actions
