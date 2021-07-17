import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FilterField, SetFilter } from "../../../hooks/useFilters/useFilters"
import { monthsMap } from "../../../utility/maps"
import { capitalizeFirstChar } from "../../../utility/utility"

export const MotionFilterTag = ({
  filter,
  value,
  setFilter,
}: {
  filter: FilterField
  value: string
  setFilter: SetFilter
}) => {
  return (
    <motion.div key={filter} layout>
      <Tag size='lg' borderRadius='full' variant='solid' colorScheme='teal'>
        <TagLabel h='full' overflow='visible'>{`${capitalizeFirstChar(
          filter,
        )}: ${
          filter === "month" ? monthsMap.get(value) : capitalizeFirstChar(value)
        }`}</TagLabel>
        <TagCloseButton onClick={() => setFilter(filter, "")} />
      </Tag>
    </motion.div>
  )
}
