import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { monthsMapFull } from "../../../utility/maps"

export const MonthsSummaryTable = ({
  monthlySumsPairs,
}: {
  monthlySumsPairs: [string, number][]
}) => {
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Month</Th>
          <Th isNumeric>Sum</Th>
        </Tr>
      </Thead>
      <Tbody>
        {monthlySumsPairs.map(([month, value]) => (
          <Tr>
            <Td>{monthsMapFull.get(month)}</Td>
            <Td>{value}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
