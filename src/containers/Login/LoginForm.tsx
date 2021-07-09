import { Button } from "@chakra-ui/button"
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control"
import { Box, Flex, Heading } from "@chakra-ui/layout"
import { Input } from "@chakra-ui/react"
import { Field, FieldProps, Form, FormikProvider, useFormik } from "formik"
import { useState } from "react"
import { Redirect } from "react-router"
import * as Yup from "yup"
import { createUser, signInUser } from "../../api/firebase/firebase"
import { CardBox } from "../../components/UI/Box/CardBox/CardBox"
import { useAppSelector } from "../../hooks/reduxTypedHooks/reduxTypedHooks"

const re = /\/((?:\w+-*)+)/
const keyRe = /email|password|user/
const stripHyphen = (match: RegExpMatchArray) => match[1].replaceAll("-", " ")
const reUserToMail = (match: RegExpMatchArray) =>
  match[0].replace("user", "email")

function extractErrorCode(code: string) {
  const key = code.match(keyRe)
  const value = code.match(re)
  return key && value
    ? { key: reUserToMail(key), value: stripHyphen(value) }
    : { key: "other", value: value ? stripHyphen(value) : "error" }
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

export const LoginForm = () => {
  // const history = useHistory()
  const signedIn = useAppSelector(state => state.authentication.signedIn)
  const [mode, setMode] = useState("signIn")
  const toggleMode = () => setMode(mode === "signIn" ? "signUp" : "signIn")
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      other: "",
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit: async ({ email, password }) => {
      const fn = mode === "signIn" ? signInUser : createUser
      try {
        await fn(email, password)
        formik.resetForm()
      } catch (error) {
        const { key, value } = extractErrorCode(error.code)
        if (key === "email" || key === "password" || key === "other") {
          formik.errors[key] = value
        }
      }
    },
  })

  return (
    <Box pt={9}>
      <CardBox py={6} px={8} w='max' mx='auto'>
        {signedIn && <Redirect to='/entries' />}
        <FormikProvider value={formik}>
          <Flex direction='column'>
            <Heading size='md' mx='auto' fontWeight='semibold'>
              {mode === "signIn" ? "Login" : "Create New User"}
            </Heading>
            <Form onSubmit={formik.handleSubmit}>
              <Field name='email' type='email'>
                {({ field, meta: { error, touched } }: FieldProps) => (
                  <FormControl
                    id={field.name}
                    isInvalid={!!error && touched}
                    width='max'
                    p={2}
                  >
                    <Input variant='flushed' placeholder='Email' {...field} />
                    <FormErrorMessage>{error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='password' type='password'>
                {({ field, meta: { error, touched } }: FieldProps) => (
                  <FormControl
                    id={field.name}
                    isInvalid={!!error && touched}
                    width='max'
                    p={2}
                  >
                    <Input
                      variant='flushed'
                      placeholder='Password'
                      type='password'
                      {...field}
                    />
                    <FormErrorMessage>{error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <FormControl isInvalid={!!formik.errors.other}>
                <FormErrorMessage>{formik.errors.other}</FormErrorMessage>
              </FormControl>
              <Flex justify='center' direction='column'>
                <Button
                  type='submit'
                  colorScheme='green'
                  mt={3}
                  isLoading={formik.isSubmitting}
                >
                  Submit
                </Button>
                <Button mx='auto' mt={3} variant='link' onClick={toggleMode}>
                  {`switch to ${mode === "signIn" ? "sign-up" : "sign-in"}`}
                </Button>
              </Flex>
            </Form>
          </Flex>
        </FormikProvider>
      </CardBox>
    </Box>
  )
}
