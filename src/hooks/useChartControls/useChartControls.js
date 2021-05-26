import { useState } from "react"

export const useChartControls = (
  initShowBy,
  initSeries,
  initChartType
) => {
  const [showBy, setShowBy] = useState(initShowBy)
  const [series, setSeries] = useState(initSeries)
  const [chartType, setChartType] = useState(initChartType)

  const changeShowBy = value => {
    setShowBy(value)
  }
  const changeOrToggleSeries = value => {
    setSeries(series === value ? false : value)
  }
  return { showBy, series, chartType, changeShowBy, changeOrToggleSeries }
}
