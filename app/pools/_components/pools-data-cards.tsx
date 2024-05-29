"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TokenInput } from "@/components/ui/token-input";
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
} from "@/web3/keeper.config";
import keeperPoolAbi from "@/web3/abis/keeper-abi";
import kusdAbi from "@/web3/abis/kusd-abi";
import cerc20Abi from "@/web3/abis/cerc20-abi";
import { Input } from "@/components/ui/input";

const depositFormSchema = z.object({
  depositAmount: z.coerce.number().gte(1, {
    message: "Minimum is $1.",
  }),
});

function DeposityModal({ depositDetails }: { depositDetails: any }) {
  const { yieldRate } = depositDetails;
  const form = useForm<z.infer<typeof depositFormSchema>>({
    resolver: zodResolver(depositFormSchema),
    defaultValues: {
      depositAmount: 0,
    },
  });

  const { formState } = form;
  const { isDirty, isValid } = formState;
  const {
    data: approveHash,
    error: approveError,
    isPending: approveIsPending,
    writeContract: approveWriteContract,
  } = useWriteContract();

  const {
    data: depositHash,
    error: depositError,
    isPending: depositIsPending,
    writeContract: depositWriteContract,
  } = useWriteContract();

  console.log("depositerror", depositError);
  console.log("cerc20error", approveError);

  const handleDeposit = async (values: z.infer<typeof depositFormSchema>) => {
    console.log("handledeposit", values);
    // approve keeper pool to spend cNote token
    approveWriteContract({
      address: CNOTE_ADDRESS,
      abi: cerc20Abi,
      functionName: "approve",
      args: [KEEPER_POOL_ADDRESS, BigInt(values.depositAmount)],
    });

    // write to contract
    depositWriteContract({
      address: KEEPER_POOL_ADDRESS,
      abi: keeperPoolAbi,
      functionName: "depositLiquidity",
      args: [BigInt(values.depositAmount)],
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Deposit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleDeposit)}>
            <DialogHeader>
              <DialogTitle>Deposit Funds</DialogTitle>
              <DialogDescription>
                Deposit cNote or kUSD into the pool.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="depositAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="depositAmount"
                      className="capitalize mb-3"
                    >
                      Deposit (cNote or kUSD)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xl py-2 h-12 px-4"
                        placeholder="0.00"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-3">
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">APY</span>
                    <span>{yieldRate}%</span>
                  </li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="submit" disabled={!isDirty || !isValid}>
                Confirm Deposit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function WithdrawalModal({ withdrawalDetails }: { withdrawalDetails: any }) {
  const { yieldRate } = withdrawalDetails;

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
          {/* <TokenInput label="Withdraw" /> */}

          <div className="grid gap-3">
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Earned</span>
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
  };
  const { address } = useAccount();

  const {
    data: lpBalance,
    error,
    isPending: lpBalanceLoading,
  } = useReadContract({
    abi: keeperPoolAbi,
    address: KEEPER_POOL_ADDRESS,
    functionName: "liquidityProviderBalance",
    args: [address!],
  });

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-2">
            <CardDescription>Deposits</CardDescription>
            <CardTitle className="text-4xl">
              {lpBalanceLoading ? (
                <>Loading...</>
              ) : (
                <>${formatUnits(lpBalance as bigint, 18)}</>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <DeposityModal depositDetails={depositDetail} />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Withdrawals</CardDescription>
            <CardTitle className="text-4xl">$1,329</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <WithdrawalModal withdrawalDetails={depositDetail} />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Earnings</CardDescription>
            <CardTitle className="text-4xl">$1,329</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
};
