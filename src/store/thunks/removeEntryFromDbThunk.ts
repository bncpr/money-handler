import { createStandaloneToast } from "@chakra-ui/react"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { removeEntry as removeEntryFB } from "../../api/firebase/firebase"
import { showError } from "../slices/errorSlice"
import { updateEntries } from "../slices/groupedEntriesSlice/groupedEntriesSlice"
import * as R from "ramda"

const toast = createStandaloneToast()

export const removeEntryFromDbThunk = createAsyncThunk(
  "data/removeEntryFromDb",
  async (entryId: string, { dispatch, getState, rejectWithValue }) => {
    const uid = (getState() as any).authentication.uid
    try {
      if (!uid) {
        const entries = (getState() as any).data.entries
        dispatch(updateEntries({ entries: R.omit([entryId], entries) }))
      } else {
        console.log(entryId)
        await removeEntryFB(uid, entryId)
      }
      toast({
        title: "Entry Deleted",
        status: "success",
        isClosable: true,
        duration: 1200,
        variant: "solid",
      })
    } catch (error) {
      dispatch(showError("Could not update entry"))
      return rejectWithValue({ errorMessage: error.message })
    }
  },
)