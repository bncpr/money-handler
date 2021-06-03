import { Button } from "@chakra-ui/button"
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control"
import { Box, Flex, Heading } from "@chakra-ui/layout"
import { Field, Form, FormikProvider, useFormik } from "formik"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import * as Yup from "yup"
import { InputContext } from "../../components/UI/Form/InputContext/InputContext"
import { createUser, signInUser } from "../../firebase"

const re = /\/((?:\w+-*)+)/
const keyRe = /email|password|user/
const stripHyphen = match => match[1].replaceAll("-", " ")
const reUserToMail = match => match[0].replace("user", "email")

const extractErrorCode = code => {
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
  const signedIn = useSelector(state => state.authentication.signedIn)
  const [mode, setMode] = useState("signIn")
  const toggleMode = () => setMode(mode === "signIn" ? "signUp" : "signIn")
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      const fn = mode === "signIn" ? signInUser : createUser
      try {
        const response = await fn(email, password)
        console.log(response)
      } catch (error) {
        const { key, value } = extractErrorCode(error.code)
        formik.errors[key] = value
      }
    },
  })

  useEffect(() => {
    console.log(formik.values)
  }, [formik.values])

  return (
    <Box
      boxShadow='lg'
      width='max'
      p={8}
      borderRadius='md'
      mx='auto'
      mt={4}
    >
      {signedIn && <Redirect to='/profile' />}
      <FormikProvider value={formik}>
        <Flex direction='column'>
          <Heading size='md' mx='auto' fontWeight='semibold'>
            {mode === "signIn" ? "Login" : "Create New User"}
          </Heading>
          <Form onSubmit={formik.handleSubmit}>
            <Field
              name='email'
              type='email'
              component={InputContext}
              label='Email'
            />
            <Field
              name='password'
              type='password'
              component={InputContext}
              label='Password'
            />
            <FormControl isInvalid={formik.errors.other}>
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
    </Box>
  )
}
