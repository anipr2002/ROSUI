"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell } from "lucide-react";

export default function TopicDetailsSkeleton() {
  const skeletonCards = Array(10).fill(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {skeletonCards.map((_, index) => (
        <Card key={index} className="w-full max-w-md overflow-hidden">
          <CardHeader className="bg-secondary flex flex-row items-center justify-between">
            <Skeleton className="h-8 w-1/2" />
            <Button variant="secondary" size="sm" disabled>
              <Bell className="mr-2 h-4 w-4" />
              Subscribe
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="fields">Fields</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <ScrollArea className="h-64 w-full rounded-md border p-4">
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((index) => (
                      <div key={index} className="flex h-full flex-col gap-1">
                        <Skeleton className="h-4 w-1/4" />
                        {index === 4 ? (
                          <Skeleton className="h-20 w-full" />
                        ) : (
                          <Skeleton className="h-6 w-1/2" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="fields">
                <ScrollArea className="h-64 w-full rounded-md border p-4">
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-2"
                      >
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-5 w-16" />
                      </div>
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
