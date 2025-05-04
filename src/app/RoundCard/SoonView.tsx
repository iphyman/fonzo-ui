"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { PiClockCountdownBold } from "react-icons/pi";
import { useCountDown } from "@app/hooks";
import {
  RoundMultiplierDownArrow,
  RoundMultiplierUpArrow,
} from "./RoundMultiplierArrow";
import { colors } from "@app/configs";

export function SoonView({
  roundId,
  closingTime,
}: {
  roundId: bigint;
  closingTime: number;
}) {
  const { countdown } = useCountDown(closingTime);

  return (
    <Box
      h="full"
      bg={colors.card}
      border="1px solid"
      borderColor="border"
      borderRadius="1.5rem"
      overflow="hidden"
    >
      <VStack w="full" h="full" gap={0}>
        <Box
          w="full"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          padding="1rem 1rem 0.75rem"
          bg={colors.cardBorder}
        >
          <HStack w="full" justifyContent="space-between">
            <HStack gap={1} color="fg">
              <PiClockCountdownBold />
              <Text textTransform="capitalize" fontWeight={700}>
                Later
              </Text>
            </HStack>
            <Text fontSize="13px" color="fg.muted">
              {`#${Number(roundId)}`}
            </Text>
          </HStack>
        </Box>
        <VStack
          w="full"
          h="full"
          alignItems="normal"
          gap={0}
          justifyContent="center"
          padding="1rem"
          position="relative"
        >
          <Box
            display="flex"
            w="full"
            justifyContent="center"
            position="relative"
          >
            <RoundMultiplierUpArrow isActive={false} />
          </Box>
          <Box padding="2px" bg={colors.cardBorder} borderRadius="1rem">
            <VStack
              w="full"
              h="9rem"
              padding="1rem"
              bg="bg"
              borderRadius="1rem"
              justifyContent="center"
            >
              <Text fontWeight={600} fontSize="16px" lineHeight="24px">
                Entry starts
              </Text>
              <Text fontWeight={600} fontSize="24px" lineHeight="36px">
                {`~${countdown.minutes}:${countdown.seconds}`}
              </Text>
            </VStack>
          </Box>
          <Box
            color="bg.subtle"
            display="flex"
            w="full"
            position="relative"
            justifyContent="center"
          >
            <RoundMultiplierDownArrow isActive={false} />
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
}
