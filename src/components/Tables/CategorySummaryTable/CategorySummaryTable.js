import { Box, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import * as R from "ramda"
import { capitalizeFirstChar } from "../../../utility/utility"

export const CategorySummaryTable = ({
  monthFields,
  averages,
  hovered,
  ...rest
}) => {
  const sorted = R.sortWith(
    [R.descend(R.last), R.descend(el => averages[R.head(el)])],
    monthFields,
  )
  const sum = roundSum(R.values(averages))
  return (
    <Box {...rest}>
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
            const percent = Number.parseFloat((average / sum) * 100).toFixed(1)
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
                  {average && `${average} ${percent ? `(${percent}%)` : ""}`}
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
            <Th isNumeric>Total</Th>
            <Th isNumeric>{roundSum(monthFields.map(R.last))}</Th>
            <Th isNumeric>{sum}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}

function roundSum(arr) {
  return Math.round(R.sum(arr))
}
