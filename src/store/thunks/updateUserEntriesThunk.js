import { createStandaloneToast } from "@chakra-ui/react"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { assoc } from "ramda"
import { updateUserFields } from "../../firebase"
import { showError } from "../slices/errorSlice"
import { updateEntries } from "../slices/groupedEntriesSlice/groupedEntriesSlice"

const toast = createStandaloneToast()

export const updateUserEntriesThunk = createAsyncThunk(
  "data/updateEntryInDb",
  async ({ entryId, entry }, { getState, dispatch, rejectWithValue }) => {
    const updates = {
      [`entries/${entryId}`]: entry,
    }
    const uid = getState().authentication.uid
    try {
      if (!uid) {
        const entries = getState().data.entries
        dispatch(updateEntries({ entries: assoc(entryId, entry, entries) }))
      } else {
        await updateUserFields(uid, updates)
      }
      toast({
        title: "Entry Updated",
        status: "success",
        isClosable: true,
        duration: 1200,
        variant: "solid",
      })
    } catch (error) {
      dispatch(showError({ errorMessage: "Could not update entry" }))
      return rejectWithValue({ error: error.message })
    }
  },
)
