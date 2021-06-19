import { createAsyncThunk } from "@reduxjs/toolkit"
import { removeEntry as removeEntryFB } from "../../firebase"
import { removeEntry } from "../slices/dataSlice"

export const removeEntryFromDbThunk = createAsyncThunk(
  "data/removeEntryFromDb",
  async (entryId, { dispatch, getState, rejectWithValue }) => {
    const uid = getState().authentication.uid
    try {
      await removeEntryFB(uid, entryId)
      // dispatch(removeEntry(entryId))
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message })
    }
  }
)
