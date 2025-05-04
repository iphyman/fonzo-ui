"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { FaRegPlayCircle } from "react-icons/fa";
import { useEffect } from "react";
import { ResolveView } from "./ResolveView";
import { Round, useBoolean, useFlareOracle } from "@app/hooks";
import { formatFlare, formatPrice, getMultiplier } from "../helpers";
import { colors } from "@app/configs";
import { RoundTimer } from "./RoundTimer";
import { LivePrice } from "./LivePrice";
import {
  RoundMultiplierDownArrow,
  RoundMultiplierUpArrow,
} from "./RoundMultiplierArrow";

export function LiveView({
  roundId,
  lockPrice,
  rewardPrize,
  closeTime,
  totalAmount,
  bearAmount,
  bullAmount,
}: Pick<
  Round,
  | "roundId"
  | "lockPrice"
  | "rewardPrize"
  | "closeTime"
  | "position"
  | "totalAmount"
  | "bearAmount"
  | "bullAmount"
>) {
  const { data } = useFlareOracle();
  const priceUpdate = data?.price;
  const delta = priceUpdate ? priceUpdate - lockPrice! : 0;
  const isBullish = delta > 0;
  const bearMultiplier = getMultiplier(totalAmount, bearAmount);
  const bullMultiplier = getMultiplier(totalAmount, bullAmount);

  const { value: shouldResolve, toggle } = useBoolean(
    Math.floor(Date.now() / 1000) > closeTime
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const NOW_IN_SECONDS = Math.floor(Date.now() / 1000);

      if (!shouldResolve && NOW_IN_SECONDS > closeTime) {
        toggle();
        // clearInterval(intervalId);
      } else if (shouldResolve && NOW_IN_SECONDS < closeTime) {
        toggle();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [closeTime, shouldResolve, toggle]);

  return (
    <Box
      w="full"
      h="full"
      bg="bg.panel"
      border="1px solid"
      borderColor="border"
      borderRadius="1.5rem"
      overflow="hidden"
    >
      {shouldResolve ? (
        <ResolveView roundId={roundId} />
      ) : (
        <VStack w="full" h="full" gap={0}>
          <Box
            w="full"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            padding="1rem 1rem 0.75rem"
            aria-label="card header"
          >
            <HStack w="full" justifyContent="space-between">
              <HStack gap={1} color="purple.500">
                <FaRegPlayCircle />
                <Text textTransform="capitalize" fontWeight={700}>
                  Live
                </Text>
              </HStack>
              <Text fontSize="13px" color="inherit">
                {`#${Number(roundId)}`}
              </Text>
            </HStack>
          </Box>
          <RoundTimer expiry={closeTime} />
          <VStack
            w="full"
            h="full"
            alignItems="normal"
            gap={0}
            justifyContent="center"
            padding="1rem"
            position="relative"
            aria-label="card body"
          >
            <Box
              display="flex"
              w="full"
              justifyContent="center"
              position="relative"
            >
              <RoundMultiplierUpArrow isActive={isBullish} />
              <Text
                position="absolute"
                bottom="10px"
                color={isBullish ? "fg" : "fg.muted"}
                fontWeight={700}
                letterSpacing="wider"
              >
                {`${bullMultiplier}x Payout`}
              </Text>
            </Box>
            <Box
              padding="2px"
              bg={isBullish ? colors.success : colors.failure}
              borderRadius="1rem"
              aria-label="inner border line"
            >
              <VStack w="full" padding="1rem" bg="bg" borderRadius="1rem">
                <LivePrice markPrice={lockPrice} />
                <HStack w="full" justifyContent="space-between">
                  <Text fontSize="0.75rem">Locked Price</Text>
                  <Text fontSize="0.75rem">
                    {formatPrice(lockPrice?.toString() ?? "0", data?.decimals)}
                  </Text>
                </HStack>
                <HStack w="full" justifyContent="space-between">
                  <Text fontWeight={600}>Prize Pool</Text>
                  <Text fontWeight={600}>{formatFlare(rewardPrize)}</Text>
                </HStack>
              </VStack>
            </Box>
            <Box
              display="flex"
              w="full"
              position="relative"
              justifyContent="center"
            >
              <RoundMultiplierDownArrow isActive={!isBullish} />
              <Text
                position="absolute"
                top="10px"
                color={!isBullish ? "fg" : "fg.muted"}
                fontWeight={700}
                letterSpacing="wider"
              >
                {`${bearMultiplier}x Payout`}
              </Text>
            </Box>
          </VStack>
        </VStack>
      )}
    </Box>
  );
}
