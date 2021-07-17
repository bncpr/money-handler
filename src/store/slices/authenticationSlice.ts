import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as R from "remeda"

const initialState = {
  signedIn: false,
  email: "",
  uid: "",
  touched: false,
}

type AuthState = typeof initialState

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<Pick<AuthState, "uid" | "email">>) {
      state.signedIn = true
      state.uid = action.payload.uid
      state.email = action.payload.email
    },
    signOut() {
      return R.addProp(initialState, "touched", true)
    },
  },
})

export const authenticationReducer = authenticationSlice.reducer
export const { signIn, signOut } = authenticationSlice.actions
