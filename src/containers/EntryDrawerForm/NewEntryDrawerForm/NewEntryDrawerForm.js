import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as R from "ramda"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { useAddedFields } from "../../../hooks/useAddedFields/useAddedFields"
import { useResetFormOnClose } from "../../../hooks/useResetFormOnClose/useResetFormOnClose"
import { setLoadingOn } from "../../../store/slices/loadingSlice"
import { postNewEntryThunk } from "../../../store/thunks/postNewEntryThunk"
import { entrySchema } from "../modules/entrySchema"

const initialValues = {
  date: new Date().toJSON().slice(0, 10),
  payer: "",
  value: 0,
  category: "",
  tags: [],
  more: "",
}

const addYearAndMonthProps = values => {
  const [y, m] = values.date.split("-")
  return R.pipe(R.assoc("year", y), R.assoc("month", m))(values)
}

export const NewEntryDrawerForm = ({
  isOpen,
  onClose,
  placement,
  header,
  fields,
  component: Component,
}) => {
  const dispatch = useDispatch()
  const initialFocusRef = useRef()

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validationSchema: entrySchema,
    onSubmit: values => {
      const entry = addYearAndMonthProps(values)
      // dispatch(setLoadingOn())
      setTimeout(() => {
        dispatch(postNewEntryThunk({ entry }))
        formik.resetForm()
        resetAddedFields()
        initialFocusRef.current.focus()
      }, 0)
    },
  })

  const { addedFields, onAddField, onRemoveAddedField, resetAddedFields } =
    useAddedFields(formik, isOpen)

  useResetFormOnClose(isOpen, formik)

  useEffect(() => {
    console.log(formik.isSubmitting)
  }, [formik.isSubmitting])

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
      size='md'
      initialFocusRef={initialFocusRef}
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{header}</DrawerHeader>

        <DrawerBody>
          <Component
            formik={formik}
            fields={fields}
            addedFields={addedFields}
            onAddField={onAddField}
            onRemoveAddedField={onRemoveAddedField}
            initialFocusRef={initialFocusRef}
          />
        </DrawerBody>

        <DrawerFooter>
          <Button onClick={onClose} colorScheme='red' mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme='green'
            onClick={formik.handleSubmit}
            isLoading={formik.isSubmitting}
          >
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
