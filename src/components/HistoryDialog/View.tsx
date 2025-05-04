"use client";

import { formatFlare, formatPrice } from "@app/app/helpers";
import { DeltaArrow } from "@app/app/RoundCard/DeltaArrow";
import { colors } from "@app/configs";
import {
  useFonzoMarket,
  Option,
  RoundStatus,
  HistoryInfo,
  usePositions,
  useFlareOracle,
} from "@app/hooks";
import {
  Badge,
  Box,
  Button,
  Collapsible,
  HStack,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useAccount } from "wagmi";

const ClosingPrice = ({
  priceMark,
  closingPrice,
  decimal,
}: {
  priceMark: number;
  closingPrice: number;
  decimal?: number;
}) => {
  return (
    <VStack w="full" gap={1} alignItems="flex-start">
      <Text fontSize="11px" textTransform="uppercase">
        Closing price
      </Text>
      <HStack w="full" justifyContent="space-between">
        <Text
          fontSize="1.5rem"
          fontWeight={700}
          color={closingPrice > priceMark ? colors.success : colors.failure}
        >
          {formatPrice(closingPrice.toString(), decimal)}
        </Text>
        <DeltaArrow delta={closingPrice < priceMark ? -1 : 1} size={32} />
      </HStack>
    </VStack>
  );
};

export const Row = ({
  round,
  oracleDecimals,
}: {
  round: HistoryInfo;
  oracleDecimals?: number;
}) => {
  const { settle, isConfirming, isPending } = useFonzoMarket();
  const isBullish = round.winningSide === Option.Bull;
  const isBearish = round.winningSide === Option.Bear;
  const position = round.position;

  const claimable = position ? !position.claimed && position.hasWon : false;

  const handler = () => {
    if (claimable) {
      settle([round.roundId]);
    }
  };

  return (
    <Collapsible.Root w="full" lazyMount unmountOnExit>
      <Collapsible.Trigger w="full" cursor="pointer">
        <HStack width="full" justifyContent="space-between">
          <HStack gap={{ base: 2, sm: 5 }}>
            <VStack gap={0}>
              <Text color="fg.muted" fontSize="13px">
                Round
              </Text>
              <Text color="fg" fontSize="11px">
                {Number(round.roundId)}
              </Text>
            </VStack>
            <Show when={position?.hasWon}>
              <Badge bg={colors.success} color="fg" variant="solid" size="sm">
                WON
              </Badge>
            </Show>
            <Show
              when={!position?.hasWon && round.status === RoundStatus.Resolved}
            >
              <Badge bg={colors.failure} color="fg" variant="solid" size="sm">
                LOSE
              </Badge>
            </Show>
            <Show when={round.status === RoundStatus.Live}>
              <Badge colorPalette="pink" variant="solid" size="sm">
                LIVE
              </Badge>
            </Show>
            <Show when={round.status === RoundStatus.Open}>
              <Badge colorPalette="purple" variant="solid" size="sm">
                OPEN
              </Badge>
            </Show>
          </HStack>
          <VStack alignItems="flex-end" gap={0}>
            <Show when={position?.hasWon}>
              <Text color="green" fontSize="13px" fontWeight={600}>
                {`+${formatFlare(position?.expectedReward)}`}
              </Text>
            </Show>
            <Show when={!position?.hasWon}>
              <Text color={colors.failure} fontSize="13px" fontWeight={600}>
                {`-${formatFlare(position?.stake)}`}
              </Text>
            </Show>
            <HStack gap={1}>
              <Text color="fg.muted" fontSize="14px" fontWeight={600}>
                {formatFlare(position?.stake)}
              </Text>
              <DeltaArrow delta={position?.option === Option.Bear ? -2 : 2} />
            </HStack>
          </VStack>
        </HStack>
      </Collapsible.Trigger>
      <Collapsible.Content bg="bg.emphasized">
        <Show
          when={
            round.status !== RoundStatus.Live &&
            round.status !== RoundStatus.Open
          }
        >
          <Box
            w="full"
            border="2px solid"
            borderColor={
              isBearish ? colors.failure : isBullish ? colors.success : "border"
            }
            borderRadius="md"
            p="1rem"
          >
            <VStack w="full">
              <Show when={claimable}>
                <Button
                  variant="solid"
                  colorPalette="green"
                  size="xs"
                  w="full"
                  onClick={handler}
                  loading={isPending || isConfirming}
                >
                  Collect
                </Button>
              </Show>
              <ClosingPrice
                closingPrice={round.closePrice!}
                priceMark={round.lockPrice!}
                decimal={oracleDecimals}
              />
              <HStack w="full" justifyContent="space-between">
                <Text fontSize="0.75rem">Locked Price</Text>
                <Text fontSize="0.75rem">
                  {formatPrice(round.lockPrice!.toString(), oracleDecimals)}
                </Text>
              </HStack>
              <HStack w="full" justifyContent="space-between">
                <Text fontSize="0.75rem" fontWeight={600}>
                  Reward Pool
                </Text>
                <Text fontSize="0.75rem" fontWeight={600}>
                  {formatFlare(round.rewardPrize)}
                </Text>
              </HStack>
              <HStack w="full" justifyContent="space-between">
                <Text fontSize="0.75rem">Position</Text>
                <HStack>
                  <DeltaArrow
                    delta={position?.option === Option.Bear ? -1 : 1}
                  />
                  <Text fontSize="0.75rem">{formatFlare(position?.stake)}</Text>
                </HStack>
              </HStack>
              <Show when={position?.claimed}>
                <HStack w="full" justifyContent="space-between">
                  <Text
                    fontSize="0.75rem"
                    fontWeight={600}
                    color={colors.success}
                  >
                    Claimed
                  </Text>
                  <Text
                    fontSize="0.75rem"
                    fontWeight={600}
                    color={colors.success}
                  >
                    {formatFlare(position?.expectedReward)}
                  </Text>
                </HStack>
              </Show>
            </VStack>
          </Box>
        </Show>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default function HistoryView() {
  const { data: positions, refetch } = usePositions();
  const { address } = useAccount();
  // const { marketInfo } = useActiveMarket();
  const { isConfirming, isPending, settle } = useFonzoMarket();
  const claimable = positions
    ?.filter((m) => m.position?.hasWon && !m.position.claimed)
    .map((m) => m.roundId);

  const handler = () => {
    if (claimable && claimable.length > 0) {
      settle(claimable);
    }
  };

  const { data } = useFlareOracle();
  const decimals = useMemo(() => data?.decimals, [data?.decimals]);

  return (
    <Box w="full">
      <Show when={claimable && claimable.length > 0}>
        <Button
          w="full"
          variant="solid"
          colorPalette="green"
          mb="1rem"
          loading={isPending || isConfirming}
          disabled={isPending || isConfirming}
          onClick={handler}
        >
          {`Collect All ${claimable?.length} Winnings`}
        </Button>
      </Show>
      <Box w="full">
        <VStack gap={4} w="full" alignItems="flex-start">
          {positions?.map((m) => (
            <Row key={m.roundId} round={m} oracleDecimals={decimals} />
          ))}
        </VStack>
      </Box>
      {!history ||
        (history.length === 0 && (
          <VStack>
            <Text>No Positions in this market</Text>
          </VStack>
        ))}
    </Box>
  );
}
