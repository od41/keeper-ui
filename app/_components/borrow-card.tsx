import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TokenInput } from "@/components/ui/token-input";

export const BorrowCard = () => {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Create a slip</CardTitle>
        <CardDescription>Create a new loan slip</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-auto-row gap-4">
          <TokenInput label="collateral" />
          <TokenInput label="debt" />
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Confirm</Button>
        <Button variant="outline" className="ml-4">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};
