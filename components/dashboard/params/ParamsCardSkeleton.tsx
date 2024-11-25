"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ParameterCardSkeleton() {
  return (
    <Card className="w-[85%]">
      <CardHeader className="bg-secondary">
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ParameterCardsSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <ParameterCardSkeleton key={index} />
        ))}
    </div>
  );
}
