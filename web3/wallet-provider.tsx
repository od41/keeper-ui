"use client"
import {
  RainbowKitProvider,
  getDefaultConfig
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
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

const config = getDefaultConfig({
  appName: 'Keeper UI',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
      // canto, 
      cantoTestnet
  ],
  wallets: [{
    groupName: 'Recommended',
    wallets: [metaMaskWallet, braveWallet],
  }],
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