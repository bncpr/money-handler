import { createAsyncThunk } from "@reduxjs/toolkit"
import * as R from "ramda"
import { pushNewEntry, updateUserFields } from "../../firebase"
import { showError } from "../slices/errorSlice"

export const postNewEntryThunk = createAsyncThunk(
  "data/postNewEntry",
  async ({ entry }, { getState, dispatch, rejectWithValue }) => {
    const uid = getState().authentication.uid
    try {
      const entryId = (await pushNewEntry(uid)).key
      const entryWithId = R.assoc("id", entryId, entry)
      const updates = {
        [`entries/${entryId}`]: entryWithId,
      }
      await updateUserFields(uid, updates)
    } catch (error) {
      dispatch(showError({ errorMessage: "Could not post new entry" }))
      return rejectWithValue({ errorMessage: error.message })
    }
  },
)
