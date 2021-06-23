import { combineEpics } from "redux-observable"
import { getUserEntriesEpic } from "./getUserEntriesEpic"

export const rootEpic = combineEpics(
  // logEpic,
  getUserEntriesEpic,
)
