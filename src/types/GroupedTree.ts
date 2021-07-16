import { Entry } from "./Entry"

export type GroupedTree = {
  year: Record<string, Entry[]>
  payer: Record<string, Entry[]>
  category: Record<string, Entry[]>
}
