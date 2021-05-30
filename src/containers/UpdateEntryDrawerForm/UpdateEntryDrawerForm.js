import { useEffect, useRef, useState } from "react"
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
import { updateUserEntriesThunk } from "../../store/thunks/updateUserEntriesThunk"
import { useFormik } from "formik"
import * as R from "ramda"
import * as yup from "yup"
import { useResetFormOnClose } from "../../hooks/useResetFormOnClose/useResetFormOnClose"
import { AlertYesNo } from "../../components/UI/Alert/AlertYesNo"

const entrySchema = yup.object().shape({
  date: yup
    .date()
    .required()
    .max("2100/01/01", "That's way too far in the future."),
  value: yup.number().required().positive(),
  payer: yup.string().required(),
  category: yup.string().required(),
  tags: yup.array(),
  more: yup.string(),
})

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
  const portalRef = useRef()
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure()

  const [addedFields, setAddedFields] = useState({
    payer: [],
    category: [],
    tags: [],
  })

  const formik = useFormik({
    initialValues,
    validationSchema: entrySchema,
    onSubmit: async values => {
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

  const onAddField = (field, value) => {
    setAddedFields(R.over(R.lensProp(field), R.append(value), addedFields))
    formik.setFieldValue(field, value)
  }

  const onRemoveAddedField = (field, value) => {
    setAddedFields(
      R.over(R.lensProp(field), R.reject(R.equals(value)), addedFields)
    )
    if (formik.values[field] === value) {
      formik.setFieldValue(field, "")
    }
  }

  useEffect(() => {
    console.log(formik.values)
  }, [formik.values])

  useEffect(() => {
    formik.setValues(R.mergeRight(initialValues, entry))
  }, [entry, formik.setValues])

  useEffect(() => {
    if (!isOpen) {
      setAddedFields({
        payer: [],
        category: [],
      })
    }
  }, [isOpen])

  useResetFormOnClose(isOpen, formik)

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
            onClick={onOpenAlert}
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
          onYes={() => {
            onCloseAlert()
            formik.handleSubmit()
          }}
        />
      </Portal>
      <Box ref={portalRef}></Box>
    </Drawer>
  )
}
