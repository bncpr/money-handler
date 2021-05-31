import { createAsyncThunk } from "@reduxjs/toolkit"
import { pushNewEntry, updateUserFields } from "../../firebase"
import { updateEntry, updateFields } from "../slices/dataSlice"
import * as R from "ramda"

export const postNewEntryThunk = createAsyncThunk(
  "data/postNewEntry",
  async (
    { entry, addedFields },
    { dispatch, getState, rejectWithValue }
  ) => {
    const uid = getState().authentication.uid
    const fields = getState().data.fields
    const updatedFields = R.mergeWith(R.concat, fields, addedFields)
    try {
      const entryId = (await pushNewEntry(uid)).key
      const entryWithId = R.assoc("id", entryId, entry)
      const updates = {
        [`entries/${entryId}`]: entryWithId,
        "/fields": updatedFields,
      }
      await updateUserFields(uid, updates)
      dispatch(updateEntry({ entryId, entry: entryWithId }))
      dispatch(updateFields(updatedFields))
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)
