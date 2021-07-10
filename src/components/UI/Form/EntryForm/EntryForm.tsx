import { Box, Wrap } from "@chakra-ui/react"
import { Field, Form, FormikProvider } from "formik"
import { useRef } from "react"
import { InputContext } from "../InputContext/InputContext"
import { InputTagsCheckbox } from "../InputTagsCheckbox/InputTagsCheckbox"
import { NumberInputContext } from "../NumberInputContext/NumberInputContext"
import { RadioWithAddOption } from "../RadioWithAddOption/RadioWithAddOption"

export const EntryForm = ({
  formik,
  fields,
  addedFields,
  initialFocusRef,
  onAddField,
  onRemoveAddedField,
}: any) => {
  const portalRef = useRef(null)
  return (
    <FormikProvider value={formik}>
      <Form
        id='entry-form'
        onSubmit={formik.handleSubmit}
        onKeyPress={e => e.key === "Enter" && e.preventDefault()}
      >
        <Wrap spacing={5}>
          <Field
            component={InputContext}
            name='date'
            type='date'
            label='Date'
            initialFocusRef={initialFocusRef}
          />
          <Field component={NumberInputContext} name='value' label='Value' />
        </Wrap>
        {["payer", "category"].map(value => (
          <Field
            key={value}
            name={value}
            component={RadioWithAddOption}
            options={fields[value]}
            addedFields={addedFields[value]}
            portalRef={portalRef}
            onAddField={onAddField}
            onRemoveAddedField={onRemoveAddedField}
          />
        ))}
        <Field name='tags' component={InputTagsCheckbox} />
        <Field
          component={InputContext}
          name='more'
          label='More'
          type='text'
          helperText='free text for more information'
        />
      </Form>
      <Box ref={portalRef}></Box>
    </FormikProvider>
  )
}
