"use client";

import { fonzoMarketAbi } from "@app/abis";
import { FeedIds, MARKET_ADDRESS, MARKET_INFO, MarketInfo } from "@app/configs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { createPublicClient, Hex, http } from "viem";
import { flareTestnet } from "viem/chains";
import { atom, useAtom } from "jotai";

function useGetMarkets() {
    const getMarkets = async () => {
        const client = createPublicClient({ chain: flareTestnet, transport: http() });
        const data = await client.readContract({
            abi: fonzoMarketAbi,
            address: MARKET_ADDRESS,
            functionName: "getMarketIds",
            args: [],
        })

        const allMarkets: MarketInfo[] = [];

        data.map((m) => {
            if (m in MARKET_INFO) {
                allMarkets.push({
                    ...MARKET_INFO[m],
                });
            }
        })

        return { allMarkets };
    }

    return useQuery({
        queryKey: ["GET_MARKETS"],
        queryFn: async () => await getMarkets()
    })
}

const marketAtom = atom<Hex | null>(null);
export function useMarketStore() {
    return useAtom(marketAtom);
}

export function useMarket() {
    const [marketId, setMarketId] = useMarketStore();
    const { data } = useGetMarkets();
    const allMarkets = data?.allMarkets;
    const info = allMarkets?.find((m) => m.feedId === marketId);

    const selectMarket = (id: Hex) => setMarketId(id);

    useEffect(() => {
        if (marketId === null) {
            setMarketId(FeedIds.FLRUSD)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allMarkets]);

    return { allMarkets, info, marketId, selectMarket }
}