import { atom, useAtom } from "jotai";
import { Swiper } from "swiper/types";

const swiperAtom = atom<Swiper | null>(null);
export function useSwiper() {
    return useAtom(swiperAtom);
}