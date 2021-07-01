import { ChevronRightIcon, ChevronUpIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Slide,
  Spacer,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"
import * as R from "ramda"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { monthsMapFull } from "../../utility/maps"
import { GroupedVerticalBarChart } from "../DataViz/BarChart/GroupedVerticalBarChart/GroupedVerticalBarChart"
import { VerticalBarChart } from "../DataViz/BarChart/VerticalBarChart/VerticalBarChart"
import { PieChart } from "../DataViz/PieChart/PieChart"
import { NoEntriesModal } from "../NoEntriesModal/NoEntriesModal"
import { CategorySummaryTable } from "../Tables/CategorySummaryTable/CategorySummaryTable"
import { PayerSummaryTable } from "../Tables/PayerSummaryTable/PayerSummaryTable"
import {
  BackButton,
  ForwardButton,
} from "../UI/ForwardBackward/ForwardBackward"

export const groupByProp = prop => R.groupBy(R.prop(prop))
const getSums = R.map(R.pipe(R.map(R.prop("value")), R.sum))

const sortKeysAscending = R.pipe(R.keys, R.sortBy(R.identity))

const getCategorySums = init =>
  R.pipe(R.groupBy(R.prop("category")), getSums, R.mergeRight(init))

const getCategorySumsOfMonths = init =>
  R.pipe(groupByProp("month"), R.map(getCategorySums(init)))

function getAverages(subField, yearFields) {
  return R.zipObj(
    subField,
    subField.map(key =>
      R.pipe(
        R.map(R.path([1, key])),
        R.converge(R.divide, [R.sum, R.length]),
        Math.round,
        R.defaultTo(0),
      )(yearFields),
    ),
  )
}

const useIncrementSelect = ({ array }) => {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState("")

  const clamp = R.clamp(0, (array.length || 1) - 1)

  const onIncIndex = () => setIndex(clamp(index + 1))
  const onDecIndex = () => setIndex(clamp(index - 1))

  useEffect(() => {
    setSelected(array[index])
  }, [index, array])

  const isDisabledInc = array && index === array.length - 1
  const isDisabledDec = array && index === 0

  return {
    selected,
    setSelected,
    setIndex,
    onIncIndex,
    onDecIndex,
    isDisabledDec,
    isDisabledInc,
  }
}

const getLastIndex = arr => arr.length - 1

const RIGHT_DRAWER_WIDTH = 420

export const Home = ({
  groupedTree,
  colors,
  subField,
  isEmptyEntries,
  isSignedIn,
}) => {
  const isLoading = useSelector(state => state.loading.isLoading)
  const [hovered, setHovered] = useState("")
  const [years, setYears] = useState([])
  const [months, setMonths] = useState([])

  const {
    selected: year,
    setSelected: setYear,
    setIndex: setYearIndex,
    onIncIndex: onIncYear,
    onDecIndex: onDecYear,
    isDisabledDec: isDisabledDecYear,
    isDisabledInc: isDisabledIncYear,
  } = useIncrementSelect({ array: years })

  const {
    selected: month,
    setSelected: setMonth,
    setIndex: setMonthIndex,
    onIncIndex: onIncMonth,
    onDecIndex: onDecMonth,
    isDisabledDec: isDisabledDecMonth,
    isDisabledInc: isDisabledIncMonth,
  } = useIncrementSelect({ array: months })

  const [groupedMonths, setGroupedMonths] = useState({})

  useEffect(() => {
    const groupedMonths = R.pipe(
      R.propOr({}, "year"),
      R.map(R.groupBy(R.prop("month"))),
    )(groupedTree)
    setGroupedMonths(groupedMonths)
  }, [groupedTree])

  useEffect(() => {
    const years = sortKeysAscending(groupedTree.year)
    setYears(years)
    setYear(R.last(years))
    const months = sortKeysAscending(groupedMonths[R.last(years)])
    setMonths(months)
    setMonth(R.last(months))
    setYearIndex(getLastIndex(years))
    setMonthIndex(getLastIndex(months))
    // eslint-disable-next-line
  }, [groupedTree, groupedMonths])

  useEffect(() => {
    const months = sortKeysAscending(groupedMonths[year])
    setMonths(months)
    const index = months.indexOf(month)
    setMonthIndex(index === -1 ? getLastIndex(months) : index)
    // eslint-disable-next-line
  }, [year, groupedMonths, month])

  const initSubField = R.zipObj(subField, subField.map(R.always(0)))

  const monthFields = R.toPairs(
    getCategorySums(initSubField)(groupedMonths?.[year]?.[month] || []),
  )

  const yearFields = R.toPairs(
    getCategorySumsOfMonths(initSubField)(groupedTree.year?.[year] || []),
  )

  const averages = getAverages(subField, yearFields)

  const [view, setView] = useState("month")

  const payerMonthFields = R.pipe(
    groupByProp("payer"),
    getSums,
    R.toPairs,
  )(groupedMonths?.[year]?.[month] || [])

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  const [isNarrow, isWide, isHigh] = useMediaQuery([
    "(max-width: 1390px)",
    "(min-width: 1920px)",
    "(min-height: 958px)",
  ])

  return (
    !isLoading && (
      <Box py={3}>
        <NoEntriesModal isOpen={isEmptyEntries && !isLoading && isSignedIn} />
        <Slide
          in={isOpen}
          direction='right'
          width={RIGHT_DRAWER_WIDTH}
          style={{ zIndex: 10, maxWidth: RIGHT_DRAWER_WIDTH }}
        >
          <Box
            top='46px'
            position='fixed'
            w={RIGHT_DRAWER_WIDTH}
            bg='white'
            h='full'
            overflow='auto'
            shadow='base'
          >
            <CloseButton mr='auto' ml={3} my={3} onClick={onClose} />
            <VStack spacing={6} align='stretch' px={9}>
              <CategorySummaryTable
                monthFields={monthFields}
                averages={averages}
                hovered={hovered}
              />
              <PayerSummaryTable payerMonthFields={payerMonthFields} />
            </VStack>
          </Box>
        </Slide>

        <Button
          onClick={onOpen}
          pos='absolute'
          bottom='80%'
          right='0'
          transform='rotate(-90deg)'
          transformOrigin='bottom right'
          colorScheme='gray'
          roundedBottom='none'
          rightIcon={<ChevronUpIcon w={5} h={5} />}
        >
          Summary
        </Button>

        <Flex
          direction={isNarrow || (isOpen && !isWide) ? "column" : "row"}
          align='start'
          // px={12}
          w='min'
          ml='auto'
          mr={isOpen ? RIGHT_DRAWER_WIDTH + (isWide ? 40 : 20) : "auto"}
        >
          <VStack w='min' spacing={4}>
            {!isLoading && (
              <HStack alignSelf='start' pl={16}>
                <ChevronRightIcon h={6} w={6} />
                <Button
                  size='sm'
                  variant='solid'
                  fontSize='xl'
                  onClick={() => setView("year")}
                >
                  <Text as={view === "year" && "u"}>{year}</Text>
                </Button>
                <ChevronRightIcon
                  opacity={view !== "month" && "0.3"}
                  h={6}
                  w={6}
                />
                <Button
                  size='sm'
                  variant={view === "month" ? "solid" : "subtle"}
                  fontSize='xl'
                  onClick={() => setView("month")}
                  opacity={view !== "month" && "0.3"}
                >
                  <Text as={view === "month" && "u"}>
                    {monthsMapFull.get(month)}
                  </Text>
                </Button>
              </HStack>
            )}

            {view === "month" && (
              <HStack spacing={3}>
                <BackButton
                  onDec={onDecMonth}
                  isDisabledDec={isDisabledDecMonth}
                />
                <VerticalBarChart
                  fields={monthFields}
                  height={500}
                  width={960}
                  fieldName='category'
                  colors={colors.categoryColors || {}}
                  margin={{ top: 20, right: 20, bottom: 50, left: 45 }}
                  sortByValue
                  subField={subField}
                  fontSize='0.9em'
                  setHovered={setHovered}
                  hovered={hovered}
                  average={averages[hovered]}
                />
                <ForwardButton
                  onInc={onIncMonth}
                  isDisabledInc={isDisabledIncMonth}
                />
              </HStack>
            )}

            {view === "year" && (
              <HStack spacing={3}>
                <BackButton
                  onDec={onDecYear}
                  isDisabledDec={isDisabledDecYear}
                />
                <GroupedVerticalBarChart
                  fields={yearFields}
                  height={500}
                  width={960}
                  fieldName='month'
                  subFieldName='category'
                  subField={subField}
                  colors={colors.categoryColors || {}}
                  margin={{ top: 20, right: 20, bottom: 40, left: 55 }}
                  setHovered={setHovered}
                  hovered={hovered}
                  average={averages[hovered]}
                  month={month}
                />
                <ForwardButton
                  onInc={onIncYear}
                  isDisabledInc={isDisabledIncYear}
                />
              </HStack>
            )}
          </VStack>

          {/* <VStack spacing={3} align='start' ml={9}>
            <Heading size='md' p={2} ml={3} fontWeight='semibold'>
              Monthly Averages
            </Heading>
            <PieChart
              width={300}
              height={300}
              margin={10}
              data={R.toPairs(averages)}
              colors={colors.categoryColors || {}}
              setHovered={setHovered}
              hovered={hovered}
            />
          </VStack> */}
        </Flex>
      </Box>
    )
  )
}
