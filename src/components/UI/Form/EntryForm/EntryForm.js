import { FormControl, FormLabel, Input, Wrap } from "@chakra-ui/react"
import { Field, Form, FormikProvider } from "formik"
import { NumberInputContext } from "../NumberInputContext/NumberInputContext"
import { InputContext } from "../InputContext/InputContext"
import { CustomRadioGroup } from "../RadioCard/CustomRadioGroup"

export const EntryForm = ({ formik, payers, categories }) => {
  return (
    <FormikProvider value={formik}>
      <Form id='entry-form'>
        <Wrap spacing={5}>
          <Field component={InputContext} name='date' type='date' />
          <Field component={NumberInputContext} name='value' />
        </Wrap>
        <Field
          component={CustomRadioGroup}
          name='payer'
          options={payers}
        />
        <Field
          component={CustomRadioGroup}
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
