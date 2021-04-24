import { stringSorter } from "../../../../utility/utility"
import { Tab } from "../Tab/Tab"
import styles from './TabsBar.module.css'

export const TabsBar = ({ tabs, current, onClick }) => {
  return (
    <div className={styles.tabsBar}>
      {tabs
        .sort(stringSorter())
        .map(key =>
          <Tab
            value={key} key={key}
            current={current}
            onClick={() => onClick(key)}
          />
        )
      }
    </div>
  )
}