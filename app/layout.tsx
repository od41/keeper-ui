import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import DefaultPage from "./_components/default-page";
import { WalletProvider } from "../web3/wallet-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keeper",
  description: "Your DeFi risk guardian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <TooltipProvider>
            <DefaultPage>{children}</DefaultPage>
          </TooltipProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
