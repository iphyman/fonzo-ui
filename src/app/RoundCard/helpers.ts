import { formatEther, formatUnits } from "viem";

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

export function formatAmount(amount: bigint, symbol: string, decimals = 18) {
    const formatted = formatUnits(amount, decimals);
    const decimalAmount = parseFloat((+formatted).toFixed(4));

    return `${decimalAmount.toLocaleString()} ${symbol}`;
}

export function getMultiplier(totalShares: bigint, winningShares: bigint) {
    if (totalShares === BigInt(0) || winningShares === BigInt(0))
        return Number(0).toFixed(1);

    const multiplier =
        Number(formatEther(totalShares)) /
        Number(formatEther(winningShares));

    return multiplier.toFixed(2);
}