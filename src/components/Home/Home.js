import {
  Flex
} from "@chakra-ui/layout"
import * as R from "ramda"
import { useEffect, useState } from "react"
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
    setMonths(sortKeysAscending(groupedMonths[year]))
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
    <Flex direction={["column, row"]} align='flex-start' justify='center'>
      <Flex direction='column' align='center'>
        <Flex direction={["column", "row"]} align='center'>
          <PieChart
            width={350}
            height={350}
            margin={30}
            data={R.toPairs(averages)}
            colors={colors.categoryColors || {}}
            mx={2}
            my={3}
            setHovered={setHovered}
            hovered={hovered}
          ></PieChart>

          <VerticalBarChart
            fields={monthFields}
            height={350}
            width={600}
            fieldName='category'
            colors={colors.categoryColors || {}}
            margin={{ top: 40, right: 20, bottom: 50, left: 45 }}
            label={`${month}-${year}`}
            sortByValue
            subField={subField}
            my={3}
            mx={2}
            fontSize='0.9em'
            setHovered={setHovered}
            hovered={hovered}
          />
        </Flex>
        <GroupedVerticalBarChart
          fields={yearFields}
          height={450}
          width={970}
          fieldName='month'
          subFieldName='category'
          subField={subField}
          colors={colors.categoryColors || {}}
          margin={{ top: 30, right: 20, bottom: 55, left: 55 }}
          label={year}
          mx={6}
          setHovered={setHovered}
          hovered={hovered}
        />
      </Flex>
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
    </Flex>
  )
}


