import { Stack } from "@chakra-ui/layout"
import * as R from "ramda"
import { FunctionComponent } from "react"
import {
  Counts,
  FiltersType,
  SetFilter,
} from "../../hooks/useFilters/useFilters"
import { Fields } from "../../store/slices/groupedEntriesSlice/groupedEntriesSlice"
import { sortAscendList, sortDescendList } from "../../utility/utility"
import { SelectMenu } from "../UI/Menu/SelectMenu"

const getTuples = (array: string[]) =>
  R.prepend(["", "No Filter"], R.zip(array, array))

const selectStyle = {
  variant: "outline",
  colorScheme: "gray",
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

type FilterProps = {
  fields: Fields
  filters: FiltersType
  counts: Counts
  setFilter: SetFilter
}

export const Filters: FunctionComponent<FilterProps> = ({
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
        onChange={(val: string) => setFilter("year", val)}
        counts={counts.year || {}}
        {...selectStyle}
      />
      <SelectMenu
        buttonVal={filters.month}
        buttonDefault='Month'
        array={monthsArray}
        onChange={(val: string) => setFilter("month", val)}
        {...selectStyle}
        counts={counts.month || {}}
        isDisabled={filters.year === ""}
      />
      <SelectMenu
        buttonVal={filters.payer}
        buttonDefault='Payer'
        array={getTuples(sortAscendList(fields.payer))}
        onChange={(val: string) => setFilter("payer", val)}
        counts={counts.payer || {}}
        {...selectStyle}
      />
      <SelectMenu
        buttonVal={filters.category}
        buttonDefault='Category'
        array={getTuples(sortAscendList(fields.category))}
        onChange={(val: string) => setFilter("category", val)}
        counts={counts.category || {}}
        {...selectStyle}
      />
    </Stack>
  )
}
