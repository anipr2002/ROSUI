"use client";

import React from "react";
import useNodeStore from "@/store/nodeStore";
import useRosStore from "@/store/rosStore";
import ROSNodeInfoCard from "@/components/dashboard/nodes/NodeCard";
import ROSNodeInfoSkeleton from "@/components/dashboard/nodes/NodeSkeleton";

const Nodes = () => {
  const { nodes } = useNodeStore();
  const { isConnected } = useRosStore();
  return (
    <>
      <div className="flex w-full justify-between items-center border-b-2 py-2">
        <h1 className="text-2xl font-bold">ROS NODES</h1>
      </div>
      {isConnected && (
        <div className="flex flex-wrap gap-y-8 justify-evenly mt-5">
          {nodes.map((node) => (
            <ROSNodeInfoCard key={node.name} node={node} />
          ))}
        </div>
      )}
      {(!isConnected || nodes.length === 0) && (
        <div className="flex flex-col items-center justify-center mt-5">
          {!isConnected && (
            <>
              <h2 className="text-2xl font-bold">ROS is not connected</h2>
              <p className="text-sm">
                Please connect to a ROS master to view nodes
              </p>
            </>
          )}
          {/* {isConnected && nodes.length === 0 && (
            <>
              <h2 className="text-2xl font-bold">Loading</h2>
              <p className="text-sm">
                Please create a parameter to view it here
              </p>
            </>
          )} */}

          <div className="mt-6">
            <ROSNodeInfoSkeleton />
          </div>
        </div>
      )}
    </>
  );
};

export default Nodes;
