import { createAsyncThunk } from "@reduxjs/toolkit"
import { removeEntry as removeEntryFB } from "../../firebase"
import { removeEntry } from "../slices/dataSlice"

export const removeEntryFromDbThunk = createAsyncThunk(
  "data/removeEntryFromDb",
  async (entryId, { dispatch, getState, rejectWithValue }) => {
    try {
      const uid = getState().authentication.uid
      await removeEntryFB(uid, entryId)
      dispatch(removeEntry(entryId))
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)


