"use client";
import { createContext, useEffect, useState } from "react";
import {
  useReadContract,
  useAccount,
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { formatUnits } from "viem";
import {
  CNOTE_ADDRESS,
  KEEPER_POOL_ADDRESS,
  KUSD_ADDRESS,
  EIGHTEEN_DECIMALS,
} from "@/web3/keeper.config";
import keeperPoolAbi from "@/web3/abis/keeper-abi";
import kusdAbi from "@/web3/abis/kusd-abi";

export type KeeperSlip = {
  id: string;
};

type KeeperContextProps = {
  totalLiquidity: number;
  totalDebt: number;
  totalKeeperAgents: number;
  collaterizationRatio: number;
  userLiquidityBalance: number;
  userWithdrawalBalance: number;
  userEarningsBalance: number;
  userDebtBalance: number;
  userKUSDBalance: number;
  userKeeperSlips: KeeperSlip[] | undefined;
  userPoolsHistory: any[] | undefined;
};

const defaultData: KeeperContextProps = {
  totalLiquidity: 0,
  totalDebt: 0,
  totalKeeperAgents: 0,
  collaterizationRatio: 0,
  userLiquidityBalance: 0,
  userWithdrawalBalance: 0,
  userEarningsBalance: 0,
  userDebtBalance: 0,
  userKUSDBalance: 0,
  userKeeperSlips: undefined,
  userPoolsHistory: undefined,
};

export const KeeperContext = createContext(defaultData);

export function KeeperProvider({ children }: { children: React.ReactNode }) {
  const [totalLiquidity, setTotalLiquidity] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalKeeperAgents, setTotalKeeperAgents] = useState(0);
  const [collaterizationRatio, setCollaterizationRatio] = useState(0);
  const [userLiquidityBalance, setUserLiquidityBalance] = useState(0);
  const [userWithdrawalBalance, setUserWithdrawalBalance] = useState(0);
  const [userEarningsBalance, setUserEarningsBalance] = useState(0);
  const [userDebtBalance, setUserDebtBalance] = useState(0);
  const [userKUSDBalance, setUserKUSDBalance] = useState(0);
  const [userKeeperSlips, setUserKeeperSlips] = useState(undefined);
  const [userPoolsHistory, setUserPoolsHistory] = useState(undefined);

  return (
    <KeeperContext.Provider
      value={{
        totalLiquidity,
        totalDebt,
        totalKeeperAgents,
        collaterizationRatio,
        userLiquidityBalance,
        userWithdrawalBalance,
        userEarningsBalance,
        userDebtBalance,
        userKUSDBalance,
        userKeeperSlips,
        userPoolsHistory,
      }}
    >
      {children}
    </KeeperContext.Provider>
  );
}
