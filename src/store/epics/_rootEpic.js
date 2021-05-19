import { combineEpics } from "redux-observable"
import { getUserEntriesEpic } from "./getUserEntriesEpic"
import { logEpic } from "./logEpic"

export const rootEpic = combineEpics(
  // logEpic,
  getUserEntriesEpic,
)
