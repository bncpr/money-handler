import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

export const ForwardBackward = ({ onDec, onInc, isDisabledInc, isDisabledDec }) => {
  return (
    <>
      <IconButton
        icon={<ChevronLeftIcon />}
        variant='ghost'
        fontSize={30}
        onClick={onDec}
        isDisabled={isDisabledDec} />
      <IconButton
        icon={<ChevronRightIcon />}
        variant='ghost'
        fontSize={30}
        onClick={onInc}
        isDisabled={isDisabledInc} />
    </>
  );
};
