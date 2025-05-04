"use client";

import { useAccount } from "wagmi";
import { useMarket } from "./useMarket";
import { createPublicClient, http } from "viem";
import { flareTestnet } from "viem/chains";
import { fonzoMarketAbi } from "@app/abis";
import { MARKET_ADDRESS } from "@app/configs";
import { Round, PositionInfo, getOption, getRoundStatus } from "./useRounds";
import { calculateReward } from "@app/app/helpers";
import { useQuery } from "@tanstack/react-query";

interface Position extends PositionInfo {
    hasWon: boolean;
    expectedReward: bigint;
}

export interface HistoryInfo extends Round {
    position?: Position;
}

export function usePositions() {
    const { address } = useAccount();
    const { marketId } = useMarket();

    const getPositions = async () => {
        if (!marketId || !address) return null

        const client = createPublicClient({ chain: flareTestnet, transport: http() });

        const myRoundIds = await client.readContract({
            abi: fonzoMarketAbi,
            address: MARKET_ADDRESS,
            functionName: "getMyRoundIds",
            args: [marketId, address],
        });

        const data = await client.readContract({
            abi: fonzoMarketAbi,
            address: MARKET_ADDRESS,
            functionName: "getPositions",
            args: [marketId, address, myRoundIds],
        });

        const rounds: HistoryInfo[] = [];

        if (!data) return null;
        for (let i = 0; i < data.length; i++) {
            const round = data[i];
            const reward = calculateReward(
                round.rewardPool,
                round.winningShares,
                round.position.stake
            );
            const opt = getOption(round.position.option);

            const position: Position = {
                ...round.position,
                option: opt,
                expectedReward: reward,
                hasWon: opt === getOption(round.winningSide),
                claimed: round.position.settled
            }

            rounds.push({
                roundId: round.roundId,
                status: getRoundStatus(round.status),
                lockTime: Number(round.lockTime),
                lockPrice: Number(round.lockedPrice),
                rewardPrize: round.rewardPool,
                bearAmount: round.bearShares,
                bullAmount: round.bullShares,
                totalAmount: round.totalShares,
                winningAmount: round.winningShares,
                closeTime: Number(round.closingTime),
                closePrice: Number(round.closingPrice),
                winningSide: getOption(round.winningSide),
                position
            })

        }

        return rounds;
    }

    return useQuery({
        queryKey: ["PREDICTIONS_HISTORY", marketId, address?.toLowerCase()],
        queryFn: async () => await getPositions(),
        refetchInterval: 10000, // 20 seconds
        refetchIntervalInBackground: false
    })
}