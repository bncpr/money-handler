import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  error: false,
  errorMessage: "",
}

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    showError(state, { payload }) {
      state.error = true
      state.errorMessage = payload.errorMessage
    },
    hideError() {
      return initialState
    },
  },
})

export const errorReducer = errorSlice.reducer
export const { showError, hideError } = errorSlice.actions
