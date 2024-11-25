"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { IconCloudFilled } from "@tabler/icons-react";
import { CloudOff, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Ripple from "@/components/magicui/ripple";
import { AnimatedBeam } from "@/components/magicui/animatedBeams";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import useRosStore from "@/store/rosStore";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-16 items-center justify-center rounded-md border-4 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function RosConnection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);

  const { rosUrl, isConnected, setRosUrl, connect, disconnect } = useRosStore();
  const rosRef = useRef<HTMLInputElement>(null);

  //   setRosUrl to 9090 initially

  return (
    <div
      className="relative flex flex-col w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-10 "
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between gap-4">
          <Circle
            ref={div1Ref}
            className={cn(
              "shadow-lg bg-white",
              isConnected && "shadow-[0_0_20px_-12px_rgba(112,111,253,1)]",
              !isConnected && "shadow-[0_0_20px_-12px_rgba(239,68,68,1)]"
            )}
          >
            <IconCloudFilled
              className={cn(
                "",
                isConnected && "text-[#706ffd]",
                !isConnected && "text-red-500 "
              )}
            />
            <Ripple
              className={cn(
                isConnected && "opacity-100",
                !isConnected && "opacity-0"
              )}
              mainCircleOpacity={0.1}
              circleColor={cn(isConnected && "bg-green-500")}
            />
          </Circle>
          <Badge
            className={cn(
              "z-10 bg-background shadow-lg ",
              isConnected &&
                "shadow-[0px_5px_1px_rgba(112,111,253,_0.7),_0_10px_20px_rgba(112,111,253,_0.7)]",
              !isConnected &&
                "shadow-[0px_5px_1px_rgba(239,68,68,_0.7),_0_10px_20px_rgba(239,68,68,_0.7)]"
            )}
            ref={div2Ref}
            variant={"outline"}
          >
            ROS
          </Badge>
        </div>
      </div>

      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
      />
      <div className="flex flex-col gap-4 mt-3 z-[10000]">
        <Input
          placeholder="ws://localhost:9090"
          ref={rosRef}
          defaultValue={rosUrl}
          className="without-ring"
        />
        <div className="flex gap-2 items-center w-full justify-center ">
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  //   disabled={isConnected}
                  className="w-fit"
                  variant={"outline"}
                  onClick={() => {
                    if (rosRef.current && !isConnected) {
                      setRosUrl(rosRef.current.value);
                      connect();
                    }
                  }}
                >
                  <Radio />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="z-[10000]" side="bottom">
                {isConnected ? "Connected" : "Connect"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={disconnect}
                  disabled={!isConnected}
                  variant={"destructive"}
                  className="w-fit"
                >
                  <CloudOff />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="z-[10000]" side="bottom">
                {isConnected ? "Disconnect" : "Disconnect"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
