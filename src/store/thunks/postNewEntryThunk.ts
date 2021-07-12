import { createAsyncThunk, nanoid } from "@reduxjs/toolkit"
import * as R from "ramda"
import { pushNewEntry, updateUserFields } from "../../api/firebase/firebase"
import { Entry } from "../../types/Entry"
import { showError } from "../slices/errorSlice"
import { updateEntries } from "../slices/groupedEntriesSlice/groupedEntriesSlice"
import { AppDispatch, RootState } from "../store"

export const postNewEntryThunk = createAsyncThunk<
  any,
  Entry,
  { state: RootState; dispatch: AppDispatch }
>("data/postNewEntry", async (entry, { getState, dispatch }) => {
  const uid = getState().authentication.uid
  try {
    if (!uid) {
      const entries = getState().data.entries
      const entryId = nanoid(5)
      const entryWithId = R.assoc("id", entryId, entry)
      dispatch(
        updateEntries({
          entries: R.assoc(entryId, entryWithId, entries),
        }),
      )
    } else {
      const entryId = (await pushNewEntry(uid)).key
      const entryWithId = R.assoc("id", entryId, entry)
      const updates = {
        [`entries/${entryId}`]: entryWithId,
      }
      await updateUserFields(uid, updates)
    }
  } catch {
    dispatch(showError("Could not post new entry"))
  }
})
