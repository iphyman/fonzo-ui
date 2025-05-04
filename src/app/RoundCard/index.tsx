"use client";

import { Round, RoundStatus } from "@app/hooks";
import { useMemo } from "react";
import { getMultiplier } from "../helpers";
import { ExpiredView } from "./ExpiredView";
import { LiveView } from "./LiveView";
import { OpenView } from "./OpenView";
import { Box } from "@chakra-ui/react";
import { SoonView } from "./SoonView";

export default function RoundCard({ round }: { round: Round }) {
  const content = useMemo(() => {
    const bearMultiplier = getMultiplier(round.totalAmount, round.bearAmount);
    const bullMultiplier = getMultiplier(round.totalAmount, round.bullAmount);

    switch (round.status) {
      case RoundStatus.Resolved:
        return (
          <ExpiredView
            roundId={round.roundId}
            closingPrice={round.closePrice!}
            lockedPrice={round.lockPrice!}
            rewardPool={round.rewardPrize}
            bullMultiplier={bullMultiplier}
            bearMultiplier={bearMultiplier}
            winningSide={round.winningSide}
            position={round.position}
          />
        );

      case RoundStatus.Live:
        return (
          <LiveView
            roundId={round.roundId}
            rewardPrize={round.totalAmount}
            position={round.position}
            bearAmount={round.bearAmount}
            bullAmount={round.bullAmount}
            totalAmount={round.totalAmount}
            closeTime={round.closeTime}
            lockPrice={round.lockPrice}
          />
        );

      case RoundStatus.Open:
        return (
          <OpenView
            roundId={round.roundId}
            bearMultiplier={bearMultiplier}
            bullMultiplier={bullMultiplier}
            rewardPool={round.totalAmount}
            positionInfo={round.position}
          />
        );

      case RoundStatus.NotOpen:
        return (
          <SoonView roundId={round.roundId} closingTime={round.closeTime} />
        );

      default:
        return <></>;
    }
  }, [round]);

  return (
    <Box w="20rem" h="25rem">
      {content}
    </Box>
  );
}
