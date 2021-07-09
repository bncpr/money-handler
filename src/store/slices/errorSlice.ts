import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  error: false,
  errorMessage: "",
}

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    showError(state, action: PayloadAction<string>) {
      state.error = true
      state.errorMessage = action.payload
    },
    hideError() {
      return initialState
    },
  },
})

export const errorReducer = errorSlice.reducer
export const { showError, hideError } = errorSlice.actions
