import { Text, HStack } from "@chakra-ui/layout"
import { IconButton } from "@chakra-ui/react"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { NumberInputComp } from "../Form/NumberInputComp/NumberInputComp"

export const PagePanel = ({
  page,
  pagesNum,
  pageSize,
  onIncPage,
  onDecPage,
  changePageSize,
  ...rest
}: any) => {
  return (
    <HStack {...rest}>
      <IconButton
        aria-label='previous-page'
        variant='link'
        onClick={onDecPage}
        isDisabled={page <= 0}
        icon={<ArrowBackIcon />}
      />
      <Text>
        {page + 1} / {pagesNum}
      </Text>
      <IconButton
        aria-label='next-page'
        variant='link'
        onClick={onIncPage}
        isDisabled={page + 1 >= pagesNum}
        icon={<ArrowForwardIcon />}
      />

      <label>Page Size: </label>
      <NumberInputComp
        value={pageSize}
        onChange={changePageSize}
        size='sm'
        min={0}
        max={100}
        maxW={20}
        focus={{ boxShadow: "none" }}
      />
    </HStack>
  )
}
