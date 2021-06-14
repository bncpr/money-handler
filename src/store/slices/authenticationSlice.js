import { createSlice } from "@reduxjs/toolkit"

const initial = {
  signedIn: false,
  email: null,
  uid: null,
}

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: { signedIn: undefined },
  reducers: {
    signIn(state, { payload: { uid, email } }) {
      state.signedIn = true
      state.uid = uid
      state.email = email
    },
    signOut() {
      return initial
    },
  },
})

export const authenticationReducer = authenticationSlice.reducer
export const { signIn, signOut } = authenticationSlice.actions
