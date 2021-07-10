import { Entry } from "./Entry"

export type DictEntryArray = {
  [x: string]: Entry[]
}

export type GroupedTree = {
  year: DictEntryArray
  payer: DictEntryArray
  category: DictEntryArray
}
