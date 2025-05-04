"use client";

import { useAccount } from "wagmi";
import { fonzoMarketAbi } from "@app/abis";
import { Address, createPublicClient, Hex, http, zeroAddress } from "viem";
import { flareTestnet } from "wagmi/chains"
import { useQuery } from "@tanstack/react-query";
import { useMarket } from "./useMarket";
import { MARKET_ADDRESS, PAST_ROUND_FETCH } from "@app/configs";

export enum Option {
    None = "NONE",
    Bear = "BEAR",
    Bull = "BULL",
}

export interface PositionInfo {
    stake: bigint;
    option: Option;
    claimed: boolean;
}

export enum RoundStatus {
    Live = "LIVE",
    NotOpen = "NOT_OPEN",
    Open = "OPEN",
    Refunding = "REFUNDING",
    Resolved = "RESOLVED",
}

export interface Round {
    roundId: bigint;
    status: RoundStatus;
    lockTime: number;
    lockPrice?: number;
    rewardPrize: bigint;
    bearAmount: bigint;
    bullAmount: bigint;
    totalAmount: bigint;
    winningAmount: bigint;
    closeTime: number;
    closePrice?: number;
    winningSide: Option;
    position?: PositionInfo;
}

export const getRoundStatus = (status: number) => {
    switch (status) {
        case 0:
            return RoundStatus.NotOpen;
        case 1:
            return RoundStatus.Open;
        case 2:
            return RoundStatus.Live;
        case 3:
            return RoundStatus.Resolved;
        case 4:
            return RoundStatus.Refunding;

        default:
            return RoundStatus.NotOpen;
    }
}

export const getOption = (option: number) => {
    switch (option) {
        case 0:
            return Option.None;
        case 1:
            return Option.Bear;
        case 2:
            return Option.Bull;

        default:
            return Option.None;
    }
}

const STARTING_SOON_ROUND: Round = {
    roundId: BigInt(0),
    status: RoundStatus.NotOpen,
    lockTime: 0,
    lockPrice: 0,
    rewardPrize: BigInt(0),
    bearAmount: BigInt(0),
    bullAmount: BigInt(0),
    totalAmount: BigInt(0),
    winningAmount: BigInt(0),
    closeTime: 0,
    closePrice: 0,
    winningSide: Option.None,
};

export function useRoundsWithPosition() {
    const { address } = useAccount();
    const { marketId } = useMarket();
    const account = address ? address : zeroAddress;

    const getMarketRounds = async () => {
        if (!marketId) return null

        const client = createPublicClient({ chain: flareTestnet, transport: http() });
        const data = await client.readContract({
            abi: fonzoMarketAbi,
            address: MARKET_ADDRESS,
            functionName: "getLatestRoundsWithPosition",
            args: [marketId, account, PAST_ROUND_FETCH],

        })
        const rounds: Round[] = [];

        if (!data) return null;
        for (let i = 0; i < data[0].length; i++) {
            const round = data[0][i];

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
                position: round.position.option !== 0 ? {
                    stake: round.position.stake,
                    option: getOption(round.position.option),
                    claimed: round.position.settled
                } : undefined
            });
        }

        const lr = rounds.find(
            (m) => m.roundId === data?.[1]
        );

        if (lr) {
            rounds.push({ ...STARTING_SOON_ROUND, roundId: lr.roundId + BigInt(1), closeTime: lr.lockTime })
            rounds.push({ ...STARTING_SOON_ROUND, roundId: lr.roundId + BigInt(2), closeTime: lr.closeTime })
        }

        rounds.sort((a, b) => Number(BigInt(a.roundId)) - Number(BigInt(b.roundId)))

        return { rounds, currentRoundId: Number(data[1]) }

    }

    return useQuery({
        queryKey: ["PREDICTIONS_LATEST", marketId, account.toLowerCase()],
        queryFn: async () => await getMarketRounds(),
        refetchInterval: 10000, // 10 seconds
        refetchIntervalInBackground: true
    })

}