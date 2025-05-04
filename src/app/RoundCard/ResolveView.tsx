"use client";

import { Box, Button, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { BearishIcon, BullishIcon } from "./Icon";
import { PiClockCountdownBold } from "react-icons/pi";
import { useFonzoMarket } from "@app/hooks";
import { useAccount } from "wagmi";
import { colors } from "@app/configs";

export function ResolveView({ roundId }: { roundId: bigint }) {
  const { resolve, isConfirming, isPending } = useFonzoMarket();
  const { address } = useAccount();

  return (
    <Box
      h="full"
      bg="bg.emphasized"
      borderRadius="1.5rem"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      <VStack w="full" h="full" gap={0}>
        <Box
          w="full"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          padding="1rem 1rem 0.75rem"
          bg={colors.gradientCardHeader}
        >
          <HStack w="full" justifyContent="space-between">
            <HStack gap={1} color="fg.muted">
              <PiClockCountdownBold />
              <Text textTransform="capitalize" fontWeight={700}>
                Resolve
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
            color="bg.subtle"
            display="flex"
            w="full"
            justifyContent="center"
            position="relative"
          >
            <BullishIcon />
            <Text
              position="absolute"
              bottom="10px"
              color="fg.muted"
              fontSize="14px"
              fontWeight={600}
              letterSpacing="wider"
            >
              UP
            </Text>
          </Box>
          <Box padding="2px" bg="border" borderRadius="1rem">
            <VStack
              w="full"
              h="9rem"
              padding="1rem"
              bg="bg"
              borderRadius="1rem"
              justifyContent="center"
              gap={4}
            >
              {isConfirming ? (
                <>
                  <Text fontSize="12px" letterSpacing="widest" color="fg.muted">
                    Resolving...
                  </Text>
                  <Spinner size="lg" colorPalette="blue" />
                </>
              ) : (
                <>
                  <Button
                    w="full"
                    h="2rem"
                    colorPalette="gray"
                    variant="solid"
                    loading={isConfirming || isPending}
                    disabled={isPending || !address}
                    onClick={() => resolve(roundId)}
                  >
                    Resolve
                  </Button>
                </>
              )}
            </VStack>
          </Box>
          <Box
            color="bg.subtle"
            display="flex"
            w="full"
            position="relative"
            justifyContent="center"
          >
            <BearishIcon />
            <Text
              position="absolute"
              top="10px"
              color="fg.muted"
              fontSize="14px"
              fontWeight={600}
              letterSpacing="wider"
            >
              DOWN
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
}
