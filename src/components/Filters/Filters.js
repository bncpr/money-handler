import * as R from "ramda"
import { Stack } from "@chakra-ui/layout"
import { SelectMenu } from "../../components/UI/Menu/SelectMenu"
import { capitalizeFirstChar } from "../../utility/utility"

const getTuples = array =>
  R.prepend(["", "No Filter"], R.zip(array, array))

const selectStyle = {
  variant: "ghost",
  textAlign: "left",
  colorScheme: "pink",
}

export const Filters = ({ filters, filterables, setFilter }) => {
  return (
    <Stack>
      {R.keys(filters).map(filter => (
        <SelectMenu
          key={filter}
          style={selectStyle}
          buttonVal={filters[filter]}
          buttonDefault={capitalizeFirstChar(filter)}
          array={getTuples(filterables[filter].values)}
          onChange={setFilter(filter)}
        />
      ))}
    </Stack>
  )
}
