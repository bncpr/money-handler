import { ChevronUpIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  CloseButton,
  Grid,
  GridItem,
  Heading,
  HStack,
  Slide,
  Spacer,
  useDisclosure,
  useMediaQuery,
  VStack
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import * as R from "remeda"
import { useAppSelector } from "../../hooks/reduxTypedHooks/reduxTypedHooks"
import { Entry } from "../../types/Entry"
import { GroupedTree } from "../../types/GroupedTree"
import { monthsMapFull } from "../../utility/maps"
import { BreadCrumbsSelect } from "../BreadCrumbs/BreadCrumbsSelect"
import { GroupedVerticalBarChart } from "../DataViz/BarChart/GroupedVerticalBarChart/GroupedVerticalBarChart"
import { VerticalBarChart } from "../DataViz/BarChart/VerticalBarChart/VerticalBarChart"
import { PieChart } from "../DataViz/PieChart/PieChart"
import { NoEntriesModal } from "../NoEntriesModal/NoEntriesModal"
import { CategorySummaryTable } from "../Tables/CategorySummaryTable/CategorySummaryTable"
import { PayerSummaryTable } from "../Tables/PayerSummaryTable/PayerSummaryTable"
import {
  BackButton,
  ForwardButton
} from "../UI/ForwardBackward/ForwardBackward"
import { getAverages } from "./modules"

const getLastIndex = (arr: any[]) => arr.length - 1

const RIGHT_DRAWER_WIDTH = 420

const getAscendingKeys = (obj: Record<string, any> = {}) =>
  Object.keys(obj).sort((a: string, b: string) => a.localeCompare(b))

const groupByCategory = R.groupBy(R.prop<Entry, keyof Entry>("category"))
const getSums = R.createPipe(
  R.map(R.prop<Entry, "value">("value")),
  R.reduce((a, b) => a + b, 0),
)
const getCategorySums = R.createPipe(groupByCategory, R.mapValues(getSums))

export const Home = ({
  groupedTree,
  colors,
  subField,
  isEmptyEntries,
  isSignedIn,
}: {
  groupedTree: GroupedTree
  colors: any
  subField: string[]
  isEmptyEntries: boolean
  isSignedIn: boolean
}) => {
  const isLoading = useAppSelector(state => state.loading.isLoading)
  const groupedMonths = useAppSelector(
    state => state.groupedEntries.groupedMonths,
  )
  const [hovered, setHovered] = useState("")
  const [years, setYears] = useState<string[]>([])
  const [months, setMonths] = useState<string[]>([])
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [yearIndex, setYearIndex] = useState(0)
  const [monthIndex, setMonthIndex] = useState(0)

  const isDisabledInc =
    monthIndex === getLastIndex(months) && yearIndex === getLastIndex(years)

  const isDisabledDec = monthIndex === 0 && yearIndex === 0

  const onDecIndex = () => {
    if (isDisabledDec) return
    if (monthIndex > 0) {
      const index = monthIndex - 1
      setMonthIndex(index)
      setMonth(months[index])
      return
    }
    const _yearIndex = yearIndex - 1
    const _year = years[_yearIndex]
    const _months = getAscendingKeys(groupedMonths[_year])
    const _monthIndex = getLastIndex(_months)
    const _month = R.last(_months) || ""
    setYearIndex(_yearIndex)
    setYear(_year)
    setMonth(_month)
    setMonths(_months)
    setMonthIndex(_monthIndex)
  }

  const onIncIndex = () => {
    if (isDisabledInc) return
    if (monthIndex < getLastIndex(months)) {
      const index = monthIndex + 1
      setMonthIndex(index)
      setMonth(months[index])
      return
    }
    const _yearIndex = yearIndex + 1
    const _year = years[_yearIndex]
    const _months = getAscendingKeys(groupedMonths[_year])
    const _month = R.first(_months) || ""
    setYearIndex(_yearIndex)
    setYear(_year)
    setMonth(_month)
    setMonths(_months)
    setMonthIndex(0)
  }

  useEffect(() => {
    const months = getAscendingKeys(groupedMonths[year])
    setMonths(months)
    setYearIndex(years.indexOf(year))
  }, [year, groupedMonths, years])

  useEffect(() => {
    const index = months.indexOf(month)
    if (index === -1) {
      setMonth(R.last(months) || "")
      setMonthIndex(getLastIndex(months))
    } else {
      setMonthIndex(index)
    }
  }, [months, month])

  useEffect(() => {
    const years = Object.keys(groupedMonths)
    const year = R.last(years) || ""
    setYears(years)
    setYear(year)
    setYearIndex(getLastIndex(years))

    const months = getAscendingKeys(groupedMonths[year])
    const month = R.last(months) || ""
    setMonths(months)
    setMonth(month)
    setMonthIndex(getLastIndex(months))
  }, [groupedMonths])

  const initSubField = useMemo(
    () => R.mapToObj(subField, (x: string) => [x, 0]),
    [subField],
  )

  const [monthCategorySumsPairs, setMonthCategorySumsPairs] = useState<
    [string, number][]
  >([])

  useEffect(() => {
    const monthEntries = groupedMonths?.[year]?.[month] || []
    const sums = getCategorySums(monthEntries)
    setMonthCategorySumsPairs(R.toPairs(R.merge(initSubField, sums)))
  }, [groupedMonths, year, month, initSubField])

  const [yearMonthCategorySumsPairs, setYearMonthCategorySumsPairs] = useState<
    [string, Record<string, number>][]
  >([])

  useEffect(() => {
    const yearEntries = groupedTree.year?.[year] || []
    const sums = R.pipe(
      yearEntries,
      R.groupBy(R.prop("month")),
      R.mapValues(getCategorySums),
      R.mapValues(obj => R.merge(initSubField, obj)),
    )
    setYearMonthCategorySumsPairs(R.toPairs(sums))
  }, [initSubField, year, groupedTree])

  const averages = getAverages(subField, yearMonthCategorySumsPairs)

  const [view, setView] = useState("year")

  const [payerMonthSumsPairs, setPayerMonthSumsPairs] = useState<
    [string, number][]
  >([])

  useEffect(() => {
    const monthEntries = groupedMonths?.[year]?.[month] || []
    const sums = R.pipe(
      monthEntries,
      R.groupBy(R.prop("payer")),
      R.mapValues(getSums),
    )
    setPayerMonthSumsPairs(R.toPairs(sums))
  }, [groupedMonths, year, month])

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  })

  const [isMedium] = useMediaQuery(["(max-width: 1045px)"])

  const chartWidth = isMedium ? 600 : 960
  const chartHeight = isMedium ? 300 : 500

  return isLoading ? null : (
    <Box py={3}>
      <NoEntriesModal isOpen={isEmptyEntries && !isLoading && isSignedIn} />
      <Slide
        in={isOpen}
        direction='right'
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
              monthFields={monthCategorySumsPairs}
              averages={averages}
              hovered={hovered}
            />

            <PayerSummaryTable payerMonthFields={payerMonthSumsPairs} />

            <Heading size='sm' p={2} fontWeight='semibold'>
              Monthly Averages of {year}
            </Heading>

            <PieChart
              width={250}
              height={250}
              margin={0}
              data={R.toPairs(averages)}
              colors={colors.categoryColors || {}}
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

      <Grid
        mr={isOpen ? RIGHT_DRAWER_WIDTH + 20 : ""}
        align='center'
        templateColumns='1fr auto 1fr'
        columnGap={3}
        rowGap={4}
      >
        <GridItem as={HStack} colStart={2} px={2}>
          <BreadCrumbsSelect
            view='year'
            value='year'
            label={year}
            field={years}
            onChange={(val: string) => {
              setYear(val)
              setView("year")
            }}
          />
          <BreadCrumbsSelect
            view={view}
            value='month'
            label={month}
            field={months}
            onChange={(val: string) => {
              setMonth(val)
              onOpen()
              setView("month")
            }}
          />
          <Spacer />
          <Button
            alignSelf='flex-end'
            onClick={() => setView(view === "month" ? "year" : "month")}
            colorScheme='teal'
          >
            {view === "month" && "View Year"}
            {view === "year" && "View Month"}
          </Button>
        </GridItem>

        <GridItem rowStart={2} alignSelf='center' justifySelf='end'>
          <BackButton onDec={onDecIndex} isDisabledDec={isDisabledDec} />
        </GridItem>

        <GridItem
          colStart={3}
          rowStart={2}
          alignSelf='center'
          justifySelf='start'
        >
          <ForwardButton onInc={onIncIndex} isDisabledInc={isDisabledInc} />
        </GridItem>

        {view === "month" && (
          <GridItem colStart={2} rowStart={2}>
            <VerticalBarChart
              fields={monthCategorySumsPairs}
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
          </GridItem>
        )}

        {view === "year" && (
          <GridItem colStart={2} rowStart={2}>
            <GroupedVerticalBarChart
              fields={yearMonthCategorySumsPairs}
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
          </GridItem>
        )}
      </Grid>
    </Box>
  )
}