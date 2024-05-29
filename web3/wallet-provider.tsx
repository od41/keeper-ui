"use client";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig, http } from "wagmi";
import { metaMask, injected } from "wagmi/connectors";
import { cantoTestnet } from "./chain";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";

const config = createConfig({
  name: "KeeperUI",
  url: "keeper-ui.vercel.app",  
  chains: [
    // canto,
    cantoTestnet,
  ],
  transports: {
    [cantoTestnet.id]: http(),
  },
  connectors: [metaMask(), injected()],
  ssr: false, // Activate server side rendering (SSR)
});

const queryClient = new QueryClient();

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
