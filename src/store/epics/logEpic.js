import { ignoreElements, tap } from "rxjs/operators"

export function logEpic(actions) {
  return actions.pipe(tap(console.log), ignoreElements())
}
