import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BorrowCard } from "./_components/borrow-card";
import { ActiveSlips } from "./_components/active-slips";

const BorrowPage = () => {
  return (
    <div>
      <Tabs defaultValue="borrow">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="borrow">Borrow</TabsTrigger>
            <TabsTrigger value="slips">Slips</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="borrow">
          <BorrowCard />
        </TabsContent>

        <TabsContent value="slips">
          <ActiveSlips />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BorrowPage;
