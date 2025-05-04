"use client";

import { FreeMode, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useLayoutEffect } from "react";
import { usePrevious } from "@chakra-ui/react";
import { useRoundsWithPosition, useSwiper } from "@app/hooks";
import RoundCard from "./RoundCard";

export default function Positions() {
  const [swiper, setSwiper] = useSwiper();
  const { data } = useRoundsWithPosition();

  const currentRoundId = data?.currentRoundId ?? 0;
  const rounds = data?.rounds;
  const previousRoundId = usePrevious(currentRoundId);

  const pr = currentRoundId > 0 ? currentRoundId - 1 : currentRoundId;
  const swiperIndex = rounds?.findIndex((m) => m.roundId === BigInt(pr));

  useLayoutEffect(() => {
    if (swiper && rounds && currentRoundId && previousRoundId) {
      const currentRoundIndex = rounds.findIndex(
        (round) => round.roundId === BigInt(currentRoundId)
      );

      if (currentRoundId !== previousRoundId) {
        swiper.slideTo(currentRoundIndex - 1);
      }
    }
  }, [swiper, currentRoundId, previousRoundId, rounds]);

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={16}
      initialSlide={swiperIndex}
      modules={[FreeMode, Keyboard, Mousewheel]}
      freeMode={{
        enabled: true,
        sticky: true,
        momentumRatio: 0.25,
        momentumVelocityRatio: 0.5,
      }}
      onBeforeInit={(swiper) => setSwiper(swiper)}
      onBeforeDestroy={() => setSwiper(null)}
      keyboard={{ enabled: true }}
      mousewheel={{ enabled: true }}
      centeredSlides
      resizeObserver
    >
      {rounds?.map((round) => (
        <SwiperSlide key={round.roundId}>
          <RoundCard round={round} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
