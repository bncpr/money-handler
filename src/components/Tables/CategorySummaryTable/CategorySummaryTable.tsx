import {
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import * as R from "ramda"
import { capitalizeFirstChar } from "../../../utility/utility"

export const CategorySummaryTable = ({
  monthFields,
  averages,
  hovered,
  ...rest
}: {
  monthFields: [string, number][]
  averages: { [x: string]: number }
  hovered: string
}) => {
  const sorted = R.sortWith(
    [R.descend(R.last), R.descend(el => averages[el[0]])],
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
            const percent = ((average / sum) * 100).toFixed(1)
            const difference = Math.round(Math.abs(value - average))
            return (
              <Tr
                key={key}
                bg={hovered === key ? "gray.100" : ""}
                transition='opacity ease 100ms 100ms'
              >
                <Td>{capitalizeFirstChar(key)}</Td>

                <Td isNumeric>{Math.round(value)}</Td>
                <Td isNumeric whiteSpace='nowrap'>
                  <Text as='span'>
                    {average && `${average}`}
                    {percent && (
                      <Text as='span' fontSize='xs'>{` (${percent}%)`}</Text>
                    )}
                  </Text>
                </Td>
                <Td isNumeric whiteSpace='nowrap'>
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
            <Th isNumeric>{roundSum(monthFields.map(R.last) as number[])}</Th>
            <Th isNumeric>{sum}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}

function roundSum(arr: number[]) {
  return Math.round(R.sum(arr))
}
