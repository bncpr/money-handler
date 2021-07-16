export type SortValue = "ascend" | "descend" | ""
export type SortField = "date" | "value" | "payer" | "category"
export type SortState = Record<SortField, SortValue>
export interface SortedValueState {
  field: SortField | ""
  value: SortValue
}