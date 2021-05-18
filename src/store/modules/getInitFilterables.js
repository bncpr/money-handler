export const getInitFilterables = ({ categories, payers, years }) => ({
  category: { values: categories },
  year: { values: years },
  month: { values: [] },
  payer: { values: payers },
})
