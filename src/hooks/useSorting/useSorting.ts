import * as R from "ramda"
import { useEffect, useState } from "react"
import { addProp } from "remeda"

type SortValue = "ascend" | "descend" | ""
type SortField = keyof SortState | ""
type SortedValueState = {
  field: SortField
  value: SortValue
}

type SortState = {
  date: SortValue
  value: SortValue
  payer: SortValue
  category: SortValue
}

const initialState: SortState = {
  date: "",
  value: "",
  payer: "",
  category: "",
}

const orderMap = {
  ascend: R.ascend,
  descend: R.descend,
}

export const useSorting = ({ data }: { data: any[] }) => {
  const [sorted, setSorted] = useState<any[]>(data)
  const [sortedValue, setSortedValue] = useState<SortedValueState>({
    field: "",
    value: "",
  })
  const [sortState, setSortState] = useState(initialState)

  const onChangeSort = R.curry((field: keyof SortState, value: SortValue) => {
    const newState = addProp(initialState, field, value)
    setSortState(newState)
    setSortedValue({ field, value })
  })

  useEffect(() => {
    const { field, value } = sortedValue
    const _sorted = !value ? data : R.sort(orderMap[value](R.prop(field)), data)
    setSorted(_sorted)
  }, [data, sortedValue])

  return { sorted, onChangeSort, sortState }
}
