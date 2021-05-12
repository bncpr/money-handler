import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  signedIn: false,
  email: null,
  uid: null,
}

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    signIn(state, { payload: { uid, email } }) {
      state.signedIn = true
      state.uid = uid
      state.email = email
    },
    signOut() {
      return initialState
    },
  },
})

export const authenticationReducer = authenticationSlice.reducer
export const { signIn, signOut } = authenticationSlice.actions
