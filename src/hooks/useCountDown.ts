"use client";

import { useEffect, useState } from "react";

type CountDown = {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
};

export function useCountDown(targetSecs?: number) {
    const calculateTimeDelta = (targetSecs?: number) => {
        if (!targetSecs) return 0;

        const now = Math.floor(Date.now() / 1000);

        return Number.isFinite(targetSecs) && targetSecs > now
            ? targetSecs - now
            : 0;
    };

    const calculateTimeRemaining = (secs: number): CountDown => {
        if (secs > 0) {
            const days = Math.floor(secs / 86400)
                .toString()
                .padStart(2, "0");

            const hours = Math.floor((secs / 3600) % 24)
                .toString()
                .padStart(2, "0");

            const minutes = Math.floor((secs / 60) % 60)
                .toString()
                .padStart(2, "0");

            const seconds = Math.floor(secs % 60)
                .toString()
                .padStart(2, "0");

            return { days, hours, minutes, seconds };
        }

        return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    };

    const [secondsLeft, setSecondsLeft] = useState<number>(
        calculateTimeDelta(targetSecs)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft(calculateTimeDelta(targetSecs));
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft, targetSecs]);

    const countdown = calculateTimeRemaining(secondsLeft);
    const isCountOver = secondsLeft === 0;

    return { countdown, isCountOver };
}