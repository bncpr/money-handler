import { Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/layout"
import {
  Box,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react"
import { format } from "d3"
import * as R from "ramda"
import { useEffect, useState } from "react"
import { monthsMapFull } from "../../utility/maps"
import { capitalizeFirstChar } from "../../utility/utility"
import { GroupedVerticalBarChart } from "../DataViz/BarChart/GroupedVerticalBarChart/GroupedVerticalBarChart"
import { VerticalBarChart } from "../DataViz/BarChart/VerticalBarChart/VerticalBarChart"
import { PieChart } from "../DataViz/PieChart/PieChart"
import { CalendarSelect } from "../UI/Form/CalendarSelect/CalendarSelect"

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

export const Home = ({
  groupedTree,
  colors,
  subField,
  signedIn,
  payerField,
}) => {
  const [hovered, setHovered] = useState("")
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
          margin={25}
          data={R.toPairs(averages)}
          colors={colors.categoryColors || {}}
          setHovered={setHovered}
          hovered={hovered}
        />
      </GridItem>
      <GridItem rowStart='1' colStart='3' colSpan='2'>
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

      <GridItem rowStart='1' colStart='5' rowSpan='3' alignSelf='start' pt={9}>
        <VStack spacing={6} align='start'>
          {/* {signedIn || <LoginForm />} */}
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
          <CategorySummaryTable monthFields={monthFields} averages={averages} />
          <PayerSummaryTable payerMonthFields={payerMonthFields} />
        </VStack>
      </GridItem>
      <GridItem rowStart='2' colStart='1' colSpan='4' justifySelf='end'>
        <Heading size='lg' p={1} ml={3} orientation='vertical'>
          {year}
        </Heading>
        <GroupedVerticalBarChart
          fields={yearFields}
          height={400}
          width={850}
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

const PayerSummaryTable = ({ payerMonthFields }) => {
  const total = Math.round(R.sum(payerMonthFields.map(R.last)))
  const average = Math.round(total / payerMonthFields.length)
  return (
    <Box shadow='lg' borderRadius='lg' p={4}>
      <Table size='sm'>
        <TableCaption mt={1}>(deviation from the average)</TableCaption>
        <Thead>
          <Tr>
            <Th>Payer</Th>
            <Th isNumeric>Sum</Th>
            <Th isNumeric>Dev.</Th>
          </Tr>
        </Thead>
        <Tbody>
          {payerMonthFields.map(([payer, value]) => {
            const deviation = Math.round(Math.abs(average - value))
            return (
              <Tr key={payer}>
                <Td>{capitalizeFirstChar(payer)}</Td>
                <Td isNumeric>{Math.round(value)}</Td>
                <Td
                  display='flex'
                  direction='row'
                  justifyContent='space-between'
                >
                  <Text>{average < value ? "+" : "-"}</Text>
                  <Text>{deviation}</Text>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Total</Th>
            <Th isNumeric>{total}</Th>
            <Th isNumeric>{average}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}

const CategorySummaryTable = ({ monthFields, averages }) => {
  const sorted = R.sort(R.descend(R.last), monthFields)
  return (
    <Box shadow='lg' borderRadius='lg' p={6}>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th isNumeric>Sum</Th>
            <Th isNumeric>Avg.</Th>
            <Th isNumeric>Diff.</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sorted.map(([key, value]) => {
            const average = averages[key]
            const difference = Math.round(Math.abs(value - average))

            return (
              <Tr key={key}>
                <Td>{capitalizeFirstChar(key)}</Td>
                <Td isNumeric>{Math.round(value)}</Td>
                <Td isNumeric>{average}</Td>
                <Td
                  display='flex'
                  direction='row'
                  justifyContent='space-between'
                >
                  <Text>
                    {average > value ? "+" : average === value ? "" : "-"}
                  </Text>
                  <Text>{difference}</Text>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Total</Th>
            <Th isNumeric>{Math.round(R.sum(monthFields.map(R.last)))}</Th>
            <Th isNumeric>{Math.round(R.sum(R.values(averages)))}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}
