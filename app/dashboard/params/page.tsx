"use client";
import React from "react";
import useParamStore from "@/store/paramStore";
import useRosStore from "@/store/rosStore";
import ParameterCard from "@/components/dashboard/params/ParamsCard";
import ParameterCardSkeleton from "@/components/dashboard/params/ParamsCardSkeleton";
const Parameters = () => {
  const { params } = useParamStore();
  const { ros, isConnected } = useRosStore();
  return (
    <>
      {(!isConnected || params.length === 0) && (
        <div className="flex w-full flex-col items-center justify-center mt-5">
          {!isConnected && (
            <>
              <h2 className="text-2xl font-bold">ROS is not connected</h2>
              <p className="text-sm">
                Please connect to a ROS master to view nodes
              </p>
            </>
          )}
          {params.length === 0 && (
            <>
              <h2 className="text-2xl font-bold">Loading</h2>
              <p className="text-sm">
                Please create a parameter to view it here
              </p>
            </>
          )}

          <div className="mt-6 w-full">
            <ParameterCardSkeleton />
          </div>
        </div>
      )}
      {isConnected && ros && (
        <div className="flex w-full flex-col justify-evenly gap-4">
          {params.map((param) => (
            <ParameterCard key={param.name} param={param} />
          ))}
        </div>
      )}
    </>
  );
};

export default Parameters;
