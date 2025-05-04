"use client";

import { ftsoV2Abi } from "@app/abis";
import { FTSO_V2_ADDRESS } from "@app/configs";
import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";
import { flareTestnet } from "viem/chains";
import { useMarketStore } from "./useMarket";

type Price = {
    price: number;
    decimals: number;
    timestamp: number;
}

export function useFlareOracle() {
    const [marketId] = useMarketStore();

    const client = createPublicClient({ chain: flareTestnet, transport: http() });
    const getFeed = async () => {
        if (!marketId) return null;

        const data = await client.simulateContract({
            abi: ftsoV2Abi,
            address: FTSO_V2_ADDRESS,
            functionName: "getFeedById",
            args: [marketId]
        });

        const price: Price = {
            price: Number(data.result[0]),
            decimals: data.result[1],
            timestamp: Number(data.result[2])
        }

        return price;
    }

    return useQuery({
        queryKey: ["FLARE_TIME_SERIES_ORACLE_UPDATE", marketId],
        queryFn: async () => await getFeed(),
        enabled: !!marketId,
        refetchInterval: 10_000, // 10 seconds
    })
}