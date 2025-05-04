"use client";

import { Box, VStack } from "@chakra-ui/react";
import { PredictionNavbar } from "./PredictionNavbar";
import Positions from "./Positions";
import "./global.css";
import HistoryDialog from "@app/components/HistoryDialog";

export default function View() {
  return (
    <>
      <VStack
        w="full"
        minH="calc(100vh - 5rem)"
        bg="linear-gradient(180deg, #434575, #66578D)"
        flex={1}
        px="1.5rem"
        justifyContent="center"
        gap={7}
      >
        <PredictionNavbar />
        <Box overflow="hidden" maxW="100vw" minH="26rem">
          <Positions />
        </Box>
      </VStack>
      <HistoryDialog />
    </>
  );
}
