import { useEffect, useState } from "react"
import * as R from "ramda"

export const usePagination = (length, size, filters) => {
  const [pageSize, setPageSize] = useState(size)
  const [page, setPage] = useState(0)
  const [pagesNum, setPagesNum] = useState(0)

  useEffect(() => {
    setPagesNum(Math.floor(length / pageSize))
  }, [length, pageSize])

  useEffect(() => {
    setPage(0)
  }, [filters])

  const onChangePage = n => () => {
    setPage(R.clamp(0, pagesNum, page + n))
  }

  const onChangePageSize = value => {
    setPage(0)
    setPageSize(+value)
  }

  return {
    pageSize,
    page,
    pagesNum,
    onChangePage,
    onChangePageSize,
  }
}
