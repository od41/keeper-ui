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
import { Input } from "@/components/ui/input";

export const GuardianCard = () => {
  const kusdBalance = 32;
  const dummyCantoPositions: any = [
    {
      id: '428',
      type: "long",
      margin: 434,
      leverage: 1.4,
      token1: "cNote",
      token2: "canto",
      price: "0.5",
    },
    {
      id: "3241",
      type: "short",
      margin: 667,
      leverage: 2,
      token1: "canto",
      token2: "cNote",
      price: "4",
    },
  ]
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Create Keeper Agent</CardTitle>
        <CardDescription>
          Protect a trading position with a Keeper Agent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-auto-row gap-4">
          <div className="grid gap-3">
            <Label htmlFor="positions">Cadence Positions</Label>
            <Select>
              <SelectTrigger id="positions" aria-label="Select slip">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                {dummyCantoPositions.map((pos: any) => (
                  <SelectItem key={pos.id} value={`${pos.id}`}>
                    <div>
                      <div className="uppercase text-lg text-slate-800">{pos.margin} {pos.token1}</div>
                      <div className="uppercase text-sm text-slate-400">{pos.type} {pos.leverage}X</div>
                      <div>
                        {pos.price} {pos.token2}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm">
            KUSD Balance: {kusdBalance} KUSD
          </div>

          <div className="grid gap-3">
            <Label htmlFor="actions">Actions</Label>
            <Select>
              <SelectTrigger id="actions" aria-label="Action type">
                <SelectValue placeholder="Action type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="take-profit">Take Profit</SelectItem>
                <SelectItem value="stop-loss">Stop Loss</SelectItem>
                <SelectItem value="add-margin">Add Margin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>

            <div className="flex justify-between items-center">
              <Label htmlFor="percentage" className='capitalize mb-3'>Percentage</Label>
              <div className="text-sm">
                Price preview: {}
              </div>
            </div>
            <div className="flex items-center">
              <Input id="percentage" type="number" max={"100"} min="0" placeholder="Percentage" /><span className="ml-4">%</span> 
            </div>
          </div>

          {/* <TokenInput label="debt" /> */}

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
