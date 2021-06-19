import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateUserFields } from "../../firebase"

export const updateUserEntriesThunk = createAsyncThunk(
  "data/updateEntryInDb",
  async ({ entryId, entry }, { getState, rejectWithValue }) => {
    const updates = {
      [`entries/${entryId}`]: entry,
    }
    const uid = getState().authentication.uid
    try {
      await updateUserFields(uid, updates)
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  },
)
