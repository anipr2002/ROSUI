"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import paramAPI from "@/roslib/params";
import useRosStore from "@/store/rosStore";

function ParameterCard({ param }: { param: { name: string; value: string } }) {
  const { ros } = useRosStore();

  const handleSetParam = async () => {
    await paramAPI.editParam(ros!, param.name, editValue);
  };

  //   const handleDeleteParam = async () => {
  //     await paramAPI.deleteParam(ros!, param.name);
  //   };

  const [editValue, setEditValue] = useState(param.value);

  return (
    <Card className="w-full">
      <CardHeader className="bg-secondary w-full">
        <div className="flex  items-center justify-between">
          <CardTitle className="text-lg font-semibold">{param.name}</CardTitle>

          {/* <Button onClick={handleDeleteParam} className="w-fit">
            Delete
          </Button> */}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Current Value:
            </span>
            <span className="font-medium">{param.value}</span>
          </div>
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={param.value}
          />
          <Button onClick={handleSetParam} className="w-full">
            Set Parameter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ParameterCard;
