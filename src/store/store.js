import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { createEpicMiddleware } from "redux-observable"

import { dataReducer } from "./slices/dataSlice"
import { errorReducer } from "./slices/errorSlice"
import { dashboardReducer } from "./slices/dashboardSlice"
import { loginReducer } from "./slices/loginSlice"
import { authenticationReducer } from "./slices/authenticationSlice"

import { rootEpic } from "./epics/_rootEpic"
import { groupedEntriesReducer } from "./slices/groupedEntriesSlice/groupedEntriesSlice"
import { loadingReducer } from "./slices/loadingSlice"

const epicMiddleware = createEpicMiddleware()

export const store = configureStore({
  reducer: {
    data: dataReducer,
    dashboard: dashboardReducer,
    error: errorReducer,
    login: loginReducer,
    authentication: authenticationReducer,
    groupedEntries: groupedEntriesReducer,
    loading: loadingReducer,
  },
  middleware: [...getDefaultMiddleware(), epicMiddleware],
})

// epicMiddleware.run(rootEpic)
