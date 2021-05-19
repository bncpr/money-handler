import { createSlice } from "@reduxjs/toolkit"

const chartDataSlice = createSlice({
  name: "data/chart",
  initialState: {
    chartData: [],
    isLoading: false,
    year: null,
    month: null,
    chartType: "bar",
    showBy: "month",
    series: false,
    withPayers: false,
    withCategories: false,
    payerColors: {},
    categoryColors: {},
  },
  reducers: {
    initChartData(state)
  },
})
