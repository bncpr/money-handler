import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { authenticationReducer } from "./slices/authenticationSlice"
import { dataReducer } from "./slices/dataSlice"
import { errorReducer } from "./slices/errorSlice"
import { groupedEntriesReducer } from "./slices/groupedEntriesSlice/groupedEntriesSlice"
import { loadingReducer } from "./slices/loadingSlice"

export const store = configureStore({
  reducer: {
    data: dataReducer,
    error: errorReducer,
    authentication: authenticationReducer,
    groupedEntries: groupedEntriesReducer,
    loading: loadingReducer,
  },
  middleware: [...getDefaultMiddleware()],
})
