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

export const PayerSummaryTable = ({
  payerMonthFields,
  ...rest
}: {
  payerMonthFields: [string, number][]
}) => {
  const sorted = R.sort(R.ascend(R.head), payerMonthFields)
  const total = Math.round(R.sum(payerMonthFields.map(R.last) as number[]))
  const average = Math.round(total / payerMonthFields.length || 0)
  return (
    <Box {...rest}>
      <Table size='sm'>
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
            const sign = average < value ? "+" : "-"
            return (
              <Tr key={payer}>
                <Td>{capitalizeFirstChar(payer)}</Td>
                <Td isNumeric>{Math.round(value)}</Td>
                <Td isNumeric whiteSpace='nowrap'>
                  {`${deviation === 0 ? "" : sign} ${deviation}`}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th isNumeric>Total</Th>
            <Th isNumeric>{total}</Th>
            <Th isNumeric>{average}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}
