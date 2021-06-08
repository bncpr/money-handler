import { Box, Flex, Stack } from "@chakra-ui/layout"
import { GroupedVerticalBarChart } from "../DataViz/BarChart/GroupedVerticalBarChart/GroupedVerticalBarChart"
import { VerticalBarChart } from "../DataViz/BarChart/VerticalBarChart/VerticalBarChart"
import { ChartBox } from "../DataViz/ChartBox/ChartBox"

export const Home = ({ groupedTree, colors, subField }) => {
  return (
    <Flex direction='column' align='center'>
      <Flex direction={["column", "row"]} align='center'>
        <ChartBox width={350} height={350} my={3} mx={2} />
        <VerticalBarChart
          entries={groupedTree.year?.["2021"] || []}
          height={350}
          width={600}
          fieldName='category'
          colors={colors.categoryColors || {}}
          margin={{ top: 40, right: 20, bottom: 35, left: 45 }}
          sortByValue
          my={3}
          mx={2}
          fontSize='0.8em'
        />
      </Flex>
      <GroupedVerticalBarChart
        entries={groupedTree.year?.["2021"] || []}
        height={450}
        width={970}
        fieldName='month'
        subFieldName='category'
        subField={subField}
        colors={colors.categoryColors || {}}
        margin={{ top: 40, right: 20, bottom: 55, left: 45 }}
        mx={6}
      />
    </Flex>
  )
}
