import * as R from "ramda"
import { Tab, TabList, Tabs } from "@chakra-ui/tabs"
import { useEffect, useState } from "react"

export const TabsBar = ({ tabs, current, onChange, ...rest }) => {
  const [tabsIndex, setTabsIndex] = useState(0)
  const [tabsList, setTabsList] = useState([])
  const onChangeHandler = index => {
    setTabsIndex(index)
    onChange(tabsList[index])
  }

  useEffect(() => {
    const tl = R.sortBy(R.identity, tabs)
    setTabsList(tl)
    setTabsIndex(tl.indexOf(current))
  }, [tabs, current])

  return (
    <Tabs
      index={tabsIndex}
      onChange={onChangeHandler}
      alignSelf='flex-end'
      padding='2'
      {...rest}
    >
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
