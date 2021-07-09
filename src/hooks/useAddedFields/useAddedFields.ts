import { useEffect, useState } from "react"
import * as R from "ramda"
import { Entry } from "../../types/Entry"

interface StateAddedFields {
  payer: string[]
  category: string[]
}

const initialState: StateAddedFields = {
  payer: [],
  category: [],
}

export const useAddedFields = ({
  values,
  setValues,
  isOpen,
}: {
  values: Entry
  setValues: (field: keyof Entry, value: string) => void
  isOpen: boolean
}) => {
  const [addedFields, setAddedFields] = useState<StateAddedFields>(initialState)

  const onAddField = (field: keyof StateAddedFields, value: string) => {
    setAddedFields(
      R.over(R.lensProp(field), R.append(R.toLower(value)), addedFields),
    )
    setValues(field, R.toLower(value))
  }

  const onRemoveAddedField = (field: keyof StateAddedFields, value: string) => {
    setAddedFields(
      R.over(R.lensProp(field), R.reject(R.equals(value)), addedFields),
    )
    if (values[field] === value) {
      setValues(field, "")
    }
  }

  const resetAddedFields = () => {
    setAddedFields(initialState)
  }

  useEffect(() => {
    if (!isOpen) {
      setAddedFields(initialState)
    }
  }, [isOpen])

  return { addedFields, onAddField, onRemoveAddedField, resetAddedFields }
}
