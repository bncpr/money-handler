import { createAsyncThunk } from "@reduxjs/toolkit"
import { createUser, signInUser } from "../../firebase"
import { showError } from "../slices/errorSlice"

const authThunk = (type, asyncProcess) =>
  createAsyncThunk(
    type,
    async ({ email, password }, { dispatch, rejectWithValue }) => {
      try {
        await asyncProcess(email, password)
      } catch (error) {
        dispatch(showError({ errorMessage: error.message }))
        return rejectWithValue({ error: error.message })
      }
    },
  )

export const signInUserThunk = authThunk("auth/signInUser", signInUser)
export const createUserThunk = authThunk("auth/createUser", createUser)
