import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  signedIn: boolean
  email: string | null
  uid: string | null
  touched: boolean
}

const initialState: AuthState = {
  signedIn: false,
  email: null,
  uid: null,
  touched: false,
}

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<Pick<AuthState, "uid" | "email">>) {
      state.signedIn = true
      state.uid = action.payload.uid
      state.email = action.payload.email
    },
    signOut(state) {
      state.signedIn = false
      state.email = null
      state.uid = null
      state.touched = true
    },
  },
})

export const authenticationReducer = authenticationSlice.reducer
export const { signIn, signOut } = authenticationSlice.actions
