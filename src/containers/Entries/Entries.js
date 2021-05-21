import { useEffect } from "react"
import { useEntries } from "../../hooks/useEntries/useEntries"
import { useFilters } from "../../hooks/useFilters/useFilters"
import * as R from "ramda"
import { Box, Grid, GridItem, Wrap } from "@chakra-ui/layout"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"

const createSelect = (statePath, onChange, array, count) => (
  <select value={statePath} onChange={onChange}>
    <option value=''>--</option>
    {array.map(year => (
      <option key={year} value={year}>
        {year + `(${count?.[year] ?? ""})`}
      </option>
    ))}
  </select>
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
    console.log(surfaceData)
  }, [surfaceData, filters, filterables])

  return (
    <Wrap>
      <Box>
        {createSelectH(filters, setFilter, filterables, "year")}
        {!R.isEmpty(filterables.month.values) &&
          createSelectH(filters, setFilter, filterables, "month")}
        {createSelectH(filters, setFilter, filterables, "payer")}
        {createSelectH(filters, setFilter, filterables, "category")}
      </Box>
      <Box>
        <Table variant='simple'>
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
                  <Td>{value}</Td>
                  <Td>{payer}</Td>
                  <Td>{category}</Td>
                  <Td>{subcategories}</Td>
                  <Td>{more}</Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </Box>
    </Wrap>
  )
}
