import { useState } from "react"

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false)
  const turnLoadingOffHandler = () => setIsLoading(false)
  const withActivateLoading = fn => arg => {
    setIsLoading(true)
    fn(arg)
  }
  return {
    isLoading,
    turnLoadingOffHandler,
    withActivateLoading,
  }
}
