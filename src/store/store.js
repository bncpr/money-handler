import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { createEpicMiddleware } from "redux-observable"
import { authenticationReducer } from "./slices/authenticationSlice"
import { dashboardReducer } from "./slices/dashboardSlice"
import { dataReducer } from "./slices/dataSlice"
import { errorReducer } from "./slices/errorSlice"
import { groupedEntriesReducer } from "./slices/groupedEntriesSlice/groupedEntriesSlice"
import { loadingReducer } from "./slices/loadingSlice"
import { loginReducer } from "./slices/loginSlice"



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
