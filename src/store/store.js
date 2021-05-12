import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { createEpicMiddleware } from "redux-observable"

import { dataReducer } from "./slices/dataSlice"
import { errorReducer } from "./slices/errorSlice"
import { dashboardReducer } from "./slices/dashboardSlice"
import { loginReducer } from "./slices/loginSlice"
import { authenticationReducer, signIn } from "./slices/authenticationSlice"

import { rootEpic } from "./epics/rootEpic"

const epicMiddleware = createEpicMiddleware()

export const store = configureStore({
  reducer: {
    data: dataReducer,
    dashboard: dashboardReducer,
    error: errorReducer,
    login: loginReducer,
    authentication: authenticationReducer,
  },
  middleware: [...getDefaultMiddleware(), epicMiddleware],
})

epicMiddleware.run(rootEpic)
