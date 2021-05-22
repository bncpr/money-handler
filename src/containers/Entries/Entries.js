import { useEffect, useMemo } from "react"
import { useEntries } from "../../hooks/useEntries/useEntries"
import { useFilters } from "../../hooks/useFilters/useFilters"
import * as R from "ramda"
import { Box, Container, Wrap, VStack, Center } from "@chakra-ui/layout"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  NumberInput,
} from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import { usePagination } from "../../hooks/usePagination/usePagination"
import { PagePanel } from "../../components/UI/PagePanel/PagePanel"

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
  const { pageSize, page, pagesNum, onChangePage, onChangePageSize } =
    usePagination(surfaceData, 24)

  const memoizedData = useMemo(
    () =>
      surfaceData
        .slice(page * pageSize, page * pageSize + pageSize)
        .map(d => (
          <Tr key={d.id} cursor='pointer' _hover={{ boxShadow: "inner" }}>
            <Td isNumeric>{d.date}</Td>
            <Td isNumeric>{d.value}</Td>
            <Td>{d.payer}</Td>
            <Td>{d.category}</Td>
            <Td>{d.subcategories}</Td>
            <Td>{d.more}</Td>
          </Tr>
        )),
    [surfaceData, page, pageSize]
  )

  useEffect(() => {
    // console.log(page, pagesNum, pageSize)
  }, [surfaceData, filters, filterables, page, pagesNum, pageSize])

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
          <Tbody>{memoizedData}</Tbody>
        </Table>
        <Center>
          <PagePanel
            style={{
              padding: "6",
              justifyContent: "center",
              bottom: "0",
              position: "fixed",
            }}
            page={page}
            pagesNum={pagesNum}
            pageSize={pageSize}
            changePage={onChangePage}
            changePageSize={onChangePageSize}
          />
        </Center>
      </Box>
    </Wrap>
  )
}
