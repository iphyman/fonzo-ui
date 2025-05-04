"use client";

import { formatEther, formatUnits, parseEther } from "viem";
import { flareTestnet } from "viem/chains";

export const formatUSD = (usd: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
    }).format(usd);
};

export function calculateReward(
    rewardPool: bigint,
    winningShares: bigint,
    share: bigint
) {
    if (rewardPool === BigInt(0) || winningShares === BigInt(0)) return BigInt(0);

    const multiplier =
        Number(formatEther(rewardPool)) /
        Number(formatEther(winningShares));

    const shareAmount = Number(formatEther(share));
    const r = multiplier * shareAmount;
    return parseEther(r.toString());
}

export const getMultiplier = (total: bigint, amount: bigint) => {
    if (total === BigInt(0) || amount === BigInt(0)) {
        return 0
    }

    const multiplier = Number(formatEther(total)) / Number(formatEther(amount));
    return Number(multiplier.toFixed(2));
}

export const getPriceDifference = (price: bigint | undefined, lockPrice: bigint | undefined) => {
    if (!price || !lockPrice) {
        return BigInt(0)
    }

    return price - lockPrice
}

export function formatPrice(price: string, decimals = 8) {
    const dollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 4,
    });

    const formatted = formatUnits(BigInt(price), decimals);
    const amount = parseFloat((+formatted).toFixed(4));

    return dollar.format(amount);
}

export function formatFlare(
    amount: bigint = BigInt(0),
    displayDecimal = 4
) {
    let decimalAmount: number = 0;

    decimalAmount = Number(formatUnits(amount, flareTestnet.nativeCurrency.decimals));

    if (decimalAmount < 0.00001) return `<0.00001 ${flareTestnet.nativeCurrency.symbol}`;

    const suffixes: string[] = ["", "k", "m", "b"];
    let suffixIndex = 0;

    while (decimalAmount >= 1000 && suffixIndex < 3) {
        decimalAmount /= 1000;
        suffixIndex++;
    }

    const decimalCount = Math.min(
        decimalAmount.toString().split(".")[1]?.length || 0,
        displayDecimal
    );

    const formattedValue = decimalAmount.toFixed(decimalCount);
    return `${formattedValue}${suffixes[suffixIndex]} ${flareTestnet.nativeCurrency.symbol}`;
}