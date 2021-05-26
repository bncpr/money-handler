import { Tr, Td } from "@chakra-ui/react"
import { MenuEditDelete } from "../Menu/MenuEditDelete"

export const TableRow = ({ d, onDelete, onEdit, onPick }) => (
  <Tr _hover={{ boxShadow: "inner" }} onClick={onPick}>
    <Td isNumeric>{d.date}</Td>
    <Td isNumeric>{d.value}</Td>
    <Td>{d.payer}</Td>
    <Td>{d.category}</Td>
    <Td>{d.subcategories}</Td>
    <Td>{d.more}</Td>
    <Td>
      <MenuEditDelete id={d.id} onDelete={onDelete} onEdit={onEdit} />
    </Td>
  </Tr>
)
