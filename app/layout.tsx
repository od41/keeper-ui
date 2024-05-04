import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import DefaultPage from "./_components/default-page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TooltipProvider>
        <body className={inter.className}>
          <DefaultPage>
            {children}
          </DefaultPage>
        </body>
      </TooltipProvider>
    </html>
  );
}
