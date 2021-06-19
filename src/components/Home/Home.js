import { Grid, GridItem } from "@chakra-ui/layout"
import { Heading, HStack, VStack } from "@chakra-ui/react"
import * as R from "ramda"
import { useEffect, useState } from "react"
import { monthsMapFull } from "../../utility/maps"
import { GroupedVerticalBarChart } from "../DataViz/BarChart/GroupedVerticalBarChart/GroupedVerticalBarChart"
import { VerticalBarChart } from "../DataViz/BarChart/VerticalBarChart/VerticalBarChart"
import { PieChart } from "../DataViz/PieChart/PieChart"
import { CategorySummaryTable } from "../Tables/CategorySummaryTable/CategorySummaryTable"
import { PayerSummaryTable } from "../Tables/PayerSummaryTable/PayerSummaryTable"
import { ForwardBackward } from "../UI/ForwardBackward/ForwardBackward"

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
  signedIn,
}) => {
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

  const groupedMonths = R.pipe(
    R.propOr({}, "year"),
    R.map(R.groupBy(R.prop("month"))),
  )(groupedTree)

  useEffect(() => {
    const years = sortKeysAscending(groupedTree.year)
    setYears(years)
    setYear(R.last(years))
    const months = sortKeysAscending(groupedMonths[R.last(years)])
    setMonths(months)
    setMonth(R.last(months))
    setYearIndex(getLastIndex(years))
    setMonthIndex(getLastIndex(months))
  }, [groupedTree.year])

  useEffect(() => {
    const months = sortKeysAscending(groupedMonths[year])
    setMonths(months)
    const index = months.indexOf(month)
    setMonthIndex(index === -1 ? getLastIndex(months) : index)
  }, [year])

  const initSubField = R.zipObj(subField, subField.map(R.always(0)))

  const monthFields = R.toPairs(
    getCategorySums(initSubField)(groupedMonths?.[year]?.[month] || []),
  )

  const yearFields = R.toPairs(
    getCategorySumsOfMonths(initSubField)(groupedTree.year?.[year] || []),
  )

  const averages = getAverages(subField, yearFields)

  const payerMonthFields = R.pipe(
    groupByProp("payer"),
    getSums,
    R.toPairs,
  )(groupedMonths?.[year]?.[month] || [])

  return (
    <Grid justifyContent='center' rowGap={0} columnGap={8} pt={1}>

      <GridItem rowStart='1' colStart='1' colSpan='2'>
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
      </GridItem>

      <GridItem rowStart='1' colStart='3' colSpan='2'>
        <HStack>
          <ForwardBackward
            onDec={onDecMonth}
            onInc={onIncMonth}
            isDisabledInc={isDisabledIncMonth}
            isDisabledDec={isDisabledDecMonth}
          />
          <Heading size='lg' p={2} ml={3}>
            {monthsMapFull.get(month)}
          </Heading>
        </HStack>
        <VerticalBarChart
          fields={monthFields}
          height={350}
          width={550}
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

      <GridItem rowStart='1' colStart='5' rowSpan='3' alignSelf='start' pt={6}>
        <VStack spacing={6} align='start'>
          <CategorySummaryTable monthFields={monthFields} averages={averages} hovered={hovered} />
          <PayerSummaryTable payerMonthFields={payerMonthFields} />
        </VStack>
      </GridItem>

      <GridItem rowStart='2' colStart='1' colSpan='4' justifySelf='end'>
        <HStack mt={2}>
          <ForwardBackward
            onDec={onDecYear}
            onInc={onIncYear}
            isDisabledInc={isDisabledIncYear}
            isDisabledDec={isDisabledDecYear}
          />
          <Heading size='lg' p={1} ml={3} orientation='vertical'>
            {year}
          </Heading>
        </HStack>
        <GroupedVerticalBarChart
          fields={yearFields}
          height={350}
          width={800}
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
    </Grid>
  )
}


