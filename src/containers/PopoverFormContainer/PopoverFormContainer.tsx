import { Button, IconButton } from "@chakra-ui/button"
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control"
import { AddIcon } from "@chakra-ui/icons"
import { Input } from "@chakra-ui/input"
import { Box, Wrap } from "@chakra-ui/layout"
import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover"
import { Portal } from "@chakra-ui/portal"
import { Field, FieldProps, Form, FormikProvider, useFormik } from "formik"
import { KeyboardEventHandler, RefObject, useRef, useState } from "react"
import * as Yup from "yup"
import { capitalizeFirstChar } from "../../utility/utility"

export const PopoverFormContainer = ({
  name,
  options,
  addedFields,
  portalRef,
  onAddField,
}: {
  name: string
  options: string[]
  addedFields: string[]
  portalRef: RefObject<HTMLDivElement>
  onAddField: (name: string, value: string) => void
}) => {
  const initialFocusRef = useRef<HTMLInputElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)
  const onClose = () => {
    setIsOpen(false)
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      [name]: "",
    },
    validationSchema: Yup.object().shape({
      [name]: Yup.string()
        .required()
        .max(20)
        .lowercase()
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

  const handleEnterKeyPress: KeyboardEventHandler = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      formik.handleSubmit()
    }
  }

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onClose={onClose}
      returnFocusOnClose={false}
    >
      <PopoverTrigger>
        <IconButton
          aria-label={`add-${name}`}
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
            name,
          )}:`}</PopoverHeader>

          <FormikProvider value={formik}>
            <Form
              onSubmit={formik.handleSubmit}
              onKeyPress={handleEnterKeyPress}
            >
              <Wrap p={3}>
                <Field name={name}>
                  {({ field, form: { errors, touched } }: FieldProps) => (
                    <FormControl
                      width='max'
                      isInvalid={!!(errors[name] && touched[name])}
                    >
                      <Input {...field} ref={initialFocusRef} bg='white' />
                      <Portal containerRef={ref}>
                        <FormErrorMessage m={0}>
                          {errors[name]}
                        </FormErrorMessage>
                      </Portal>
                    </FormControl>
                  )}
                </Field>
                <Button type='submit' colorScheme='green' alignSelf='flex-end'>
                  ADD
                </Button>
              </Wrap>
              <Box ref={ref} ml={4} mb={3}></Box>
            </Form>
          </FormikProvider>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
