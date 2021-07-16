import { useEffect, useState } from "react"
import { addProp } from "remeda"
import { Entry } from "../../types/Entry"
import {
  SortedValueState,
  SortField, SortState, SortValue
} from "../../types/SortValue"
import { sortCompMap } from "../../utility/sorting/sortCompMap"

const initialState: SortState = {
  date: "",
  value: "",
  payer: "",
  category: "",
}

export const useSorting = (data: Entry[]) => {
  const [sorted, setSorted] = useState<Entry[]>([])
  const [sortedValue, setSortedValue] = useState<SortedValueState>({
    field: "",
    value: "",
  })
  const [sortState, setSortState] = useState(initialState)

  // fn_2 == curry two arguments
  const onChangeSort_ = (field: SortField) => (value: SortValue) => {
    setSortState(addProp(initialState, field, value))
    setSortedValue({ field, value })
  }

  useEffect(() => {
    const { field, value } = sortedValue
    setSorted(sortEntries(field, value, data))
  }, [data, sortedValue])

  return { sorted, onChangeSort_, sortState }
}

function sortEntries(field: SortField | "", value: SortValue, data: Entry[]) {
  if (field && value) {
    if (field === "value") {
      return [...data].sort(({ [field]: a }: Entry, { [field]: b }: Entry) =>
        sortCompMap[value].number(a, b),
      )
    } else {
      return [...data].sort(({ [field]: a }: Entry, { [field]: b }: Entry) =>
        sortCompMap[value].string(a, b),
      )
    }
  }
  return data
}
