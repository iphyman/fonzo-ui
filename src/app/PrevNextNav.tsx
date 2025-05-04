"use client";

import { useRoundsWithPosition, useSwiper } from "@app/hooks";
import { HStack, IconButton } from "@chakra-ui/react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { PiArrowsInCardinalBold } from "react-icons/pi";

export default function PrevNextNav() {
  const { data } = useRoundsWithPosition();
  const rounds = data?.rounds;
  const currentEpoch = data?.currentRoundId ?? 0;
  const [swiper] = useSwiper();

  const handlePrevSlide = () => {
    swiper?.slidePrev();
  };

  const handleNextSlide = () => {
    swiper?.slideNext();
  };

  const handleSlideToLive = () => {
    if (swiper) {
      const currentEpochIndex = rounds?.findIndex(
        (round) => round.roundId === BigInt(currentEpoch)
      );
      if (currentEpochIndex !== undefined && currentEpochIndex !== null) {
        swiper.slideTo(currentEpochIndex - 1);
      }
    }
  };

  return (
    <HStack alignItems="center">
      <IconButton onClick={handlePrevSlide} variant="ghost">
        <IoMdArrowRoundBack />
      </IconButton>
      <IconButton variant="ghost" onClick={handleSlideToLive}>
        <PiArrowsInCardinalBold />
      </IconButton>
      <IconButton onClick={handleNextSlide} variant="ghost">
        <IoMdArrowRoundForward />
      </IconButton>
    </HStack>
  );
}
