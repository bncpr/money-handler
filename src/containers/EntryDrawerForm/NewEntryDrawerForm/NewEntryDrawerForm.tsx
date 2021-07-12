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
import { useRef } from "react"
import { EntryForm } from "../../../components/UI/Form/EntryForm/EntryForm"
import { useAppDispatch } from "../../../hooks/reduxTypedHooks/reduxTypedHooks"
import { useAddedFields } from "../../../hooks/useAddedFields/useAddedFields"
import { useSuccessToast } from "../../../hooks/useSuccessToast/useSuccessToast"
import { postNewEntryThunk } from "../../../store/thunks/postNewEntryThunk"
import { Entry } from "../../../types/Entry"
import { entrySchema } from "../modules/entrySchema"

const initialValues: Entry = {
  date: new Date().toJSON().slice(0, 10),
  payer: "",
  value: 0,
  category: "",
  tags: [],
  more: "",
  id: "",
  month: "",
  year: "",
}

const addYearAndMonthProps = (values: Entry) => {
  const [y, m] = values.date.split("-")
  return R.pipe(R.assoc("year", y), R.assoc("month", m))(values)
}

export const NewEntryDrawerForm = ({
  isOpen,
  onClose: closeDrawer,
  placement,
  header,
  fields,
}: any) => {
  const dispatch = useAppDispatch()
  const initialFocusRef = useRef<HTMLElement>(null)

  const onClose = () => {
    closeDrawer()
    formik.resetForm()
  }

  const { showSuccessToast } = useSuccessToast()

  const formik = useFormik({
    initialValues,
    validationSchema: entrySchema,
    onSubmit: values => {
      const entry = addYearAndMonthProps(values)
      setTimeout(() => {
        dispatch(postNewEntryThunk(entry)).then(res => {
          if (postNewEntryThunk.fulfilled.match(res)) {
            showSuccessToast("Entry Added")
            formik.resetForm()
            resetAddedFields()
            initialFocusRef.current?.focus()
          }
        })
      }, 0)
    },
  })

  const { addedFields, onAddField, onRemoveAddedField, resetAddedFields } =
    useAddedFields({
      values: formik.values,
      setValues: formik.setFieldValue,
      isOpen,
    })

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
          <EntryForm
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
            type='submit'
            form='entry-form'
            isLoading={formik.isSubmitting}
          >
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
