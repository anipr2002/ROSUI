"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function ROSNodeInfoSkeleton() {
  const skeletonCards = Array(10).fill(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skeletonCards.map((_, index) => (
        <Card key={index} className="w-full max-w-md overflow-hidden">
          <CardHeader className="bg-secondary">
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="published" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {["Published", "Subscribed", "Services"].map((label) => (
                  <TabsTrigger key={label} value={label.toLowerCase()} disabled>
                    <Skeleton className="h-4 w-20" />
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="published">
                <ScrollArea className="h-64 w-full rounded-md border p-4">
                  <div className="flex flex-wrap gap-2">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-8 w-24" />
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
