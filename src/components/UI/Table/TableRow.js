import { Td, Tr, Tag, TagLabel } from "@chakra-ui/react"
import * as R from "ramda"
import { capitalizeFirstChar } from "../../../utility/utility"
import { MenuEditDelete } from "../Menu/MenuEditDelete"

export const TableRow = ({ d, onDelete, onEdit, onPick, categoryColors }) => {
  return (
    <Tr _hover={{ boxShadow: "inner" }} onClick={() => onPick(d.id)}>
      <Td isNumeric>{R.pipe(R.split("-"), R.reverse, R.join("-"))(d.date)}</Td>
      <Td isNumeric fontWeight='semibold'>
        {Math.round(d.value)}
      </Td>
      <Td>{capitalizeFirstChar(d.payer)}</Td>
      <Td py={2}>
        <Tag
          rounded='full'
          size='lg'
          bgColor={categoryColors[d.category] + "e6"}
          color='white'
        >
          <TagLabel overflow='visible'>
            {capitalizeFirstChar(d.category)}
          </TagLabel>
        </Tag>
      </Td>
      <Td>{d.tags ? d.tags.map(capitalizeFirstChar).join(", ") : null}</Td>
      <Td>{capitalizeFirstChar(d.more)}</Td>
      <Td>
        <MenuEditDelete id={d.id} onDelete={onDelete} onEdit={onEdit} />
      </Td>
    </Tr>
  )
}
