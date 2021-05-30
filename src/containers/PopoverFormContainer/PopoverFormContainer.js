import { IconButton } from "@chakra-ui/button"
import { AddIcon } from "@chakra-ui/icons"
import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover"
import { useFormik } from "formik"
import { useRef, useState } from "react"
import { capitalizeFirstChar } from "../../utility/utility"
import * as Yup from "yup"
import { useResetFormOnClose } from "../../hooks/useResetFormOnClose/useResetFormOnClose"
import { Portal } from "@chakra-ui/portal"

export const PopoverFormContainer = ({
  name,
  component: Component,
  options,
  addedFields,
  portalRef,
  onAddField,
}) => {
  const initialFocusRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)
  const onClose = () => setIsOpen(false)

  const formik = useFormik({
    initialValues: {
      [name]: "",
    },
    validationSchema: Yup.object().shape({
      [name]: Yup.string()
        .required()
        .max(20)
        .notOneOf(options.concat(addedFields), `${name} already in use`)
        .matches(/^\S*$/, "no whitespace"),
    }),
    onSubmit: values => {
      onAddField(name, values[name])
      formik.setSubmitting(false)
      onClose()
    },
    validateOnBlur: false,
  })

  useResetFormOnClose(isOpen, formik)

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onClose={onClose}
      returnFocusOnClose={false}
    >
      <PopoverTrigger>
        <IconButton
          onClick={toggleOpen}
          variant='ghost'
          size='sm'
          alignSelf='center'
          icon={<AddIcon />}
        />
      </PopoverTrigger>
      <Portal containerRef={portalRef}>
        <PopoverContent boxShadow='md' borderColor='gray.100'>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight='600'>{`Add New ${capitalizeFirstChar(
            name
          )}:`}</PopoverHeader>

          <Component
            form={formik}
            name={name}
            initialFocusRef={initialFocusRef}
          />
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
