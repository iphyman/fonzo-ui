"use client";

import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Option, PositionInfo, useFonzoMarket } from "@app/hooks";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { ImNext } from "react-icons/im";
import { colors } from "@app/configs";
import { formatFlare } from "../helpers";
import { EnteredTag } from "./EnteredTag";
import { flareTestnet } from "viem/chains";
import { LivePrice } from "./LivePrice";
import { parseEther } from "viem";
import {
  RoundMultiplierDownArrow,
  RoundMultiplierUpArrow,
} from "./RoundMultiplierArrow";
import { DeltaArrow } from "./DeltaArrow";

export function OpenView({
  roundId,
  bearMultiplier,
  bullMultiplier,
  rewardPool,
  positionInfo,
}: {
  roundId: bigint;
  bearMultiplier: number;
  bullMultiplier: number;
  rewardPool: bigint;
  positionInfo?: PositionInfo;
}) {
  const { takePosition, isConfirming, isPending } = useFonzoMarket();
  const hasEntered = !!positionInfo;
  const [stake, setStake] = useState<string>("");
  const [option, setOption] = useState<Option>(Option.None);
  const show = option !== Option.None;

  const { address } = useAccount();
  const { data } = useBalance({ address });
  const opacity = hasEntered || option === Option.None ? 1 : 0;

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
      <Box w="full" opacity={opacity} transition="0.25s all ease-in-out">
        <VStack w="full" h="full" gap={0}>
          <Box
            w="full"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            padding="0.5rem 1rem 0rem"
            aria-label="card header"
            bg={colors.secondary}
          >
            <HStack w="full" justifyContent="space-between" color="fg">
              <HStack gap={1}>
                <ImNext />
                <Text
                  textTransform="capitalize"
                  fontWeight={700}
                  color="inherit"
                >
                  Next
                </Text>
              </HStack>
              <Text fontSize="13px" color="inherit">
                {`#${Number(roundId)}`}
              </Text>
            </HStack>
            <Box h="1px" w="full" bg="border" mt="1rem" />
          </Box>
          <Box w="full" padding="1rem" aria-label="card body">
            <HStack w="full" justifyContent="center" position="relative">
              <RoundMultiplierUpArrow isActive={false} />
              <Text
                position="absolute"
                bottom="10px"
                color="fg.muted"
                fontWeight={700}
                letterSpacing="wider"
              >
                {`${bullMultiplier}x Payout`}
              </Text>
            </HStack>
            <Box
              padding="2px"
              bg="linear-gradient(180deg, #53DEE9 0%, #7645D9 100%)"
              borderRadius="1rem"
              aria-label="inner border line"
            >
              <VStack w="full" padding="1rem" bg="bg" borderRadius="1rem">
                <HStack w="full" justifyContent="space-between">
                  <Text fontWeight={700} color="fg">
                    Reward Pool
                  </Text>
                  <Text fontWeight={700} color="fg">
                    {formatFlare(rewardPool)}
                  </Text>
                </HStack>
                {hasEntered ? (
                  <EnteredTag
                    position={positionInfo.option}
                    stake={positionInfo.stake}
                  />
                ) : (
                  <VStack w="full">
                    <Button
                      variant="solid"
                      w="full"
                      bg={colors.success}
                      color="fg"
                      h="3rem"
                      fontWeight={700}
                      _hover={{ opacity: 0.5 }}
                      onClick={() => setOption(Option.Bull)}
                      borderRadius="1rem"
                    >
                      Enter Up
                    </Button>
                    <Button
                      variant="solid"
                      w="full"
                      fontWeight={700}
                      bg={colors.failure}
                      color="fg"
                      h="3rem"
                      _hover={{ opacity: 0.5 }}
                      onClick={() => setOption(Option.Bear)}
                      borderRadius="1rem"
                    >
                      Enter Down
                    </Button>
                  </VStack>
                )}
              </VStack>
            </Box>
            <HStack
              w="full"
              justifyContent="center"
              color={colors.failure}
              position="relative"
            >
              <RoundMultiplierDownArrow isActive={false} />
              <Text
                position="absolute"
                top="10px"
                color="fg.muted"
                fontWeight={700}
                letterSpacing="wider"
              >
                {`${bearMultiplier}x Payout`}
              </Text>
            </HStack>
          </Box>
        </VStack>
      </Box>
      {!positionInfo && (
        <Box
          h="full"
          transition="transform 0.5s ease-in-out"
          transform={`translateY(${!show ? "100%" : "-95%"})`}
          opacity={!show ? 0 : 1}
        >
          <VStack w="full" h="full">
            <Box
              w="full"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              padding="1rem 1rem 0rem"
            >
              <HStack w="full" justifyContent="space-between">
                <HStack>
                  <Box
                    display="flex"
                    justifyContent="center"
                    cursor="pointer"
                    boxSize="2rem"
                    onClick={() =>
                      setOption(
                        option === Option.Bull ? Option.Bear : Option.Bull
                      )
                    }
                  >
                    <DeltaArrow
                      size={32}
                      delta={option === Option.Bear ? -1 : 1}
                    />
                  </Box>
                  <Text fontWeight={600} color="fg">
                    Confirm
                  </Text>
                </HStack>
                <CloseButton onClick={() => setOption(Option.None)} />
              </HStack>
            </Box>
            <Flex h="full" w="full" alignItems="center" padding="1.5rem">
              <VStack w="full" gap={7}>
                <LivePrice />
                <VStack w="full">
                  <HStack w="full" justifyContent="space-between">
                    <Text color="fg">Amount</Text>
                    <HStack>
                      <Avatar.Root size="2xs" zIndex={1}>
                        <Avatar.Fallback name={flareTestnet.name} />
                        <Avatar.Image src="/flare.png" />
                      </Avatar.Root>
                      <Text fontWeight={600} color="fg">
                        {flareTestnet.nativeCurrency.symbol}
                      </Text>
                    </HStack>
                  </HStack>
                  <Input
                    w="full"
                    h="3rem"
                    padding="0.5rem 1rem"
                    borderRadius="0.5rem"
                    textAlign="right"
                    value={stake}
                    onChange={(e) => setStake(e.target.value)}
                  />
                  <HStack w="full" justifyContent="space-between">
                    <Text fontSize="12px">Balance</Text>
                    <Text fontSize="12px">{formatFlare(data?.value)}</Text>
                  </HStack>
                </VStack>
                <Button
                  variant="solid"
                  w="full"
                  color="fg"
                  flexDir="column"
                  h="3rem"
                  loading={isConfirming || isPending}
                  disabled={isPending || !address || stake.length === 0}
                  bg={option === Option.Bull ? colors.success : colors.failure}
                  onClick={() =>
                    takePosition(roundId, parseEther(stake), option)
                  }
                >
                  Confirm
                </Button>
              </VStack>
            </Flex>
          </VStack>
        </Box>
      )}
    </Box>
  );
}
