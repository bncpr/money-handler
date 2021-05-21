import * as R from "ramda"
import { Tab, TabList, Tabs } from "@chakra-ui/tabs"
import { useEffect, useState } from "react"

export const TabsBar = ({ tabs, current, onChange }) => {
  const [tabsIndex, setTabsIndex] = useState(0)
  const [tabsList, setTabsList] = useState([])
  const onChangeHandler = index => {
    setTabsIndex(index)
    onChange(tabsList[index])
  }

  useEffect(() => {
    const tl = R.sortBy(R.identity, tabs)
    setTabsList(tl)
    setTabsIndex(tl.length - 1)
  }, [tabs])

  return (
    <Tabs
      index={tabsIndex}
      onChange={onChangeHandler}
      colorScheme='green'
      align='end'
      variant='soft-rounded'
      padding='2'>
      <TabList>
        {tabsList.map(key => (
          <Tab value={key} key={key} isSelected={current === key}>
            {key}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  )
}
