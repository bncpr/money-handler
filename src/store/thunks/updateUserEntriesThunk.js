import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateUserFields } from "../../firebase"
import { updateEntry, updateFields } from "../slices/dataSlice"
import * as R from "ramda"

export const updateUserEntriesThunk = createAsyncThunk(
  "data/updateEntryInDb",
  async (
    { entryId, entry, addedFields },
    { dispatch, getState, rejectWithValue }
  ) => {
    const fields = getState().data.fields
    const updatedFields = R.mergeWith(R.concat, fields, addedFields)
    const updates = {
      [`entries/${entryId}`]: entry,
      "/fields": updatedFields,
    }
    const uid = getState().authentication.uid
    dispatch(updateEntry({ entryId, entry }))
    dispatch(updateFields(updatedFields))
    try {
      await updateUserFields(uid, updates)
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)
