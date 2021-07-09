import { Entry } from "./Entry";


export interface DataSliceState {
  entries: { [id: string]: Entry; };
}
