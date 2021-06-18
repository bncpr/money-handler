import { Text } from "@chakra-ui/layout"
import {
  Box,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import * as R from "ramda"
import { capitalizeFirstChar } from "../../../utility/utility"

export const PayerSummaryTable = ({ payerMonthFields }) => {
  const sorted = R.sort(R.ascend(R.head), payerMonthFields)
  const total = Math.round(R.sum(payerMonthFields.map(R.last)))
  const average = Math.round(total / payerMonthFields.length)
  return (
    <Box shadow='lg' borderRadius='lg' p={4}>
      <Table size={payerMonthFields.length <= 2 ? "md" : "sm"}>
        <TableCaption mt={1}>(deviation from the average)</TableCaption>
        <Thead>
          <Tr>
            <Th>Payer</Th>
            <Th isNumeric>Sum</Th>
            <Th isNumeric>Dev.</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sorted.map(([payer, value]) => {
            const deviation = Math.round(Math.abs(average - value))
            return (
              <Tr key={payer}>
                <Td>{capitalizeFirstChar(payer)}</Td>
                <Td isNumeric>{Math.round(value)}</Td>
                <Td isNumeric minW='76px'>
                  {`${average < value ? "+" : "-"} ${deviation}`}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Total</Th>
            <Th isNumeric>{total}</Th>
            <Th isNumeric>{average}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}
