"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
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

const borrowFormSchema = z.object({
  borrowAmount: z.coerce.number().gte(1, {
    message: "Minimum is 1KUSD.",
  }),
  collateralAmount: z.coerce.number().gte(0, {
    message: "Enter a positive number as collateral.",
  }),
});

export const BorrowCard = () => {
  const { address } = useAccount();
  const form = useForm<z.infer<typeof borrowFormSchema>>({
    resolver: zodResolver(borrowFormSchema),
    defaultValues: {
      borrowAmount: 0,
      collateralAmount: 0,
    },
  });

  const { formState } = form;
  const { isDirty, isValid } = formState;

  const {
    data: borrowHash,
    error: borrowError,
    isPending: borrowIsPending,
    writeContract: borrowWriteContract,
    reset: borrowReset,
  } = useWriteContract();

  const handleBorrow = async (values: z.infer<typeof borrowFormSchema>) => {
    const t = toast({
      title: "We're creating your loan...",
      description: "This will take a few moments",
      duration: !borrowError ? Infinity : 3100,
    });

    // borrow from pool after approval
    borrowWriteContract(
      {
        address: KEEPER_POOL_ADDRESS,
        abi: keeperPoolAbi,
        functionName: "borrow",
        args: [
          address!,
          BigInt(Number(values.borrowAmount) * EIGHTEEN_DECIMALS),
        ],
        value: BigInt(Number(values.collateralAmount) * EIGHTEEN_DECIMALS),
      },
      {
        onSuccess(data, variables, context) {
          toast({
            title: "You've taken a new loan!",
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
              (borrowError as BaseError).shortMessage || borrowError!.message,
          });
        },
      }
    );
  };

  const handleCancel = () => {
    // cancel everything...
    const t = toast({});
    t.dismiss();
    borrowReset();
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleBorrow)}>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Borrow some KUSD</CardTitle>
            <CardDescription>
              Create a new loan and manage with the keeper slip
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-auto-row gap-4">
              <FormField
                control={form.control}
                name="collateralAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="collateralAmount"
                      className="capitalize mb-3"
                    >
                      Collateral (CANTO)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xl py-2 h-12 px-4"
                        placeholder="0.00"
                        disabled={borrowIsPending}
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="borrowAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="borrowAmount"
                      className="capitalize mb-3"
                    >
                      Debt (KUSD)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xl py-2 h-12 px-4"
                        placeholder="0.00"
                        disabled={borrowIsPending}
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
                    <span className="text-muted-foreground">Fee</span>
                    <span>0.5%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Min. Collaterization Ratio
                    </span>
                    <span>110%</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={borrowIsPending || !isValid}>
              {borrowIsPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Borrowing...
                </>
              ) : (
                <>Confirm Borrow</>
              )}
            </Button>
            <Button variant="outline" className="ml-4" onClick={handleCancel}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
