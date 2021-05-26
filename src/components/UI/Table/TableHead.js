import { Thead, Tr, Th } from "@chakra-ui/react"

export const TableHead = ({ headers }) => (
  <Thead>
    <Tr>
      {headers.map(header => (
        <Th key={header}>{header}</Th>
      ))}
    </Tr>
  </Thead>
)
