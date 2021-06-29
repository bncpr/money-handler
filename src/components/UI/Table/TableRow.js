import { Tag, TagLabel, Td, Text, Tr, Wrap } from "@chakra-ui/react"
import { nanoid } from "@reduxjs/toolkit"
import * as R from "ramda"
import { capitalizeFirstChar } from "../../../utility/utility"
import { MenuEditDelete } from "../Menu/MenuEditDelete"

export const TableRow = ({
  d,
  onDelete,
  onEdit,
  onPick,
  categoryColors,
  setFilter,
  filters,
}) => {
  return (
    <Tr _hover={{ boxShadow: "inner" }} onClick={() => onPick(d.id)}>
      <Td isNumeric>{R.pipe(R.split("-"), R.reverse, R.join("-"))(d.date)}</Td>
      <Td isNumeric fontWeight='semibold'>
        {Math.round(d.value)}
      </Td>
      <Td>
        <Text
          onClick={filters.payer ? null : () => setFilter("payer", d.payer)}
          cursor={filters.payer ? "default" : "pointer"}
          _hover={{
            fontWeight: "semibold",
          }}
        >
          {capitalizeFirstChar(d.payer)}
        </Text>
      </Td>
      <Td py={2}>
        <Tag
          rounded='full'
          size='lg'
          bgColor={categoryColors[d.category] + "e6"}
          color='white'
          onClick={
            filters.category ? null : () => setFilter("category", d.category)
          }
          cursor={filters.category ? "default" : "pointer"}
          _hover={{
            color: "gray.300",
          }}
        >
          <TagLabel overflow='visible'>
            {capitalizeFirstChar(d.category)}
          </TagLabel>
        </Tag>
      </Td>
      <Td>
        <Wrap maxW='256px'>
          {d.tags?.map(label => (
            <Tag key={nanoid()} mx='2px'>
              <TagLabel>{label}</TagLabel>
            </Tag>
          ))}
        </Wrap>
      </Td>
      <Td>{d.more}</Td>
      <Td>
        <MenuEditDelete onDelete={onDelete} onEdit={onEdit} />
      </Td>
    </Tr>
  )
}
