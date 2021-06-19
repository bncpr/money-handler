import { createAsyncThunk } from "@reduxjs/toolkit"
import * as R from "ramda"
import { pushNewEntry, updateUserFields } from "../../firebase"

export const postNewEntryThunk = createAsyncThunk(
  "data/postNewEntry",
  async ({ entry }, { getState, rejectWithValue }) => {
    const uid = getState().authentication.uid
    try {
      const entryId = (await pushNewEntry(uid)).key
      const entryWithId = R.assoc("id", entryId, entry)
      const updates = {
        [`entries/${entryId}`]: entryWithId,
      }
      await updateUserFields(uid, updates)
    } catch (error) {
      return rejectWithValue({ errorMessage: "could not post new entry" })
    }
  },
)
