import { Text } from "@chakra-ui/layout"
import { Box, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import * as R from "ramda"
import { capitalizeFirstChar } from "../../../utility/utility"

export const CategorySummaryTable = ({ monthFields, averages, hovered }) => {
  const sorted = R.sortWith(
    [R.descend(R.last), R.descend(el => averages[R.head(el)])],
    monthFields,
  )
  return (
    <Box shadow='lg' borderRadius='lg' p={6}>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th isNumeric>Sum</Th>
            <Th isNumeric>Avg.</Th>
            <Th isNumeric>Diff.</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sorted.map(([key, value]) => {
            const average = averages[key]
            const difference = Math.round(Math.abs(value - average))
            return (
              <Tr
                key={key}
                bg={hovered === key && "gray.100"}
                transition='opacity ease 100ms 100ms'
              >
                <Td>{capitalizeFirstChar(key)}</Td>

                <Td isNumeric minW='72px'>
                  {Math.round(value)}
                </Td>
                <Td isNumeric minW='72px'>
                  {average}
                </Td>
                <Td isNumeric minW='76px'>
                  {`${
                    average < value ? "+" : average === value ? "" : "-"
                  } ${difference}`}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Total</Th>
            <Th isNumeric>{roundSum(monthFields.map(R.last))}</Th>
            <Th isNumeric>{roundSum(R.values(averages))}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}

function roundSum(arr) {
  return Math.round(R.sum(arr))
}
