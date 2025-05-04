"use client";

import { Provider } from "@app/components/ui/provider";
import { ClientOnly, Flex } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { flareTestnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Navbar } from "./Navbar";
import { Kanit } from "next/font/google";

const queryClient = new QueryClient();
const config = getDefaultConfig({
  appName: "Fonzo.fun",
  projectId: "6f379acc44c463d6660ef2049d1cfc8c",
  chains: [flareTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body className={kanit.className}>
        <ClientOnly>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider theme={darkTheme()}>
                <Provider>
                  <Flex flexDir="column">
                    <Navbar />
                    {children}
                  </Flex>
                </Provider>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
