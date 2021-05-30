import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  updateEntry as updateEntryInDb,
} from "../../firebase"
import { updateEntry } from "../slices/dataSlice"

export const updateEntryInDbThunk = createAsyncThunk(
  "data/updateEntryInDb",
  async ({ entryId, entry }, { dispatch, getState, rejectWithValue }) => {
    try {
      const uid = getState().authentication.uid
      await updateEntryInDb(uid, entryId, entry)
      dispatch(updateEntry({ entryId, entry }))
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)