import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const Entries = () => {
  const [entries, setEntries] = useState()
  const { data } = useSelector(state => state.data)

  useEffect(() => {})

  return <div>entries</div>
}
