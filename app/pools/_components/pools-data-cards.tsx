"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { TokenInput } from "@/components/ui/token-input";
import {
  useReadContract,
  useAccount,
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useWriteContracts } from "wagmi/experimental";
import { formatUnits } from "viem";
import {
  CNOTE_ADDRESS,
  KEEPER_POOL_ADDRESS,
  KUSD_ADDRESS,
  EIGHTEEN_DECIMALS,
} from "@/web3/keeper.config";
import keeperPoolAbi from "@/web3/abis/keeper-abi";
import kusdAbi from "@/web3/abis/kusd-abi";
import cerc20Abi from "@/web3/abis/cerc20-abi";

const depositFormSchema = z.object({
  depositAmount: z.coerce.number().gte(1, {
    message: "Minimum is $1.",
  }),
});

function DepositModal({ depositDetails }: { depositDetails: any }) {
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
    reset: approveReset,
  } = useWriteContract();

  const {
    data: depositHash,
    error: depositError,
    isPending: depositIsPending,
    writeContract: depositWriteContract,
    reset: depositReset,
  } = useWriteContract();

  const handleDeposit = async (values: z.infer<typeof depositFormSchema>) => {
    const t = toast({
      title: "Deposit in progress...",
      description: "This will take a few moments",
      duration: !approveError || !depositError ? Infinity : 3100,
    });
    // approve keeper pool to spend cNote token
    approveWriteContract(
      {
        address: CNOTE_ADDRESS,
        abi: cerc20Abi,
        functionName: "approve",
        args: [
          KEEPER_POOL_ADDRESS,
          BigInt(Number(values.depositAmount) * EIGHTEEN_DECIMALS),
        ],
      },
      {
        onSuccess(data, variables, context) {
          // deposit to pool after approval
          depositWriteContract(
            {
              address: KEEPER_POOL_ADDRESS,
              abi: keeperPoolAbi,
              functionName: "depositLiquidity",
              args: [BigInt(Number(values.depositAmount) * EIGHTEEN_DECIMALS)],
            },
            {
              onSuccess(data, variables, context) {
                toast({
                  title: "Deposit successful!",
                  variant: "success",
                });
                handleCancel();
              },
              onError(error) {
                t.update({
                  id: t.id,
                  variant: "destructive",
                  title: "Something went wrong...",
                  description:
                    (depositError as BaseError).shortMessage ||
                    depositError!.message,
                });
              },
            }
          );
        },
        onError(error) {
          console.error("error");
          t.update({
            id: t.id,
            variant: "destructive",
            title: "Something went wrong...",
            description:
              (approveError as BaseError).shortMessage || approveError!.message,
          });
        },
      }
    );
  };

  const handleCancel = () => {
    // cancel everything...
    const t = toast({});
    t.dismiss();
    approveReset();
    depositReset();
    form.reset();
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
                        disabled={approveIsPending || depositIsPending}
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {/* {depositError && (
                      <div>
                        Error:{" "}
                        {(depositError as BaseError).shortMessage ||
                          depositError.message}
                      </div>
                    )} */}
                  </FormItem>
                )}
              />

              <div className="grid gap-3">
                <ul className="grid gap-3">
                  {/* <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">APY</span>
                    <span>{yieldRate}%</span>
                  </li> */}
                </ul>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={
                  approveIsPending || depositIsPending || !isDirty || !isValid
                }
              >
                {approveIsPending || depositIsPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Depositing...
                  </>
                ) : (
                  <>Confirm Deposit</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const withdrawalFormSchema = z.object({
  withdrawAmount: z.coerce.number().gte(1, {
    message: "Minimum is $1.",
  }),
});

function WithdrawalModal({ withdrawalDetails }: { withdrawalDetails: any }) {
  const { yieldRate } = withdrawalDetails;
  const { address } = useAccount();

  const form = useForm<z.infer<typeof withdrawalFormSchema>>({
    resolver: zodResolver(withdrawalFormSchema),
    defaultValues: {
      withdrawAmount: 0,
    },
  });

  // const { toast } = useToast();
  const { formState } = form;
  const { isDirty, isValid } = formState;
  const {
    data: withdrawalHash,
    error: withdrawalError,
    isPending: withdrawalIsPending,
    writeContract: withdrawalWriteContract,
    reset: withdrawalReset,
  } = useWriteContract();

  const {
    data: lpBalance,
    error: lpBalanceError,
    isPending: lpBalanceLoading,
  } = useReadContract({
    abi: keeperPoolAbi,
    address: KEEPER_POOL_ADDRESS,
    functionName: "liquidityProviderBalance",
    args: [address!],
  });

  const handleWithdraw = async (
    values: z.infer<typeof withdrawalFormSchema>
  ) => {
    const t = toast({
      title: "Withdrawal in progress...",
      description: "This will take a few moments",
      duration: !withdrawalError ? Infinity : 3100,
    });
    // deposit to pool after approval
    withdrawalWriteContract(
      {
        address: KEEPER_POOL_ADDRESS,
        abi: keeperPoolAbi,
        functionName: "withdrawLiquidity",
        args: [BigInt(Number(values.withdrawAmount) * EIGHTEEN_DECIMALS)],
      },
      {
        onSuccess(data, variables, context) {
          toast({
            title: "Withdrawal successful!",
            variant: "success",
          });
        },
        onError(error) {
          t.update({
            id: t.id,
            variant: "destructive",
            title: "Something went wrong...",
            description:
              (withdrawalError as BaseError).shortMessage ||
              withdrawalError!.message,
          });
        },
      }
    );
  };

  const handleCancel = () => {
    // cancel everything...
    const t = toast({});
    t.dismiss();
    withdrawalReset();
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Withdraw</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleWithdraw)}>
            <DialogHeader>
              <DialogTitle>Withdraw</DialogTitle>
              <DialogDescription>
                Withdraw part or all of your deposit into cNote or kUSD.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="withdrawAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="withdrawAmount"
                      className="capitalize mb-3"
                    >
                      Withdraw (NOTE)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xl py-2 h-12 px-4"
                        placeholder="0.00"
                        disabled={withdrawalIsPending}
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {/* {withdrawalError && (
                      <div>
                        Error:{" "}
                        {(withdrawalError as BaseError).shortMessage ||
                          withdrawalError.message}
                      </div>
                    )} */}
                  </FormItem>
                )}
              />
              <div className="grid gap-3">
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Active Deposit
                    </span>
                    <span>
                      {lpBalanceLoading ? (
                        <Skeleton className="w-[100px] h-[20px] rounded-md" />
                      ) : (
                        <>
                          {formatUnits(lpBalance as bigint, 18)}{" "}
                          <span className="text-xs text-gray-400">KUSD</span>
                        </>
                      )}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Earnings</span>
                    <span>
                      {lpBalanceLoading ? (
                        <Skeleton className="w-[100px] h-[20px] rounded-md" />
                      ) : (
                        <>
                          {formatUnits(lpBalance as bigint, 18)}{" "}
                          <span className="text-xs text-gray-400">KUSD</span>
                        </>
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={withdrawalIsPending || !isValid}>
                {withdrawalIsPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Withdrawing...
                  </>
                ) : (
                  <>Confirm Withdrawal</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
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
                <Skeleton className="w-[200px] h-[40px] bg-input rounded-md" />
              ) : (
                <>
                  {formatUnits(lpBalance as bigint, 18)}{" "}
                  <span className="text-xs text-gray-400 font-medium">
                    KUSD
                  </span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <DepositModal depositDetails={depositDetail} />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Withdrawals</CardDescription>
            <CardTitle className="text-4xl opacity-0">
              {lpBalanceLoading ? (
                <Skeleton className="w-[100px] h-[20px] rounded-md" />
              ) : (
                <>
                  {formatUnits(lpBalance as bigint, 18)}{" "}
                  <span className="text-xs text-gray-400 font-medium">
                    KUSD
                  </span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <WithdrawalModal withdrawalDetails={depositDetail} />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Earnings</CardDescription>
            <CardTitle className="text-4xl opacity-0">$1,329</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
};
