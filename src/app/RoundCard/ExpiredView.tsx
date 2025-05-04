"use client";

import { Badge, Box, HStack, Show, Text, VStack } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa6";
import { DeltaArrow } from "./DeltaArrow";
import { Option, PositionInfo, useFlareOracle } from "@app/hooks";
import { colors } from "@app/configs";
import { formatPrice } from "../helpers";
import { formatAmount } from "./helpers";
import { flareTestnet } from "viem/chains";
import {
  RoundMultiplierDownArrow,
  RoundMultiplierUpArrow,
} from "./RoundMultiplierArrow";
import { useMemo } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "./Icon";

export function ExpiredView({
  roundId,
  closingPrice,
  lockedPrice,
  rewardPool,
  bullMultiplier,
  bearMultiplier,
  winningSide,
  position,
}: {
  roundId: bigint;
  closingPrice: number;
  lockedPrice: number;
  rewardPool: bigint;
  bullMultiplier: number;
  bearMultiplier: number;
  winningSide: Option;
  position?: PositionInfo;
}) {
  const delta = closingPrice - lockedPrice;
  const isBullish = delta > 0;
  const { data } = useFlareOracle();
  const decimals = useMemo(() => data?.decimals, [data?.decimals]);

  return (
    <Box
      w="full"
      h="full"
      bg="bg.panel"
      border="1px solid"
      borderColor="border"
      borderRadius="1.5rem"
      overflow="hidden"
      opacity={0.7}
      transition="0.3s"
      cursor="pointer"
      _hover={{ bg: "bg", opacity: 1 }}
    >
      <VStack w="full" h="full">
        <Box
          w="full"
          padding="1rem 1rem 0rem"
          aria-label="card header"
          bg={colors.cardBorder}
        >
          <HStack w="full" justifyContent="space-between">
            <HStack gap={1} color="fg.muted">
              <FaClock />
              <Text textTransform="capitalize" fontWeight={700}>
                Expired
              </Text>
            </HStack>
            <Text
              fontSize="13px"
              color="fg.muted"
            >{`#${Number(roundId)}`}</Text>
          </HStack>
          <Box h="1px" w="full" bg="border" mt="1rem" />
        </Box>
        <Box w="full" padding="1rem" position="relative" aria-label="card body">
          <Box
            display="flex"
            w="full"
            justifyContent="center"
            position="relative"
            alignItems="center"
          >
            <RoundMultiplierUpArrow isActive={isBullish} />
            <Show when={position && winningSide !== Option.None}>
              <Badge
                bg={
                  winningSide === position?.option
                    ? colors.success
                    : colors.failure
                }
                variant="solid"
                color="fg"
                size="sm"
                position="absolute"
                top="-1rem"
                right={0}
              >
                {winningSide === position?.option ? "WON" : "LOSE"}
              </Badge>
            </Show>
            <Text
              position="absolute"
              bottom="10px"
              color={isBullish ? "fg" : "fg.muted"}
              fontWeight={600}
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
              <VStack w="full" gap={1} alignItems="flex-start">
                <Text fontSize="12px" textTransform="uppercase">
                  Closing price
                </Text>
                <HStack w="full" justifyContent="space-between">
                  <Text
                    fontSize="1.5rem"
                    fontWeight={700}
                    color={isBullish ? colors.success : colors.failure}
                  >
                    {formatPrice(closingPrice.toString(), decimals)}
                  </Text>
                  {closingPrice > lockedPrice ? (
                    <HStack
                      padding="4px"
                      borderRadius="8px"
                      bg={colors.success}
                    >
                      <ArrowUpIcon w="20px" h="20px" fill={colors.white} />
                      <Text fontSize="14px" color="fg">
                        {formatPrice(
                          (closingPrice - lockedPrice).toString(),
                          decimals
                        )}
                      </Text>
                    </HStack>
                  ) : (
                    <HStack
                      padding="4px"
                      borderRadius="8px"
                      bg={colors.failure}
                    >
                      <ArrowDownIcon w="20px" h="20px" fill={colors.white} />
                      <Text fontSize="14px" color="fg">
                        {formatPrice(
                          (closingPrice - lockedPrice).toString(),
                          decimals
                        )}
                      </Text>
                    </HStack>
                  )}
                </HStack>
              </VStack>
              <HStack w="full" justifyContent="space-between">
                <Text fontSize="14px">Locked Price</Text>
                <Text fontSize="14px">
                  {formatPrice(lockedPrice.toString(), decimals)}
                </Text>
              </HStack>
              <HStack w="full" justifyContent="space-between">
                <Text fontWeight={600}>Reward Pool</Text>
                <Text fontWeight={600}>
                  {formatAmount(rewardPool, flareTestnet.nativeCurrency.symbol)}
                </Text>
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
              fontWeight={600}
              letterSpacing="wider"
            >
              {`${bearMultiplier}x Payout`}
            </Text>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}
