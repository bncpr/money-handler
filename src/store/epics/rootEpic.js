import { combineEpics } from "redux-observable"
import { logEpic } from "./logEpic"
import { fetchUserEntriesEpic } from "./fetchUserEntriesEpic"

export const rootEpic = combineEpics(logEpic, fetchUserEntriesEpic)
