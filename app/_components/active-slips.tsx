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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenInput } from "@/components/ui/token-input";

function RepayModal({debtId}: {debtId: string}) {
  const handleRepay = (e:any) => {
    e.preventDefault();
    window.alert('Repay'+debtId)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Repay</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Repay Debt</DialogTitle>
          <DialogDescription>
            Repay part of your debt with kUSD.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <TokenInput label="debt"/>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button type="submit" onClick={handleRepay}>Repay</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type ActiveSlipsType = {
  collaterizedRatio: number;
  dateCreated: number;
  debt: number;
  collateral: number;
  active: boolean;
  id: string;
};

export const ActiveSlips = () => {
  const priceOfCollateral = 0.02;
  const activeSlips: ActiveSlipsType[] = [
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
          {activeSlips.map(
            (
              { dateCreated, debt, collateral, collaterizedRatio, active, id },
              key
            ) => (
              <div
                key={`slip-${dateCreated}`}
                className="flex items-center justify-between gap-4 w-full hover:bg-zinc-100 py-4 px-4 rounded-md"
              >
                <div className="flex items-center gap-2">
                  {active ? <RefreshCw className="h-4 text-green-400"/> : <CircleCheck className="h-5 text-stone-400" />}
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
                <RepayModal debtId={id}/>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </>
  );
};
