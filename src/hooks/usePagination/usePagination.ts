import { useCallback, useEffect, useState } from "react"

export const usePagination = (length: number, size: number) => {
  const [pageSize, setPageSize] = useState(size)
  const [page, setPage] = useState(0)
  const [pagesNum, setPagesNum] = useState(0)

  useEffect(() => {
    setPagesNum(Math.ceil(length / pageSize))
  }, [length, pageSize])

  const onIncPage = () => setPage(Math.min(page + 1, pagesNum))
  const onDecPage = () => setPage(Math.max(page - 1, 0))

  const onChangePageSize = (value: number) => {
    setPage(0)
    setPageSize(value)
  }

  const resetPage = useCallback(() => setPage(0), [])

  return {
    pageSize,
    page,
    pagesNum,
    onChangePageSize,
    resetPage,
    onDecPage,
    onIncPage,
  }
}
