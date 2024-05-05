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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const TradingCard = () => {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Create Trading Position</CardTitle>
        <CardDescription>Create a new protected trading position</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-auto-row gap-4">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="slips">Slips</Label>
              <Select>
                <SelectTrigger id="slips" aria-label="Select slip">
                  <SelectValue placeholder="Select slip" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slip1">Slip 1</SelectItem>
                  <SelectItem value="slip2">Slip 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <TokenInput label="debt" />

          <div className="grid gap-3">
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Fee</span>
                <span>0.5%</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Collaterization Ratio
                </span>
                <span>110%</span>
              </li>
            </ul>
          </div>
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
