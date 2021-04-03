import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  errorMessage: null,
  attemptedFetch: false
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError(state, action) { Object.assign(state, action.payload); state.attemptedFetch = true },
    hideError(state) { state.error = false; state.errorMessage = null }
  }
})

export const errorReducer = errorSlice.reducer
export const { showError, hideError } = errorSlice.actions