import { useEffect, useState } from "react"
import * as R from "ramda"

export const useAddedFields = (formik, isOpen) => {
  const [addedFields, setAddedFields] = useState({
    payer: [],
    category: [],
  })

  const onAddField = (field, value) => {
    setAddedFields(
      R.over(R.lensProp(field), R.append(R.toLower(value)), addedFields)
    )
    formik.setFieldValue(field, R.toLower(value))
  }

  const onRemoveAddedField = (field, value) => {
    setAddedFields(
      R.over(R.lensProp(field), R.reject(R.equals(value)), addedFields)
    )
    if (formik.values[field] === value) {
      formik.setFieldValue(field, "")
    }
  }

  const resetAddedFields = () => {
    setAddedFields({
      payer: [],
      category: [],
    })
  }

  useEffect(() => {
    if (!isOpen) {
      setAddedFields({
        payer: [],
        category: [],
      })
    }
  }, [isOpen])

  return { addedFields, onAddField, onRemoveAddedField, resetAddedFields }
}
