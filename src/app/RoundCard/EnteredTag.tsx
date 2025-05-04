"use client";

import { HStack, Span, Text, VStack } from "@chakra-ui/react";
import { Option } from "@app/hooks";
import { ArrowDownIcon, ArrowUpIcon } from "./Icon";
import { colors } from "@app/configs";
import { formatFlare } from "../helpers";

export const EnteredTag = ({
  position,
  stake,
}: {
  position: Option;
  stake: bigint;
}) => {
  const isBullish = position === Option.Bull;
  const title = isBullish ? "UP" : "DOWN";

  return (
    <VStack w="full">
      <HStack h="76px">
        {isBullish ? (
          <ArrowUpIcon w="32px" h="32px" fill={colors.success} />
        ) : (
          <ArrowDownIcon w="32px" h="32px" fill={colors.failure} />
        )}
        <Span>{title}</Span>
      </HStack>
      <HStack w="full" justifyContent="space-between">
        <Text fontWeight={400} fontSize="14px" color="fg">
          My Position
        </Text>
        <Text fontWeight={400} fontSize="14px" color="fg">
          {formatFlare(stake)}
        </Text>
      </HStack>
    </VStack>
  );
};
