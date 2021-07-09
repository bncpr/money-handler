import { createStandaloneToast } from "@chakra-ui/react"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { assoc } from "ramda"
import { updateUserFields } from "../../api/firebase/firebase"
import { showError } from "../slices/errorSlice"
import { updateEntries } from "../slices/groupedEntriesSlice/groupedEntriesSlice"

const toast = createStandaloneToast()

export const updateUserEntriesThunk = createAsyncThunk(
  "data/updateEntryInDb",
  async ({ entryId, entry }: any, { getState, dispatch, rejectWithValue }) => {
    const updates = {
      [`entries/${entryId}`]: entry,
    }
    const uid = (getState() as any).authentication.uid
    try {
      if (!uid) {
        const entries = (getState() as any).data.entries
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
      dispatch(showError("Could not update entry"))
      return rejectWithValue({ error: error.message })
    }
  },
)
