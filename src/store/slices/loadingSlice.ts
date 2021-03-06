import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
    isLoadingFilter: false,
  },
  reducers: {
    setLoadingOn(state) {
      state.isLoading = true
    },
    setLoadingOff(state) {
      state.isLoading = false
    },
    setLoadingFilter(state, action: PayloadAction<boolean>) {
      state.isLoadingFilter = action.payload
    },
  },
})

export const loadingReducer = loadingSlice.reducer

export const { setLoadingOff, setLoadingOn, setLoadingFilter } =
  loadingSlice.actions
