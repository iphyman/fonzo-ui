"use client";

import { HStack, SkeletonText, Text, VStack } from "@chakra-ui/react";
import { colors } from "@app/configs";
import { ArrowDownIcon, ArrowUpIcon } from "./Icon";
import { useFlareOracle } from "@app/hooks";
import CountUp from "react-countup";
import { formatUnits } from "viem";
import { formatPrice } from "../helpers";

export function LivePrice({ markPrice }: { markPrice?: number }) {
  const { data: priceUpdate } = useFlareOracle();

  return (
    <VStack w="full" gap={1} alignItems="flex-start">
      <Text fontSize="12px" textTransform="uppercase">
        Latest price
      </Text>
      <HStack w="full" justifyContent="space-between">
        {priceUpdate ? (
          <Text
            fontSize="1.5rem"
            fontWeight={700}
            color={
              !markPrice || !priceUpdate
                ? "fg"
                : priceUpdate.price > markPrice
                  ? colors.success
                  : colors.failure
            }
          >
            <CountUp
              start={0}
              preserveValue
              delay={0}
              end={Number(
                formatUnits(BigInt(priceUpdate.price), priceUpdate.decimals)
              )}
              // prefix="$"
              decimals={4}
              duration={1}
            />
          </Text>
        ) : (
          <SkeletonText
            variant="pulse"
            w="9rem"
            h="1.5rem"
            noOfLines={1}
            borderRadius="0.5rem"
            loading={true}
            colorPalette="gray"
          />
        )}
        {markPrice && priceUpdate ? (
          priceUpdate.price - markPrice > 0 ? (
            <HStack padding="4px" borderRadius="8px" bg={colors.success}>
              <ArrowUpIcon w="20px" h="20px" fill={colors.white} />
              <Text fontSize="14px" color="fg">
                {formatPrice(
                  (priceUpdate.price - markPrice).toString(),
                  priceUpdate.decimals
                )}
              </Text>
            </HStack>
          ) : (
            // <ArrowDownIcon w="32px" h="32px" fill={colors.failure} />
            <HStack padding="4px" borderRadius="8px" bg={colors.failure}>
              <ArrowDownIcon w="20px" h="20px" fill={colors.white} />
              <Text fontSize="14px" color="fg">
                {formatPrice(
                  (priceUpdate.price - markPrice).toString(),
                  priceUpdate.decimals
                )}
              </Text>
            </HStack>
          )
        ) : (
          <SkeletonText
            variant="pulse"
            w="full"
            h="1.5rem"
            noOfLines={1}
            borderRadius="0.5rem"
            loading={!priceUpdate}
            colorPalette="gray"
          />
        )}
      </HStack>
    </VStack>
  );
}
