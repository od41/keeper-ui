"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, CircleCheck, Dot } from "lucide-react";

enum PoolActionType {
  Deposit="Deposit",
  Withdrawal="Withdrawal"
}

type PoolsHistoryType = {
  amount: number;
  dateCreated: number;
  yieldRate: number;
  type: PoolActionType;
  active: boolean;
  id: string;
};

export const PoolsHistory = () => {
  const priceOfCollateral = 0.02;
  const activeSlips: PoolsHistoryType[] = [
    {
      dateCreated: Date.now(),
      amount: 1900,
      yieldRate: 8.23,
      type: PoolActionType.Withdrawal,
      active: true,
      id: "di32i3j",
    },
    {
      dateCreated: Date.now(),
      amount: 1900,
      yieldRate: 8.23,
      type: PoolActionType.Withdrawal,
      active: true,
      id: "di32i3j",
    },
    {
      dateCreated: Date.now(),
      amount: 1900,
      yieldRate: 8.23,
      type: PoolActionType.Withdrawal,
      active: true,
      id: "di32i3j",
    },
    {
      dateCreated: Date.now()-300000,
      amount: 100,
      yieldRate: 8.23,
      type: PoolActionType.Deposit,
      active: true,
      id: "di32i3j",
    },
  ];
  return (
    <>
      <Card x-chunk="dashboard-01-chunk-5">
        <CardHeader>
          <CardTitle>Pools History</CardTitle>
        </CardHeader>
        <CardContent className="grid">
          {activeSlips.map(
            (
              debtDetails,
              key
            ) => {
              const { dateCreated,amount, type, yieldRate, active, id } = debtDetails
              return <div
                key={`slip-${dateCreated}`}
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
                      {type}
                    </p>
                    <div className="text-sm text-muted-foreground flex items-center gap-">
                      {yieldRate}% <Dot />{" "}
                      {new Date(dateCreated).toDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-lg">kUSD {amount}</div>
              </div>
            }
          )}
        </CardContent>
      </Card>
    </>
  );
};
