import { useEffect, useRef } from "react"
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import { useResetFormOnClose } from "../../../hooks/useResetFormOnClose/useResetFormOnClose"
import { entrySchema } from "../modules/entrySchema"
import { useAddedFields } from "../../../hooks/useAddedFields/useAddedFields"
import * as R from "ramda"
import { postNewEntryThunk } from "../../../store/thunks/postNewEntryThunk"

const initialValues = {
  date: "",
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
    onSubmit: async values => {
      const entry = addYearAndMonthProps(values)
      await dispatch(postNewEntryThunk({ entry, addedFields }))
      formik.setSubmitting(false)
      formik.resetForm()
      resetAddedFields()
      initialFocusRef.current.focus()
    },
  })

  const { addedFields, onAddField, onRemoveAddedField, resetAddedFields } =
    useAddedFields(formik, isOpen)

  useResetFormOnClose(isOpen, formik)

  useEffect(() => {
    console.log(formik.values)
  }, [formik.values])

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
