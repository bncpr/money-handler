import * as R from "ramda"
import { useEffect, useState } from "react"
import { addProp } from "remeda"
import { Entry } from "../../types/Entry"

type SortValue = "ascend" | "descend" | ""
type SortField = keyof SortState
type SortedValueState = {
  field: SortField | ""
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

export const useSorting = ({ data }: { data: Entry[] }) => {
  const [sorted, setSorted] = useState<Entry[]>([])
  const [sortedValue, setSortedValue] = useState<SortedValueState>({
    field: "",
    value: "",
  })
  const [sortState, setSortState] = useState(initialState)

  const onChangeSort = R.curry((field: SortField, value: SortValue) => {
    const newState = addProp(initialState, field, value)
    setSortState(newState)
    setSortedValue({ field, value })
  })

  useEffect(() => {
    const { field, value } = sortedValue
    setSorted(sortEntries(field, value, data))
  }, [data, sortedValue])

  return { sorted, onChangeSort, sortState }
}

function sortEntries(field: SortField | "", value: SortValue, data: Entry[]) {
  if (field && value) {
    if (field === "value") {
      return [...data].sort(({ [field]: a }: Entry, { [field]: b }: Entry) => {
        return compMap[value].number(a, b)
      })
    } else {
      return [...data].sort(({ [field]: a }: Entry, { [field]: b }: Entry) => {
        return compMap[value].string(a, b)
      })
    }
  }
  return data
}

const compMap = {
  ascend: {
    number: (a: number, b: number) => a - b,
    string: (a: string, b: string) => a.localeCompare(b),
  },
  descend: {
    number: (a: number, b: number) => b - a,
    string: (a: string, b: string) => b.localeCompare(a),
  },
} as const
