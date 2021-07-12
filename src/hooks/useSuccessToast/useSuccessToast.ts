import { useToast } from "@chakra-ui/react"

export const useSuccessToast = () => {
  const toast = useToast()
  const showSuccessToast = (message: string) => {
    toast({
      title: message,
      status: "success",
      isClosable: true,
      duration: 1200,
      variant: "solid",
    })
  }
  return { showSuccessToast }
}
