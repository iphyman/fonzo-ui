"use client";

import { toaster } from "@app/components/ui/toaster";
import { useFonzoMarket } from "@app/hooks";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Link,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Hex } from "viem";

export default function View() {
  const [feedId, setFeedId] = useState<string>("");
  const { initializeMarket, isConfirmed, isConfirming, isPending } =
    useFonzoMarket();

  useEffect(() => {
    if (!isConfirmed) return;

    toaster.create({
      title: "Market Initialized",
      description: "New market created successfully!",
      type: "success",
      duration: 15000,
    });
    setFeedId("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed]);

  return (
    <Box
      w="full"
      maxW="30rem"
      mx="auto"
      bg="bg"
      padding="1.5rem"
      borderRadius="12px"
    >
      <VStack w="full" gap={7}>
        <Heading color="fg" textAlign="center">
          Create Market
        </Heading>
        <Field.Root required>
          <Field.Label>Price Feed ID</Field.Label>
          <Field.HelperText>
            You can find available price feed ids from{" "}
            <Link
              href="https://www.pyth.network/developers/price-feed-ids"
              target="_blank"
              color="fg.info"
            >
              Pyth Network
            </Link>{" "}
          </Field.HelperText>
          <Input
            h="3rem"
            type="text"
            placeholder="0x"
            value={feedId}
            onChange={(e) => setFeedId(e.target.value)}
          />
        </Field.Root>
        <Button
          w="full"
          size="lg"
          colorPalette="teal"
          loading={isConfirming || isPending}
          disabled={isPending || feedId.length === 0}
          onClick={() => initializeMarket(feedId as Hex)}
        >
          Initialize Market
        </Button>
      </VStack>
    </Box>
  );
}
