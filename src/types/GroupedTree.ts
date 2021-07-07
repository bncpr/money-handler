import { Entry } from "./Entry"

type IndexedEntryArray = {
  [x: string]: Entry[]
}

export type GroupedTree = {
  year: IndexedEntryArray
  payer: IndexedEntryArray
  category: IndexedEntryArray
}
