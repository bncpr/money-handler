import { Box } from "@chakra-ui/react";

export const CardBox = ({ children, ...rest }) => {
  return (
    <Box shadow='base' bg='white' rounded='md' {...rest}>
      {children}
    </Box>
  );
};
