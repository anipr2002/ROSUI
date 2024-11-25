"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopicPublisherSkeleton() {
  const skeletonCards = Array(10).fill(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {skeletonCards.map((_, index) => (
        <Card key={index} className="w-full max-w-md">
          <CardHeader className="bg-secondary">
            <div className="flex flex-col items-start justify-between">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <form className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}

              <Button type="submit" className="w-full" disabled>
                <Send className="mr-2 h-4 w-4" />
                Publish
              </Button>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
