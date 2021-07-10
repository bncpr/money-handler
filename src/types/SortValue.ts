export type SortValue = "ascend" | "descend" | ""
export interface SortState {
  date: SortValue
  value: SortValue
  payer: SortValue
  category: SortValue
}
export type SortField = keyof SortState
export interface SortedValueState {
  field: SortField | ""
  value: SortValue
}
