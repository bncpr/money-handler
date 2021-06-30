import { createStandaloneToast } from "@chakra-ui/react"
import { createAsyncThunk } from "@reduxjs/toolkit"
import * as R from "ramda"
import { pushNewEntry, updateUserFields } from "../../api/firebase/firebase"
import { showError } from "../slices/errorSlice"
import { updateEntries } from "../slices/groupedEntriesSlice/groupedEntriesSlice"

const toast = createStandaloneToast()

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
      if (!uid) {
        const entries = getState().data.entries
        dispatch(
          updateEntries({ entries: R.assoc(entryId, entryWithId, entries) }),
        )
      } else {
        await updateUserFields(uid, updates)
      }
      toast({
        title: "Entry Added",
        status: "success",
        isClosable: true,
        duration: 1200,
        variant: "solid",
      })
    } catch (error) {
      dispatch(showError({ errorMessage: "Could not post new entry" }))
      return rejectWithValue({ errorMessage: error.message })
    }
  },
)
