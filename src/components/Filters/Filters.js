import { Stack } from "@chakra-ui/layout"
import * as R from "ramda"
import { SelectMenu } from "../../components/UI/Menu/SelectMenu"
import { sortDescendList, sortAscendList } from "../../utility/utility"

const getTuples = array => R.prepend(["", "No Filter"], R.zip(array, array))

const selectStyle = {
  variant: "solid",
  textAlign: "left",
  px: 6,
}
const monthsArray = [
  ["", "No Filter"],
  ["01", "January"],
  ["02", "February"],
  ["03", "March"],
  ["04", "April"],
  ["05", "May"],
  ["06", "June"],
  ["07", "July"],
  ["08", "August"],
  ["09", "September"],
  ["10", "October"],
  ["11", "November"],
  ["12", "December"],
]

export const Filters = ({
  children,
  fields,
  filters,
  counts,
  setFilter,
  ...rest
}) => {
  return (
    <Stack width='full' {...rest}>
      {children}
      <SelectMenu
        buttonVal={filters.year}
        buttonDefault='Year'
        array={getTuples(sortDescendList(fields.year))}
        onChange={setFilter("year")}
        counts={counts.year || {}}
        {...selectStyle}
      />
      <SelectMenu
        buttonVal={filters.month}
        buttonDefault='Month'
        array={monthsArray}
        onChange={setFilter("month")}
        {...selectStyle}
        counts={counts.month || {}}
        isDisabled={filters.year === ""}
      />
      <SelectMenu
        buttonVal={filters.payer}
        buttonDefault='Payer'
        array={getTuples(sortAscendList(fields.payer))}
        onChange={setFilter("payer")}
        counts={counts.payer || {}}
        {...selectStyle}
      />
      <SelectMenu
        buttonVal={filters.category}
        buttonDefault='Category'
        array={getTuples(sortAscendList(fields.category))}
        onChange={setFilter("category")}
        counts={counts.category || {}}
        {...selectStyle}
      />
    </Stack>
  )
}
