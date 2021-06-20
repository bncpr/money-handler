import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateUserFields } from "../../firebase"
import { showError } from "../slices/errorSlice"

export const updateUserEntriesThunk = createAsyncThunk(
  "data/updateEntryInDb",
  async ({ entryId, entry }, { getState, dispatch, rejectWithValue }) => {
    const updates = {
      [`entries/${entryId}`]: entry,
    }
    const uid = getState().authentication.uid
    try {
      await updateUserFields(uid, updates)
    } catch (error) {
      dispatch(showError({ errorMessage: "Could not update entry" }))
      return rejectWithValue({ error: error.message })
    }
  },
)
