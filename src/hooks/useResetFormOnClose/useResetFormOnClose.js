import { useEffect } from "react"

export const useResetFormOnClose = (isOpen, formik) => {
  useEffect(() => {
    if (!isOpen) formik.resetForm()
  }, [isOpen])
}
