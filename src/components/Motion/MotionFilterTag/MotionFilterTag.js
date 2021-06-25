import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { monthsMap } from "../../../utility/maps"
import { capitalizeFirstChar } from "../../../utility/utility"

export const MotionFilterTag = ({ filter, value, setFilter }) => {
  return (
    <motion.div
      key={filter}
      // initial={{ opacity: 0.5 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0.5 }}
      layout
    >
      <Tag size='lg' borderRadius='full' variant='subtle' colorScheme='gray'>
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
