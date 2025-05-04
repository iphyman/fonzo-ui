"use client";

import { Progress } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const duration = 300;

const calculateTimeDelta = (targetSecs?: number) => {
  if (!targetSecs) return 0;

  const now = Math.floor(Date.now() / 1000);
  const delta = targetSecs - now;

  return delta;
};

export function RoundTimer({ expiry }: { expiry: number }) {
  const [secondsLeft, setSecondsLeft] = useState<number>(
    calculateTimeDelta(expiry)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(calculateTimeDelta(expiry));
    }, 10000);

    return () => clearInterval(interval);
  }, [expiry]);

  const progress = ((duration - secondsLeft) / duration) * 100;

  return (
    <Progress.Root
      w="full"
      size="xs"
      maxW="20rem"
      value={progress > 100 ? 100 : progress}
      colorPalette="purple"
    >
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  );
}
