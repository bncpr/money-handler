import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import * as R from "ramda"

export const Entries = () => {
  const { entries } = useSelector(state => state.data)
  const [filteredData, setFilteredData] = useState([])
  const [year, setYear] = useState("2021")

  useEffect(() => {
    setFilteredData(R.pipe(R.values, R.filter(R.propEq("year", year)))(entries))
  }, [entries, year])

  useEffect(() => {
    console.log(filteredData)
  }, [filteredData])

  return (
    <div>
      {filteredData.map(({ date, payer, value, category, id }) => (
        <p
          key={
            id
          }>{`date: ${date} payer: ${payer} category: ${category} value: ${value}`}</p>
      ))}
    </div>
  )
}
