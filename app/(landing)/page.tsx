"use client";

import { useEffect, useState } from "react";
import getDetailedNodes from "@/roslib/nodes";
import { INode } from "@/types/types";
import useRosStore from "@/store/rosStore";
import { redirect } from "next/navigation";

export default function Home() {
  const [nodes, setNodes] = useState<INode[]>([]);
  const { ros } = useRosStore();

  useEffect(() => {
    redirect("/dashboard/docs");
  }, []);
  useEffect(() => {
    if (!ros) {
      return;
    }
    const getNodes = async () => {
      const detailedNodes = await getDetailedNodes(ros);
      setNodes(detailedNodes);
    };

    getNodes();
  }, [ros]);
  return (
    <div>
      <h1>ROS Nodes</h1>
      {nodes.map((node) => (
        <div key={node.name}>
          <h2>{node.name}</h2>
          <h3>Subscribed Topics:</h3>
          <ul>
            {node.subscribedTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <h3>Published Topics:</h3>
          <ul>
            {node.publishedTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <h3>Services:</h3>
          <ul>
            {node.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
