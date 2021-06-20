import { createAsyncThunk } from "@reduxjs/toolkit"
import { removeEntry as removeEntryFB } from "../../firebase"
import { showError } from "../slices/errorSlice"

export const removeEntryFromDbThunk = createAsyncThunk(
  "data/removeEntryFromDb",
  async (entryId, { dispatch, getState, rejectWithValue }) => {
    const uid = getState().authentication.uid
    try {
      await removeEntryFB(uid, entryId)
    } catch (error) {
      dispatch(showError({ errorMessage: "Could not update entry" }))
      return rejectWithValue({ errorMessage: error.message })
    }
  },
)
