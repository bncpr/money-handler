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
import { useWindowSize } from "../../hooks/useWindowSize/useWindowSize"
import { monthsMapFull } from "../../utility/maps"
import { capitalizeFirstChar } from "../../utility/utility"
import { BreadCrumbsSelect } from "../BreadCrumbs/BreadCrumbsSelect"
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

  const [view, setView] = useState("year")

  const payerMonthFields = R.pipe(
    groupByProp("payer"),
    getSums,
    R.toPairs,
  )(groupedMonths?.[year]?.[month] || [])

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  })

  const [isMedium] = useMediaQuery([
    "(max-width: 1045px)",
  ])


  const chartWidth = isMedium ? 600 : 960
  const chartHeight = isMedium ? 300 : 500

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
            h='calc(100% - 46px)'
            overflow='auto'
            overflowX='hidden'
            shadow='base'
          >
            <CloseButton
              mr='auto'
              ml={3}
              my={3}
              onClick={onClose}
              pos='absolute'
            />
            <VStack spacing={3} align='stretch' px={6} pt={4}>
              <Heading size='sm' p={2} fontWeight='semibold' alignSelf='center'>
                {`${monthsMapFull.get(month)} ${year}`}
              </Heading>
              <CategorySummaryTable
                monthFields={monthFields}
                averages={averages}
                setHovered={setHovered}
                hovered={hovered}
              />
              <PayerSummaryTable payerMonthFields={payerMonthFields} />
              <Heading size='sm' p={2} fontWeight='semibold'>
                Monthly Averages
              </Heading>
              <PieChart
                width={250}
                height={250}
                margin={0}
                data={R.toPairs(averages)}
                colors={colors.categoryColors || {}}
                // setHovered={setHovered}
                hovered={hovered}
                shadow='none'
                alignSelf='center'
              />
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

        <VStack
          w='min'
          spacing={4}
          mx='auto'
          mr={isOpen && RIGHT_DRAWER_WIDTH + 20}
        >
          {!isLoading && (
            <HStack alignSelf='start' pl={16} pr={16} w='100%'>
              <BreadCrumbsSelect
                view='year'
                value='year'
                label={year}
                field={years}
                onChange={setYear}
              />
              <BreadCrumbsSelect
                view={view}
                value='month'
                label={month}
                field={months}
                onChange={setMonth}
              />
              <Spacer />
              <Button
                alignSelf='flex-end'
                onClick={() => setView(view === "month" ? "year" : "month")}
              >
                {view === "month" && "View Year"}
                {view === "year" && "View Month"}
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
                height={chartHeight}
                width={chartWidth}
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
              <BackButton onDec={onDecYear} isDisabledDec={isDisabledDecYear} />
              <GroupedVerticalBarChart
                fields={yearFields}
                height={chartHeight}
                width={chartWidth}
                fieldName='month'
                subFieldName='category'
                subField={subField}
                colors={colors.categoryColors || {}}
                margin={{ top: 20, right: 20, bottom: 40, left: 55 }}
                setHovered={setHovered}
                hovered={hovered}
                average={averages[hovered]}
                month={month}
                setMonth={setMonth}
              />
              <ForwardButton
                onInc={onIncYear}
                isDisabledInc={isDisabledIncYear}
              />
            </HStack>
          )}
        </VStack>
      </Box>
    )
  )
}
