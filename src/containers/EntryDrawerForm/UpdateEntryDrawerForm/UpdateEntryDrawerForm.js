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
  Box,
  Portal,
  useDisclosure,
} from "@chakra-ui/react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { updateUserEntriesThunk } from "../../../store/thunks/updateUserEntriesThunk"
import { useFormik } from "formik"
import * as R from "ramda"
import { useResetFormOnClose } from "../../../hooks/useResetFormOnClose/useResetFormOnClose"
import { AlertYesNo } from "../../../components/UI/Alert/AlertYesNo"
import { entrySchema } from "../modules/entrySchema"
import { useAddedFields } from "../../../hooks/useAddedFields/useAddedFields"

const initialValues = { tags: [], more: "" }

export const UpdateEntryDrawerForm = ({
  isOpen,
  onClose,
  placement,
  header,
  pickedEntry,
  component: Component,
}) => {
  const entry = useSelector(state => state.data.entries[pickedEntry])
  const { fields } = useSelector(state => state.data, shallowEqual)
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
      onCloseAlert()
      await dispatch(
        updateUserEntriesThunk({
          entryId: entry.id,
          entry: values,
          addedFields,
        })
      )
      formik.setSubmitting(false)
      onClose()
    },
  })

  const { addedFields, onAddField, onRemoveAddedField } = useAddedFields(
    formik,
    isOpen
  )

  useEffect(() => {
    console.log(formik.values)
  }, [formik.values])

  useEffect(() => {
    formik.setValues(R.mergeRight(initialValues, entry))
  }, [entry, formik.setValues])

  useResetFormOnClose(isOpen, formik)

  const onSubmitAttempt = () => {
    formik.validateForm()
    if (formik.isValid) {
      onOpenAlert()
    }
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
      size='md'
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
          />
        </DrawerBody>

        <DrawerFooter>
          <Button onClick={onClose} colorScheme='red' mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme='green'
            onClick={onSubmitAttempt}
            isLoading={formik.isSubmitting}
          >
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
        />
      </Portal>
    </Drawer>
  )
}
