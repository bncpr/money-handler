import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Field, Form, FormikProvider } from "formik"
import { RadioContext } from "../../components/UI/Form/RadioContext/RadioContext"
import { NumberInputContext } from "../../components/UI/Form/NumberInputContext/NumberInputContext"
import { InputContext } from "../../components/UI/Form/InputContext/InputContext"

export const EntryForm = ({ formik, payers, categories }) => {
  return (
    <FormikProvider value={formik}>
      <Form id='entry-form'>
        <Field component={InputContext} name='date' type='date' />
        <Field component={NumberInputContext} name='value' />
        <Field component={RadioContext} name='payer' options={payers} />
        <Field
          component={RadioContext}
          name='category'
          options={categories}
        />
        <Field name='subcategories'>
          {({ field }) => (
            <FormControl id='subcategories'>
              <FormLabel htmlFor='subcategories'>Subcategories</FormLabel>
              <Input {...field} />
            </FormControl>
          )}
        </Field>
        <Field name='more'>
          {({ field }) => (
            <FormControl id='more'>
              <FormLabel htmlFor='more'>More</FormLabel>
              <Input {...field} />
            </FormControl>
          )}
        </Field>
      </Form>
    </FormikProvider>
  )
}
