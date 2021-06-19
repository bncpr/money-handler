import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { createEpicMiddleware } from "redux-observable"

import { dataReducer } from "./slices/dataSlice"
import { errorReducer } from "./slices/errorSlice"
import { dashboardReducer } from "./slices/dashboardSlice"
import { loginReducer } from "./slices/loginSlice"
import { authenticationReducer } from "./slices/authenticationSlice"

import { rootEpic } from "./epics/_rootEpic"
import { groupedEntriesReducer } from "./slices/groupedEntriesSlice/groupedEntriesSlice"

const epicMiddleware = createEpicMiddleware()

export const store = configureStore({
  reducer: {
    data: dataReducer,
    dashboard: dashboardReducer,
    error: errorReducer,
    login: loginReducer,
    authentication: authenticationReducer,
    groupedEntries: groupedEntriesReducer,
  },
  middleware: [...getDefaultMiddleware(), epicMiddleware],
})

// epicMiddleware.run(rootEpic)
