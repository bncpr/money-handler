import { Button, IconButton } from "@chakra-ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Flex, SimpleGrid, Stack } from "@chakra-ui/layout"
import { monthsMap } from "../../../../utility/maps"

export const CalendarSelect = ({
  month,
  year,
  onDecIndex,
  onIncIndex,
  isDisabledDec,
  isDisabledInc,
  months,
  setMonth,
  ...rest
}: any) => {
  return (
    <Flex
      direction='column'
      shadow='lg'
      borderRadius='lg'
      // m={3}
      px={8}
      py={6}
      align='center'
      w='max'
      {...rest}
    >
      <Stack direction='row' align='center'>
        <IconButton
          aria-label='previous'
          icon={<ChevronLeftIcon />}
          variant='ghost'
          fontSize={30}
          onClick={onDecIndex}
          isDisabled={isDisabledDec}
        />
        <Box as='span' fontSize={20} fontWeight='semibold'>
          {year}
        </Box>
        <IconButton
          aria-label='next'
          icon={<ChevronRightIcon />}
          variant='ghost'
          fontSize={30}
          onClick={onIncIndex}
          isDisabled={isDisabledInc}
        />
      </Stack>
      <SimpleGrid columns={4} spacing={1} mt={2}>
        {months.map((m: string) => (
          <Button
            key={m}
            variant={m === month ? "solid" : "ghost"}
            colorScheme='gray'
            size='sm'
            onClick={() => setMonth(m)}
          >
            {monthsMap.get(m)}
          </Button>
        ))}
      </SimpleGrid>
    </Flex>
  )
}
