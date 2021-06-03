import { Box, Code, Container, Text, Wrap } from "@chakra-ui/layout"
import { Select } from "@chakra-ui/select"
import { shallowEqual, useSelector } from "react-redux"
import { Filters } from "../Filters/Filters"
import { useFilters } from "../../hooks/useFilters/useFilters"

// TODO: addReservedWords to Form



export const Home = () => {
  const { entries, groupedTree, fields } = useSelector(
    state => state.groupedEntries,
    shallowEqual
  )
  const { setFilter, counts, filteredEntries, filters } = useFilters({
    entries,
    groupedTree,
  })

  return (
    <Wrap>
      <Box width='max'>
        <Filters
          fields={fields}
          filters={filters}
          counts={counts}
          setFilter={setFilter}
        />
      </Box>

      {filteredEntries.map(value => (
        <Text>{JSON.stringify(value)}</Text>
      ))}
    </Wrap>
  )
}
