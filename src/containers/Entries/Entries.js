import { useEffect } from "react"
import { useEntries } from "../../hooks/useEntries/useEntries"
import { useFilters } from "../../hooks/useFilters/useFilters"
import * as R from "ramda"
import { Box, Container, Wrap, VStack } from "@chakra-ui/layout"
import { Table, Thead, Tbody, Tr, Th, Td, Select } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"

const createSelect = (statePath, onChange, array, count) => (
  <Select value={statePath} onChange={onChange}>
    <option value=''>--</option>
    {array.map(year => (
      <option key={year} value={year}>
        {year + `(${count?.[year] ?? ""})`}
      </option>
    ))}
  </Select>
)
const createSelectH = (filters, onChange, filterables, value) =>
  createSelect(
    filters[value],
    onChange(value),
    filterables[value].values,
    filterables[value].count
  )

export const Entries = () => {
  const entries = useEntries()
  const { surfaceData, setFilter, filters, filterables } =
    useFilters(entries)

  useEffect(() => {
    // console.log(surfaceData)
  }, [surfaceData, filters, filterables])

  return (
    <Wrap>
      <VStack>
        {createSelectH(filters, setFilter, filterables, "year")}
        {!R.isEmpty(filterables.month.values) &&
          createSelectH(filters, setFilter, filterables, "month")}
        {createSelectH(filters, setFilter, filterables, "payer")}
        {createSelectH(filters, setFilter, filterables, "category")}
      </VStack>
      <Box>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Value</Th>
              <Th>Payer</Th>
              <Th>Category</Th>
              <Th>Subcategories</Th>
              <Th>More</Th>
            </Tr>
          </Thead>
          <Tbody>
            {surfaceData.map(
              ({
                id,
                date,
                value,
                payer,
                category,
                subcategories,
                more,
              }) => (
                <Tr key={id}>
                  <Td>{date}</Td>
                  <Td isNumeric>{value}</Td>
                  <Td>{payer}</Td>
                  <Td>{category}</Td>
                  <Td>{subcategories}</Td>
                  <Td>{more}</Td>
                  <EditIcon />
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </Box>
    </Wrap>
  )
}
