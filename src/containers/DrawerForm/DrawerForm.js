import { useEffect } from "react"
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
import { updateEntryInDbThunk } from "../../store/thunks/updateEntryInDbThunk"
import { useFormik } from "formik"
import * as R from "ramda"
import * as yup from "yup"

const entrySchema = yup.object().shape({
  date: yup
    .date()
    .required()
    .max("2100/01/01", "That's way too far in the future."),
  value: yup.number().required().positive(),
  payer: yup.string().required(),
  category: yup.string().required(),
  subcategories: yup.string(),
  more: yup.string(),
})

export const DrawerForm = ({
  isOpen,
  onClose,
  placement,
  header,
  pickedEntry,
  component: Component,
}) => {
  const entry = useSelector(state => state.data.entries[pickedEntry])
  const { categories, payers } = useSelector(
    state => state.data,
    shallowEqual
  )
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {},
    validationSchema: entrySchema,
    onSubmit: async values => {
      await dispatch(
        updateEntryInDbThunk({ entryId: entry.id, entry: values })
      )
      formik.setSubmitting(false)
    },
  })

  useEffect(() => {
    formik.setValues(R.omit(["year", "month", "id"], entry))
  }, [entry])

  useEffect(() => {
    if (!isOpen) formik.resetForm()
  }, [isOpen])

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
      size='lg'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{header}</DrawerHeader>
        <DrawerBody>
          <Component
            formik={formik}
            payers={payers}
            categories={categories}
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
