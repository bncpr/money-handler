import { Grid, GridItem } from "@chakra-ui/layout"
import { Heading } from "@chakra-ui/react"
import * as R from "ramda"
import { useEffect, useState } from "react"
import { monthsMap, monthsMapFull } from "../../utility/maps"
import { GroupedVerticalBarChart } from "../DataViz/BarChart/GroupedVerticalBarChart/GroupedVerticalBarChart"
import { VerticalBarChart } from "../DataViz/BarChart/VerticalBarChart/VerticalBarChart"
import { PieChart } from "../DataViz/PieChart/PieChart"
import { CalendarSelect } from "../UI/Form/CalendarSelect/CalendarSelect"

export const groupByProp = prop => R.groupBy(R.prop(prop))
const getSums = R.map(R.pipe(R.map(R.prop("value")), R.sum))

const sortKeysAscending = R.pipe(R.keys, R.sortBy(R.identity))

export const Home = ({ groupedTree, colors, subField }) => {
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [years, setYears] = useState([])
  const [months, setMonths] = useState([])
  const [index, setIndex] = useState(0)

  const clampYears = R.clamp(0, (years.length || 1) - 1)

  const onIncIndex = () => setIndex(clampYears(index + 1))
  const onDecIndex = () => setIndex(clampYears(index - 1))

  const groupedMonths = R.pipe(
    R.propOr({}, "year"),
    R.map(R.groupBy(R.prop("month"))),
  )(groupedTree)

  useEffect(() => {
    if (R.isEmpty(years) && !year && !month) {
      const years = sortKeysAscending(groupedTree.year)
      setYears(years)
      setYear(R.last(years))
      const months = sortKeysAscending(groupedMonths[R.last(years)])
      setMonths(months)
      setMonth(R.last(months))
      setIndex(years.length - 1)
    }
  }, [groupedTree.year])

  useEffect(() => {
    setYear(years[clampYears(index)])
  }, [index, years])

  useEffect(() => {
    const months = sortKeysAscending(groupedMonths[year])
    setMonths(months)
    if (!months.includes(month)) {
      setMonth(R.last(months))
    }
  }, [year])

  useEffect(() => {
    // console.log(months, years, index, year, month)
  }, [months, years, index, year, month])

  const initSubField = R.zipObj(subField, subField.map(R.always(0)))

  const monthFields = R.pipe(
    R.groupBy(R.prop("category")),
    R.map(R.pipe(R.map(R.prop("value")), R.sum)),
    R.mergeRight(initSubField),
    R.toPairs,
  )(groupedMonths?.[year]?.[month] || [])

  const yearFields = R.pipe(
    groupByProp("month"),
    R.map(groupByProp("category")),
    R.map(getSums),
    R.map(R.mergeRight(initSubField)),
    R.toPairs,
  )(groupedTree.year?.[year] || [])

  const averages = R.zipObj(
    subField,
    subField.map(key =>
      R.pipe(
        R.map(R.path([1, key])),
        R.converge(R.divide, [R.sum, R.length]),
        Math.floor,
      )(yearFields),
    ),
  )
  const [hovered, setHovered] = useState("")

  return (
    <Grid
      justifyContent='center'
      justifyItems='center'
      alignItems='center'
      rowGap={0}
      columnGap={3}
      pt={1}
    >
      <GridItem rowStart='1' colStart='1'>
        <Heading size='lg' p={2} ml={3}>
          Monthly Averages
        </Heading>
        <PieChart
          width={350}
          height={350}
          margin={25}
          data={R.toPairs(averages)}
          colors={colors.categoryColors || {}}
          setHovered={setHovered}
          hovered={hovered}
        />
      </GridItem>
      <GridItem rowStart={["2", "1"]} colStart={["1", "2"]}>
        <Heading size='lg' p={2} ml={3}>
          {monthsMapFull.get(month)}
        </Heading>
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

      <GridItem rowStart={["3", "1"]} colStart={["1", "3"]} alignSelf='start'>
        <CalendarSelect
          month={month}
          year={year}
          onDecIndex={onDecIndex}
          onIncIndex={onIncIndex}
          isDisabledDec={index === 0}
          isDisabledInc={index === years.length - 1}
          months={months}
          setMonth={setMonth}
        />
      </GridItem>
      <GridItem
        rowStart={["4", "3"]}
        colStart='1'
        colSpan={["1", "2"]}
        justifySelf='center'
      >
        <Heading size='lg' p={1} ml={3} orientation='vertical'>
          {year}
        </Heading>
        <GroupedVerticalBarChart
          fields={yearFields}
          height={400}
          width={900}
          fieldName='month'
          subFieldName='category'
          subField={subField}
          colors={colors.categoryColors || {}}
          margin={{ top: 30, right: 20, bottom: 55, left: 55 }}
          setHovered={setHovered}
          hovered={hovered}
          average={averages[hovered]}
          month={month}
        />
      </GridItem>
    </Grid>
  )
}
