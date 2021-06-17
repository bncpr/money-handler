import { motion } from "framer-motion";

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
  };
  return (
    <motion.div
      initial='initial'
      animate='in'
      exit='out'
      variants={contentVariants}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
