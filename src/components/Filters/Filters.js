import { Stack } from "@chakra-ui/layout"
import * as R from "ramda"
import { SelectMenu } from "../../components/UI/Menu/SelectMenu"
import { capitalizeFirstChar } from "../../utility/utility"

const getTuples = array =>
  R.prepend(["", "No Filter"], R.zip(array, array))

const selectStyle = {
  variant: "ghost",
  textAlign: "left",
  colorScheme: "pink",
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

//TODO: refactor
export const Filters = ({ fields, filters, counts, setFilter }) => {
  return (
    <Stack>
      <SelectMenu
        buttonVal={filters.year}
        buttonDefault='Year'
        array={getTuples(fields.year)}
        onChange={setFilter("year")}
        counts={counts.year || {}}
        style={selectStyle}
      />
      <SelectMenu
        buttonVal={filters.month}
        buttonDefault='Month'
        array={monthsArray}
        onChange={setFilter("month")}
        style={selectStyle}
        counts={counts.month || {}}
        isDisabled={filters.year === ""}
      />
      <SelectMenu
        buttonVal={filters.payer}
        buttonDefault='Payer'
        array={getTuples(fields.payer)}
        onChange={setFilter("payer")}
        counts={counts.payer || {}}
        style={selectStyle}
      />
      <SelectMenu
        buttonVal={filters.category}
        buttonDefault='Category'
        array={getTuples(fields.category)}
        onChange={setFilter("category")}
        counts={counts.category || {}}
        style={selectStyle}
      />
    </Stack>
  )
}
