import { Tr, Td } from "@chakra-ui/react"
import { MenuEditDelete } from "../Menu/MenuEditDelete"
import * as R from "ramda"
import { capitalizeFirstChar } from "../../../utility/utility"
import { useSelector } from "react-redux"

export const TableRow = ({ d, onDelete, onEdit, onPick }) => {
  const signedIn = useSelector(state => state.authentication.signedIn)
  return (
    <Tr _hover={{ boxShadow: "inner" }} onClick={onPick}>
      <Td isNumeric>{R.pipe(R.split("-"), R.reverse, R.join("-"))(d.date)}</Td>
      <Td isNumeric>{d.value}</Td>
      <Td>{capitalizeFirstChar(d.payer)}</Td>
      <Td>{capitalizeFirstChar(d.category)}</Td>
      <Td>{d.tags ? d.tags.map(capitalizeFirstChar).join(", ") : null}</Td>
      <Td>{capitalizeFirstChar(d.more)}</Td>
      {signedIn && (
        <Td>
          <MenuEditDelete id={d.id} onDelete={onDelete} onEdit={onEdit} />
        </Td>
      )}
    </Tr>
  )
}
