import * as yup from "yup"

export const entrySchema = yup.object().shape({
  date: yup
    .date()
    .required()
    .max("2100/01/01", "That's way too far in the future."),
  value: yup.number().required().positive(),
  payer: yup.string().required(),
  category: yup.string().required(),
  tags: yup.array(),
  more: yup.string().max(20),
})