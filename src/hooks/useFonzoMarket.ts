"use client";

import {
    useAccount,
    useWaitForTransactionReceipt,
    useWriteContract,
} from "wagmi";
import {
    BaseError,
    ContractFunctionRevertedError,
    createPublicClient,
    Hex,
    http,
    UserRejectedRequestError,
} from "viem";
import { toaster } from "@app/components/ui/toaster";
import { useEffect } from "react";
import { useMarket } from "./useMarket";
import { Option, useRoundsWithPosition } from "./useRounds";
import { fonzoMarketAbi, ftsoV2Abi } from "@app/abis";
import { FTSO_V2_ADDRESS, MARKET_ADDRESS } from "@app/configs";
import { delay } from "lodash";

const parseCapitalizedString = (msg: string): string => {
    const words = msg.match(/[A-Z][a-z]*/g);
    const formattedMsg = words?.map((word, index) => {
        if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
            return word.charAt(0).toLowerCase() + word.slice(1);
        }
    });

    return formattedMsg ? formattedMsg.join(" ") : "";
};

export const getErrorMessage = (errMsg: string): string => {
    switch (errMsg) {
        case "ConnectorNotConnectedError":
            return "No wallet connected yet!";
        default:
            return parseCapitalizedString(errMsg);
    }
};

export const parseContractError = (err: unknown) => {
    if (err instanceof BaseError) {
        const revertError = err.walk(
            (err) => err instanceof ContractFunctionRevertedError
        );
        if (revertError instanceof ContractFunctionRevertedError) {
            const errorName = revertError.data?.errorName ?? "Unknown Error";
            toaster.create({
                title: "Error",
                description: getErrorMessage(errorName),
                type: "error",
            });
        }
    }
};

export function useFonzoMarket() {
    const { info } = useMarket();
    const { address: account, chain } = useAccount();
    const {
        data: hash,
        isPending,
        error,
        writeContract,
        reset,
    } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
            confirmations: 1,
        });

    const { refetch } = useRoundsWithPosition();

    const takePosition = async (roundId: bigint, stake: bigint, option: Option) => {
        if (!account || !info || !chain) return;

        const client = createPublicClient({ chain, transport: http() });

        try {
            const { request } = await client.simulateContract({
                abi: fonzoMarketAbi,
                address: MARKET_ADDRESS,
                functionName: option === Option.Bull ? "bullish" : "bearish",
                args: [info.feedId, roundId],
                account,
                chain,
                value: stake
            });

            writeContract(request, {
                onSuccess() {
                    delay(() => refetch(), 5_000);
                },
            });
        } catch (error) {
            parseContractError(error);
        }
    };

    const settle = async (roundIds: bigint[]) => {
        if (!account || !info || !chain) return;
        const client = createPublicClient({ chain: chain, transport: http() });

        try {
            const { request } = await client.simulateContract({
                abi: fonzoMarketAbi,
                address: MARKET_ADDRESS,
                functionName: "settle",
                args: [info.feedId, roundIds],
                account,
                chain,
            });

            writeContract(request);
        } catch (error) {
            parseContractError(error);
        }

    };

    const initializeMarket = async (feedId: Hex) => {
        if (!account || !chain) return;

        const client = createPublicClient({ chain: chain, transport: http() });

        const priceUpdateFee = await client.readContract({
            abi: ftsoV2Abi,
            address: FTSO_V2_ADDRESS,
            functionName: "calculateFeeById",
            args: [feedId]
        });

        try {
            const { request } = await client.simulateContract({
                abi: fonzoMarketAbi,
                address: MARKET_ADDRESS,
                functionName: "initializeMarket",
                args: [feedId],
                account,
                chain,
                value: priceUpdateFee
            });

            writeContract(request);
        } catch (error) {
            parseContractError(error);
        }
    }

    const resolve = async (roundId: bigint) => {
        if (!account || !chain || !info) return;

        const client = createPublicClient({ chain: chain, transport: http() });

        const priceUpdateFee = await client.readContract({
            abi: ftsoV2Abi,
            address: FTSO_V2_ADDRESS,
            functionName: "calculateFeeById",
            args: [info.feedId]
        });

        try {
            const { request } = await client.simulateContract({
                abi: fonzoMarketAbi,
                address: MARKET_ADDRESS,
                functionName: "resolve",
                args: [info.feedId, roundId],
                account,
                chain,
                value: priceUpdateFee
            });

            writeContract(request);
        } catch (error) {
            parseContractError(error);
        }
    }


    useEffect(() => {
        if (error && !(error instanceof UserRejectedRequestError)) {
            if (error instanceof BaseError) {
                const revertError = error.walk(
                    (error) => error instanceof ContractFunctionRevertedError
                );
                if (revertError instanceof ContractFunctionRevertedError) {
                    const errorName = revertError.data?.errorName;
                    toaster.create({
                        title: "Oops!",
                        description: errorName
                            ? getErrorMessage(errorName)
                            : revertError.shortMessage,
                        type: "error",
                    });
                }
            } else {
                toaster.create({
                    title: "Oops!",
                    description: getErrorMessage(error.name),
                    type: "error",
                });
            }
        }

    }, [error]);

    useEffect(() => {
        if (!isConfirmed) return;

        toaster.create({
            title: "Successful",
            description: "Action completed!",
            type: "success",
        });

        reset();
        refetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConfirmed]);

    return {
        takePosition,
        isConfirming,
        isConfirmed,
        isPending,
        settle,
        initializeMarket,
        resolve
    };
}