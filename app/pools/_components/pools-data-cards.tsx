"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

function DeposityModal({ depositDetails }: { depositDetails: any}) {
    const { yieldRate } = depositDetails
  
    const handleDeposit = (e: any) => {
      e.preventDefault();
      window.alert("deposit " + yieldRate);
    };
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Deposit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Deposit Funds</DialogTitle>
            <DialogDescription>
              Deposit cNote or kUSD into the pool.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <TokenInput label="Deposit (cNote or kUSD)" />
  
            <div className="grid gap-3">
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    APY
                  </span>
                  <span>{yieldRate}%</span>
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button type="submit" onClick={handleDeposit}>
              Confirm Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  function WithdrawalModal({ withdrawalDetails }: { withdrawalDetails: any}) {
    const { yieldRate } = withdrawalDetails
  
    const handleDeposit = (e: any) => {
      e.preventDefault();
      window.alert("withdrawal " + yieldRate);
    };
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Withdraw</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Withdraw</DialogTitle>
            <DialogDescription>
              Withdraw part or all of your deposit into cNote or kUSD.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <TokenInput label="Withdraw" />
  
            <div className="grid gap-3">
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Earned
                  </span>
                  <span>{yieldRate}%</span>
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button type="submit" onClick={handleDeposit}>
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

export const PoolsDataCards = () => {
    const depositDetail = {
        yieldRate: 8.23,
        id: "di32i3j",
      }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-2">
                <CardDescription>Deposits</CardDescription>
                <CardTitle className="text-4xl">$5,329</CardTitle>
            </CardHeader>
            <CardContent>
          </CardContent>
          <CardFooter>
            <DeposityModal depositDetails={depositDetail} />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Withdrawals</CardDescription>
            <CardTitle className="text-4xl">$1,329</CardTitle>
          </CardHeader>
          <CardContent>
          </CardContent>
          <CardFooter>
            <WithdrawalModal withdrawalDetails={depositDetail} />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Earnings</CardDescription>
            <CardTitle className="text-4xl">$1,329</CardTitle>
          </CardHeader>
          <CardContent>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
