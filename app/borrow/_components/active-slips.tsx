"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, CircleCheck, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TokenInput } from "@/components/ui/token-input";

import { type KeeperSlip } from "@/context";
import { useAccount, type BaseError, useWatchContractEvent } from "wagmi";
import {
  CNOTE_ADDRESS,
  KEEPER_POOL_ADDRESS,
  KUSD_ADDRESS,
  EIGHTEEN_DECIMALS,
} from "@/web3/keeper.config";
import keeperPoolAbi from "@/web3/abis/keeper-pool-abi";

function RepayModal({ debtDetails }: { debtDetails: ActiveDebtType }) {
  const { dateCreated, debt, collateral, collaterizedRatio, active, id } =
    debtDetails;

  const handleRepay = (e: any) => {
    e.preventDefault();
    window.alert("Repay " + id);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Repay</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Repay Debt</DialogTitle>
          <DialogDescription>
            Repay part or all of your debt with kUSD.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <TokenInput label="debt" />

          <div className="grid gap-3">
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Owed</span>
                <span>kUSD {debt}</span>
              </li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button type="submit" onClick={handleRepay}>
            Repay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type ActiveDebtType = {
  collaterizedRatio: number;
  dateCreated: number;
  debt: number;
  collateral: number;
  active: boolean;
  id: string;
};

export const ActiveSlips = () => {
  const priceOfCollateral = 0.02;

  const { address } = useAccount();

  // const { data: activeSlips } =
  useWatchContractEvent({
    address: KEEPER_POOL_ADDRESS,
    abi: keeperPoolAbi,
    eventName: "NewKeeperDeployed",
    // args: {
    //   trader: address,
    // },

    onLogs(logs) {
      console.log("New logs!", logs);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  const dummyActiveSlips: ActiveDebtType[] = [
    {
      collaterizedRatio: 110,
      dateCreated: Date.now(),
      debt: 2000,
      collateral: 4,
      active: true,
      id: "di32i3j",
    },
    {
      collaterizedRatio: 110,
      dateCreated: Date.now(),
      debt: 2000,
      collateral: 4,
      active: true,
      id: "fadf323",
    },
    {
      collaterizedRatio: 110,
      dateCreated: Date.now(),
      debt: 2000,
      collateral: 4,
      active: false,
      id: "lgpopr93s",
    },
    {
      collaterizedRatio: 110,
      dateCreated: Date.now(),
      debt: 2000,
      collateral: 4,
      active: false,
      id: "dklkfjd7",
    },
  ];
  return (
    <>
      <Card x-chunk="dashboard-01-chunk-5">
        <CardHeader>
          <CardTitle>Active Slips</CardTitle>
        </CardHeader>
        <CardContent className="grid">
          {dummyActiveSlips.map((debtDetails, key) => {
            const {
              dateCreated,
              debt,
              collateral,
              collaterizedRatio,
              active,
              id,
            } = debtDetails;
            return (
              <div
                key={`slip-${id}`}
                className="flex items-center justify-between gap-4 w-full hover:bg-zinc-100 py-4 px-4 rounded-md"
              >
                <div className="flex items-center gap-2">
                  {active ? (
                    <RefreshCw className="h-4 text-green-400" />
                  ) : (
                    <CircleCheck className="h-5 text-stone-400" />
                  )}
                  <div className="grid gap-1">
                    <p className="text-md font-medium leading-none">
                      kUSD {debt}
                    </p>
                    <div className="text-sm text-muted-foreground flex items-center gap-">
                      {collaterizedRatio}% <Dot />{" "}
                      {new Date(dateCreated).toDateString()}
                    </div>
                  </div>
                </div>
                <RepayModal debtDetails={debtDetails} />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
};
