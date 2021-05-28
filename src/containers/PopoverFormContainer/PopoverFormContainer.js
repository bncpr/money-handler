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
import { useEffect, useRef, useState } from "react"
import { capitalizeFirstChar } from "../../utility/utility"
import * as Yup from "yup"

export const PopoverFormContainer = ({ name, component: Component }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)
  const onClose = () => setIsOpen(false)

  const formik = useFormik({
    initialValues: {
      [name]: "",
    },
    validationSchema: Yup.object().shape({
      [name]: Yup.string().required().max(20),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
    validateOnBlur: false,
  })
  const initialFocusRef = useRef()

  useEffect(() => {
    if (!isOpen) formik.resetForm()
  }, [isOpen])

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onClose={onClose}
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
      <PopoverContent boxShadow='md' borderColor='gray.100' border='2px'>
        <PopoverArrow />
        <PopoverCloseButton mt={1} />
        <PopoverHeader fontWeight='600'>{`Add New ${capitalizeFirstChar(
          name
        )}:`}</PopoverHeader>
        <Component
          form={formik}
          name={name}
          initialFocusRef={initialFocusRef}
        />
      </PopoverContent>
    </Popover>
  )
}
