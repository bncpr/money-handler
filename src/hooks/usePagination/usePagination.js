import { useEffect, useState } from "react"
import * as R from "ramda"

export const usePagination = (data, size) => {
  const [pageSize, setPageSize] = useState(size)
  const [page, setPage] = useState(0)
  const [pagesNum, setPagesNum] = useState(0)

  useEffect(() => {
    setPage(0)
    setPagesNum(Math.floor(data.length / pageSize))
  }, [data, pageSize])

  const onChangePage = n => () => {
    setPage(R.clamp(0, pagesNum, page + n))
  }

  const onChangePageSize = event => {
    setPageSize(R.clamp(0, 1000, +event.target.value))
  }
  return { pageSize, page, pagesNum, onChangePage, onChangePageSize }
}
