"use client"
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  canto
} from 'wagmi/chains';
import { cantoTestnet } from './chain';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import React from 'react';

const config = getDefaultConfig({
    appName: 'Keeper UI',
    projectId: 'YOUR_PROJECT_ID',
    chains: [
        // canto, 
        cantoTestnet
    ],
    ssr: false, // If your dApp uses server side rendering (SSR)
  });


  const queryClient = new QueryClient();

export const WalletProvider = ({children} : {children: React.ReactNode}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};