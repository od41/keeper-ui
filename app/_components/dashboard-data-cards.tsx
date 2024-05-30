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



export const DashboardDataCards = () => {

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-2">
                <CardDescription>Total Liquidity</CardDescription>
                <CardTitle className="text-4xl">$5,329</CardTitle>
            </CardHeader>
            <CardContent>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Total Debt</CardDescription>
            <CardTitle className="text-4xl">$1,329</CardTitle>
          </CardHeader>
          <CardContent>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Total Keeper Agents</CardDescription>
            <CardTitle className="text-4xl">396</CardTitle>
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
