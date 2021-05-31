import { Button } from "@chakra-ui/button"
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Box, Wrap } from "@chakra-ui/layout"
import { Portal } from "@chakra-ui/portal"
import { Form, Field, FormikProvider } from "formik"
import { useRef } from "react"

const preventDefAndSubmitOnEnt = handleSubmit => e => {
  e.key === "Enter" &&
    (() => {
      e.preventDefault()
      handleSubmit()
    })()
}

export const PopoverForm = ({
  form,
  name,
  initialFocusRef,
}) => {
  const ref = useRef()
  return (
    <FormikProvider value={form}>
      <Form onKeyPress={preventDefAndSubmitOnEnt(form.handleSubmit)}>
        <Wrap p={3}>
          <Field name={name}>
            {({ field, form: { errors, touched } }) => (
              <FormControl
                width='max'
                isInvalid={errors[name] && touched[name]}
              >
                <Input {...field} ref={initialFocusRef} bg='white' />
                <Portal containerRef={ref}>
                  <FormErrorMessage m={0}>{errors[name]}</FormErrorMessage>
                </Portal>
              </FormControl>
            )}
          </Field>
          <Button
            onClick={form.handleSubmit}
            colorScheme='green'
            alignSelf='flex-end'
          >
            ADD
          </Button>
        </Wrap>
        <Box ref={ref} ml={4} mb={3}></Box>
      </Form>
    </FormikProvider>
  )
}
