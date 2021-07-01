import { Grid, GridItem } from "@chakra-ui/layout"
import {
  Box,
  Button,
  CloseButton,
  Heading,
  HStack,
  Portal,
  Slide,
  Stack,
  StackItem,
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
import { CategorySummaryTable } from "../Tables/CategorySummaryTable/CategorySummaryTable"
import { PayerSummaryTable } from "../Tables/PayerSummaryTable/PayerSummaryTable"
import {
  BackButton,
  ForwardBackward,
  ForwardButton,
} from "../UI/ForwardBackward/ForwardBackward"
import { NoEntriesModal } from "../NoEntriesModal/NoEntriesModal"

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

  const [isNarrow] = useMediaQuery("(max-width: 1433px)")

  return (
    <Box py={6}>
      <NoEntriesModal isOpen={isEmptyEntries && !isLoading && isSignedIn} />
      <Slide
        in={isOpen && view === "month"}
        direction='left'
        width='460px'
        style={{ zIndex: 10, maxWidth: "460px" }}
      >
        <Box
          top='46px'
          position='fixed'
          w='460px'
          bg='white'
          h='full'
          overflow='auto'
          shadow='base'
        >
          <CloseButton ml='auto' mr={3} my={3} onClick={onClose} />
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

      <Button onClick={onToggle} pos='absolute' top='46px' right='0'>
        {`${isOpen}`}
      </Button>
      <Button
        onClick={() => setView(view === "month" ? "year" : "month")}
        pos='absolute'
        top='92px'
        right='0'
      >
        {view}
      </Button>
      {view === "month" && (
        <Grid
          ml={isOpen && "460px"}
          pr={isOpen && "15%"}
          pl={3}
          align='start'
          rowGap={3}
          columnGap={2}
        >
          <GridItem colStart='2' pl='5%'>
            <Heading size='lg' p={2} ml={3}>
              {`${monthsMapFull.get(month)} ${year}`}
            </Heading>
          </GridItem>

          <GridItem rowStart='2' alignSelf='center' justifySelf='end'>
            <BackButton onDec={onDecMonth} isDisabledDec={isDisabledDecMonth} />
          </GridItem>

          <GridItem rowStart='2' justifySelf='center'>
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
          </GridItem>
          <GridItem rowStart='2' alignSelf='center' justifySelf='start'>
            <ForwardButton
              onInc={onIncMonth}
              isDisabledInc={isDisabledIncMonth}
            />
          </GridItem>
        </Grid>
      )}

      {view === "year" && (
        <Stack
          mx='auto'
          align='start'
          w='min'
          spacing={6}
          direction={isNarrow ? "column" : "row"}
        >
          <StackItem pl={isNarrow && 12}>
            <Heading size='lg' p={2} ml={3}>
              Monthly Averages
            </Heading>
            <PieChart
              width={350}
              height={350}
              margin={20}
              data={R.toPairs(averages)}
              colors={colors.categoryColors || {}}
              setHovered={setHovered}
              hovered={hovered}
            />
          </StackItem>

          <StackItem>
            <Grid columnGap={2}>
              <GridItem colStart='2' pl="5%">
                <Heading size='lg' p={2} ml={3}>
                  {year}
                </Heading>
              </GridItem>
              <GridItem rowStart='2' alignSelf='center' justifySelf='end'>
                <BackButton
                  onDec={onDecYear}
                  isDisabledDec={isDisabledDecYear}
                />
              </GridItem>
              <GridItem rowStart='2'>
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
              </GridItem>
              <GridItem rowStart='2' alignSelf='center' justifySelf='start'>
                <ForwardButton
                  onInc={onIncYear}
                  isDisabledInc={isDisabledIncYear}
                />
              </GridItem>
            </Grid>
          </StackItem>
        </Stack>
      )}
    </Box>
  )
}
