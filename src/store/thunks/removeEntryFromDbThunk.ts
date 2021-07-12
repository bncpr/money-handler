import { createAsyncThunk } from "@reduxjs/toolkit"
import * as R from "ramda"
import { removeEntry } from "../../api/firebase/firebase"
import { showError } from "../slices/errorSlice"
import { updateEntries } from "../slices/groupedEntriesSlice/groupedEntriesSlice"
import { AppDispatch, RootState } from "../store"

export const removeEntryFromDbThunk = createAsyncThunk<
  any,
  string,
  { dispatch: AppDispatch; state: RootState }
>("data/removeEntryFromDb", async (entryId, { dispatch, getState }) => {
  const uid = getState().authentication.uid
  try {
    if (!uid) {
      const entries = getState().data.entries
      dispatch(updateEntries({ entries: R.omit([entryId], entries) }))
    } else {
      await removeEntry(uid, entryId)
    }
  } catch {
    dispatch(showError("Could not update entry"))
  }
})
