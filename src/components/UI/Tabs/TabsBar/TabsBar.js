import { stringSorter } from "../../../../utility/utility"
import { Tab } from "../Tab/Tab"
import styles from "./TabsBar.module.css"
import * as R from "ramda"

export const TabsBar = ({ tabs, current, onClick }) => {
  console.log(tabs)
  return (
    <div className={styles.tabsBar}>
      {R.sortBy(R.identity, tabs).map(key => (
        <Tab
          value={key}
          key={key}
          current={current}
          onClick={() => onClick(key)}
        />
      ))}
    </div>
  )
}
