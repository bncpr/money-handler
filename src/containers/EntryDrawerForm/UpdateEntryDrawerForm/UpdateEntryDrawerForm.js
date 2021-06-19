import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Portal,
  useDisclosure,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as R from "ramda"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AlertYesNo } from "../../../components/UI/Alert/AlertYesNo"
import { useAddedFields } from "../../../hooks/useAddedFields/useAddedFields"
import { useResetFormOnClose } from "../../../hooks/useResetFormOnClose/useResetFormOnClose"
import { updateUserEntriesThunk } from "../../../store/thunks/updateUserEntriesThunk"
import { entrySchema } from "../modules/entrySchema"

const initialValues = { tags: [], more: "" }

export const UpdateEntryDrawerForm = ({
  isOpen,
  onClose,
  placement,
  header,
  pickedEntry,
  fields,
  component: Component,
}) => {
  const entry = useSelector(state => state.data.entries[pickedEntry])
  const dispatch = useDispatch()

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure()

  const formik = useFormik({
    initialValues,
    validationSchema: entrySchema,
    onSubmit: async values => {
      await dispatch(
        updateUserEntriesThunk({
          entryId: entry.id,
          entry: values,
        }),
      )
      formik.setSubmitting(false)
      onCloseAlert()
      onClose()
    },
  })

  const { addedFields, onAddField, onRemoveAddedField } = useAddedFields(
    formik,
    isOpen,
  )

  useEffect(() => {
    // console.log(formik.values)
  }, [formik.values])

  useEffect(() => {
    formik.setValues(R.mergeRight(initialValues, entry))
  }, [entry])

  useResetFormOnClose(isOpen, formik)

  const onSubmitAttempt = () => {
    formik.validateForm()
    if (formik.isValid) {
      onOpenAlert()
    }
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={placement} size='md'>
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
          />
        </DrawerBody>

        <DrawerFooter>
          <Button onClick={onClose} colorScheme='red' mr={3}>
            Cancel
          </Button>
          <Button colorScheme='green' onClick={onSubmitAttempt}>
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
      <Portal>
        <AlertYesNo
          isOpen={isOpenAlert}
          onClose={onCloseAlert}
          header='Update Entry'
          body='Are you sure you want to update this entry?'
          onYes={formik.handleSubmit}
          isLoading={formik.isSubmitting}
        />
      </Portal>
    </Drawer>
  )
}
