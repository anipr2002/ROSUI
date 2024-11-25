"use client";

import React from "react";
import useRosStore from "@/store/rosStore";
import { Spinner } from "./spinner";

export default function IsConnected() {
  const { isConnected } = useRosStore();

  return (
    <>
      {!isConnected && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-300 text-[#f0721b] p-1 text-center z-[99999]">
          <div className="flex items-center justify-center gap-3">
            Connecting to ROS server
            <Spinner />
          </div>
        </div>
      )}
    </>
  );
}
