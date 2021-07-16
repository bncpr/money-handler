import { createAsyncThunk } from "@reduxjs/toolkit"
import { assoc } from "ramda"
import { updateUserFields } from "../../api/firebase/firebase"
import { Entry } from "../../types/Entry"
import { showError } from "../slices/errorSlice"
import { processEntries } from "./processEntries/processEntries"
import { AppDispatch, RootState } from "../store"

export const updateUserEntriesThunk = createAsyncThunk<
  any,
  { entryId: string; entry: Entry },
  { state: RootState; dispatch: AppDispatch }
>(
  "data/updateEntryInDb",
  async ({ entryId, entry }, { getState, dispatch }) => {
    const updates = {
      [`entries/${entryId}`]: entry,
    }
    const uid = getState().authentication.uid
    try {
      if (!uid) {
        const entries = getState().data.entries
        dispatch(processEntries({ entries: assoc(entryId, entry, entries) }))
      } else {
        await updateUserFields(uid, updates)
      }
    } catch (error) {
      dispatch(showError("Could not update entry"))
    }
  },
)
