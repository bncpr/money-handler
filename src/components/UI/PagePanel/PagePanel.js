import { Text, HStack } from "@chakra-ui/layout"
import { IconButton, Input } from "@chakra-ui/react"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"

export const PagePanel = ({
  page,
  pagesNum,
  pageSize,
  changePage,
  changePageSize,
  style,
}) => {
  return (
    <HStack {...style}>
      <IconButton
        onClick={changePage(-1)}
        isDisabled={page <= 0}
        icon={<ArrowBackIcon />}
      />
      <Text>
        Page {page + 1} of {pagesNum + 1}
      </Text>
      <IconButton
        onClick={changePage(1)}
        isDisabled={page >= pagesNum}
        icon={<ArrowForwardIcon />}
      />

      <label>Page Size: </label>
      <Input value={pageSize} onChange={changePageSize} w='14' />
    </HStack>
  )
}
