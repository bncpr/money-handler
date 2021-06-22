import { useEffect, useState } from "react"
import * as R from "ramda"

export const usePagination = (length, size) => {
  const [pageSize, setPageSize] = useState(size)
  const [page, setPage] = useState(0)
  const [pagesNum, setPagesNum] = useState(0)

  useEffect(() => {
    setPagesNum(Math.ceil(length / pageSize))
  }, [length, pageSize])

  useEffect(() => {
    console.log(pagesNum)
  }, [pagesNum])

  const onChangePage = n => () => {
    setPage(R.clamp(0, pagesNum, page + n))
  }

  const onChangePageSize = value => {
    setPage(0)
    setPageSize(+value)
  }

  const resetPage = () => setPage(0)

  return {
    pageSize,
    page,
    pagesNum,
    onChangePage,
    onChangePageSize,
    resetPage,
  }
}
