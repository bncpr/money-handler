import { Box } from "@chakra-ui/react"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

export const MotionContentVariant = ({ children }) => {
  const contentVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  }
  return (
    <MotionBox
      initial='initial'
      animate='in'
      exit='out'
      variants={contentVariants}
      transition={{ duration: 0.2 }}
      w='full'
      h='full'
    >
      {children}
    </MotionBox>
  )
}
