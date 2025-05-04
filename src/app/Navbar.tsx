"use client";

import { Box, HStack } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <Box
      width="full"
      // maxW="6xl"
      // mx="auto"
      position="sticky"
      top="0px"
      boxShadow="sm"
      transition="all ease 0.2s 0s"
      bg="bg"
      borderBottom="1px solid"
      borderColor="border"
      zIndex="sticky"
    >
      <Box width="full" height="4.5rem" padding="0.5rem 1rem" margin="0 auto">
        <HStack
          width="full"
          height="full"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/">
            <Box
              position="relative"
              width="160px"
              height="40px"
              display={{ base: "none", lg: "block" }}
            >
              <Image src="/fonzo.png" alt="Fonzo" fill />
            </Box>
          </Link>
          <ConnectButton />
        </HStack>
      </Box>
    </Box>
  );
}
