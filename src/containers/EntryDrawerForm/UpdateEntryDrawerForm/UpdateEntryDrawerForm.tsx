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
import { AlertYesNo } from "../../../components/UI/Alert/AlertYesNo"
import { EntryForm } from "../../../components/UI/Form/EntryForm/EntryForm"
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/reduxTypedHooks/reduxTypedHooks"
import { useAddedFields } from "../../../hooks/useAddedFields/useAddedFields"
import { updateUserEntriesThunk } from "../../../store/thunks/updateUserEntriesThunk"
import { Entry } from "../../../types/Entry"
import { entrySchema } from "../modules/entrySchema"

const initialValues: Entry = {
  date: "",
  payer: "",
  value: 0,
  category: "",
  month: "",
  year: "",
  tags: [],
  more: "",
  id: "",
}

export const UpdateEntryDrawerForm = ({
  isOpen,
  onClose,
  placement,
  header,
  pickedEntry,
  fields,
}: any) => {
  const signedIn = useAppSelector(state => state.authentication.signedIn)
  const entry = useAppSelector(state => state.data.entries[pickedEntry])
  const dispatch = useAppDispatch()

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure()

  const formik = useFormik({
    initialValues,
    validationSchema: entrySchema,
    onSubmit: values => {
      setTimeout(() => {
        dispatch(
          updateUserEntriesThunk({
            entryId: entry.id,
            entry: values,
          }),
        )
        onCloseAlert()
        onClose()
      }, 0)
    },
  })

  const { addedFields, onAddField, onRemoveAddedField } = useAddedFields({
    values: formik.values,
    setValues: formik.setFieldValue,
    isOpen,
  })

  const { setValues, resetForm } = formik

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    } else {
      setValues(R.mergeRight(initialValues, entry))
    }
  }, [isOpen, entry, resetForm, setValues])

  const onSubmitAttempt = () => {
    formik.validateForm()
    if (formik.isValid) {
      return !signedIn ? formik.submitForm() : onOpenAlert()
    }
  }

  useEffect(() => {
    console.log(formik.errors)
  }, [formik.errors])

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={placement} size='md'>
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
          isLoading={formik.isSubmitting}
        />
      </Portal>
    </Drawer>
  )
}
