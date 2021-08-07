import {
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Stack,
  useBreakpointValue,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { ImStatsBars, ImStatsBars2 } from "react-icons/im"
import * as R from "remeda"
import { useAppSelector } from "../../hooks/reduxTypedHooks/reduxTypedHooks"
import { ColorsState } from "../../hooks/useColors/useColors"
import { Entry } from "../../types/Entry"
import { GroupedTree } from "../../types/GroupedTree"
import { getLastIndex } from "../../utility/functions/getLastIndex"
import { monthsMapFull } from "../../utility/maps"
import { sortCompMap } from "../../utility/sorting/sortCompMap"
import { BreadCrumbsSelect } from "../BreadCrumbs/BreadCrumbsSelect"
import { GroupedVerticalBarChart } from "../DataViz/BarChart/GroupedVerticalBarChart/GroupedVerticalBarChart"
import { GroupedVerticalStackedBarChart } from "../DataViz/BarChart/GroupedVerticalBarChart/GroupedVerticalStackedBarChart/GroupedVerticalStackedBarChart"
import { VerticalBarChart } from "../DataViz/BarChart/VerticalBarChart/VerticalBarChart"
import { NoEntriesModal } from "../NoEntriesModal/NoEntriesModal"
import { CategorySummaryTable } from "../Tables/CategorySummaryTable/CategorySummaryTable"
import { PayerSummaryTable } from "../Tables/PayerSummaryTable/PayerSummaryTable"
import { CardBox } from "../UI/Box/CardBox/CardBox"
import {
  BackButton,
  ForwardButton,
} from "../UI/ForwardBackward/ForwardBackward"
import { getAverages } from "./modules"

function getAscendingKeys(obj: Record<string, any> = {}) {
  return Object.keys(obj).sort(sortCompMap.ascend.string)
}

const groupByCategory = R.groupBy(R.prop<Entry, keyof Entry>("category"))
const getSums = R.createPipe(
  R.map(R.prop<Entry, "value">("value")),
  R.reduce((a, b) => a + b, 0),
)
const getCategorySums = R.createPipe(groupByCategory, R.mapValues(getSums))

type HomeProps = {
  groupedTree: GroupedTree
  colors: ColorsState
  subField: string[]
  isEmptyEntries: boolean
  isSignedIn: boolean
}

export const Home = ({
  groupedTree,
  colors,
  subField,
  isEmptyEntries,
  isSignedIn,
}: HomeProps) => {
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
  const [yearMonthCategorySumsPairs, setYearMonthCategorySumsPairs] = useState<
    [string, Record<string, number>][]
  >([])

  useEffect(() => {
    const monthEntries = R.pathOr(groupedMonths, [year, month], [])
    const sums = getCategorySums(monthEntries)
    setMonthCategorySumsPairs(R.toPairs(R.merge(initSubField, sums)))
  }, [groupedMonths, year, month, initSubField])

  useEffect(() => {
    const yearEntries = R.pathOr(groupedTree, ["year", year], [])
    const sums = R.pipe(
      yearEntries,
      R.groupBy(R.prop("month")),
      R.mapValues(getCategorySums),
      R.mapValues(obj => R.merge(initSubField, obj)),
    )
    setYearMonthCategorySumsPairs(R.toPairs(sums))
  }, [initSubField, year, groupedTree])

  const [payerMonthSumsPairs, setPayerMonthSumsPairs] = useState<
    [string, number][]
  >([])

  useEffect(() => {
    const monthEntries = R.pathOr(groupedMonths, [year, month], [])
    const sums = R.pipe(
      monthEntries,
      R.groupBy(R.prop("payer")),
      R.mapValues(getSums),
    )
    setPayerMonthSumsPairs(R.toPairs(sums))
  }, [groupedMonths, year, month])

  const averages = getAverages(subField, yearMonthCategorySumsPairs) as Record<
    string,
    number
  >

  const [view, setView] = useState<"year" | "month">("year")
  const [withStack, setWithStack] = useState(false)

  const buttonSize = useBreakpointValue({ base: "sm", sm: "md" })

  const barChartHeight =
    useBreakpointValue({ base: 180, sm: 390, lg: 500 }) || 500
  const barChartWidth =
    useBreakpointValue({ base: 310, sm: 750, lg: 960 }) || 960

  const barChartMT = useBreakpointValue({ base: 10, md: 30 })
  const barChartMB = useBreakpointValue({ base: 35, md: 50 })
  const barChartML = useBreakpointValue({ base: 30, md: 55 })
  const barChartMR = useBreakpointValue({ base: 15, md: 20 })

  return isLoading ? null : (
    <Stack
      py={[2, 8]}
      direction={{ base: "column", xl: "row" }}
      spacing={[6, 12]}
      px={{ base: 0, md: 4, lg: 6, xl: 8 }}
      justify='center'
    >
      <NoEntriesModal isOpen={isEmptyEntries && !isLoading && isSignedIn} />

      <Grid
        columnGap={[0, 2]}
        templateColumns='1fr auto 1fr'
        templateRows='auto 1fr'
      >
        <Wrap
          as={GridItem}
          colStart={[1, 2]}
          colSpan={[3, 1]}
          px={{ base: 1, sm: 6 }}
          py={[1, 4]}
          w='full'
        >
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
              setView("month")
            }}
          />
          <Spacer />
          <IconButton
            aria-label=''
            icon={
              <Icon
                opacity='0.9'
                w={[4, 5]}
                h={[4, 5]}
                as={!withStack ? ImStatsBars2 : ImStatsBars}
              />
            }
            onClick={() => setWithStack(!withStack)}
            isDisabled={view === "month"}
            variant='ghost'
          />
          <Button
            colorScheme={view === "year" ? "teal" : "gray"}
            onClick={() => setView("year")}
            size={buttonSize}
          >
            Year
          </Button>
          <Button
            colorScheme={view === "month" ? "teal" : "gray"}
            onClick={() => setView("month")}
            size={buttonSize}
          >
            Month
          </Button>
        </Wrap>

        <GridItem rowStart={2} alignSelf='center' justifySelf='end'>
          <BackButton onDec={onDecIndex} isDisabledDec={isDisabledDec} />
        </GridItem>

        <GridItem colStart={2} rowStart={2} w='min'>
          {view === "month" && (
            <VerticalBarChart
              fields={monthCategorySumsPairs}
              height={barChartHeight}
              width={barChartWidth}
              fieldName='category'
              colors={colors.categoryColors || {}}
              margin={{
                top: barChartMT,
                right: barChartMR,
                bottom: barChartMB,
                left: barChartML,
              }}
              sortByValue
              subField={subField}
              setHovered={setHovered}
              hovered={hovered}
              average={averages[hovered]}
            />
          )}
          {view === "year" && withStack && (
            <GroupedVerticalStackedBarChart
              fields={yearMonthCategorySumsPairs}
              height={barChartHeight}
              width={barChartWidth}
              fieldName='month'
              subFieldName='category'
              subField={subField}
              colors={colors.categoryColors || {}}
              margin={{
                top: barChartMT,
                right: barChartMR,
                bottom: barChartMB,
                left: barChartML,
              }}
              setHovered={setHovered}
              hovered={hovered}
              average={averages[hovered]}
              month={month}
              setMonth={setMonth}
            />
          )}
          {view === "year" && !withStack && (
            <GroupedVerticalBarChart
              fields={yearMonthCategorySumsPairs}
              height={barChartHeight}
              width={barChartWidth}
              fieldName='month'
              subFieldName='category'
              subField={subField}
              colors={colors.categoryColors || {}}
              margin={{
                top: barChartMT,
                right: barChartMR,
                bottom: barChartMB,
                left: barChartML,
              }}
              setHovered={setHovered}
              hovered={hovered}
              average={averages[hovered]}
              month={month}
              setMonth={setMonth}
            />
          )}
        </GridItem>

        <GridItem
          colStart={3}
          rowStart={2}
          alignSelf='center'
          justifySelf='start'
        >
          <ForwardButton onInc={onIncIndex} isDisabledInc={isDisabledInc} />
        </GridItem>
      </Grid>

      <CardBox alignSelf={{ base: "center", xl: "flex-end" }} my={[0, 6]}>
        <VStack spacing={3} px={[2, 6]} py={4} alignItems='stretch'>
          <Heading size='sm' p={2} fontWeight='semibold' alignSelf='center'>
            {(view === "month" ? `${monthsMapFull.get(month)} ` : "") + year}
          </Heading>
          <CategorySummaryTable
            monthFields={monthCategorySumsPairs}
            averages={averages}
            hovered={hovered}
            setHovered={setHovered}
          />

          <PayerSummaryTable payerMonthFields={payerMonthSumsPairs} />
        </VStack>
      </CardBox>
    </Stack>
  )
}
