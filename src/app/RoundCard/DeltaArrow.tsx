import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { Span } from "@chakra-ui/react";
import { colors } from "@app/configs";

function isValidDelta(delta: number | null | undefined): delta is number {
  return (
    delta !== null && delta !== undefined && delta !== Infinity && !isNaN(delta)
  );
}

export const DeltaArrow = ({
  delta,
  size = 16,
}: {
  delta?: number | null;
  size?: number;
}) => {
  if (!isValidDelta(delta)) return null;

  return Math.sign(delta) < 0 ? (
    <Span color={colors.failure}>
      <BsCaretDownFill size={size} />
    </Span>
  ) : (
    <Span color={colors.success}>
      <BsCaretUpFill size={size} />
    </Span>
  );
};
