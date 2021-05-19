import { combineEpics } from "redux-observable"
import { filterDataEpic } from "./filterDataEpic/filterDataEpic"
import { updateSurfaceDataEpic } from "./updateSurfaceDataEpic"
import { getUserEntriesEpic } from "./getUserEntriesEpic"
import { setInitialFiltersEpic } from "./setInitialFiltersEpic"
import { logEpic } from "./logEpic"

export const rootEpic = combineEpics(
  // logEpic,
  getUserEntriesEpic,
)
