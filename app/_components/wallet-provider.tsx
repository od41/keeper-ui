"use client"
import {
  getDefaultConfig,
  RainbowKitProvider,
  connectorsForWallets 
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig } from 'wagmi';
import { braveWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import {
  canto
} from 'wagmi/chains';
import { cantoTestnet } from './chain';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import React from 'react';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, braveWallet],
    },
  ],
  {
    appName: 'Keeper',
    projectId: 'YOUR_PROJECT_ID',
  }
);

const config = createConfig({
    connectors,
    autoConnect: true,
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
        <RainbowKitProvider modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};