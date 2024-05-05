import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BorrowCard } from "./_components/borrow-card";
import { ActiveSlips } from "./_components/active-slips";

export default function Home() {
  return (
    <>
      <Tabs defaultValue="week">
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
    </>
  );
}
