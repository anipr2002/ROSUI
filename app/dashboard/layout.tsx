"use client";

import React, { useEffect } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import useRosStore from "@/store/rosStore";
import useNodeStore from "@/store/nodeStore";
import useTopicStore from "@/store/topicStore";
import useServiceStore from "@/store/serviceStore";
import useParamStore from "@/store/paramStore";

import getDetailedNodes from "@/roslib/nodes";
import getDetailedServices from "@/roslib/services";
import topicsAPI from "@/roslib/topics";
import paramAPI from "@/roslib/params";

import AppSidebar from "@/components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { rosUrl, setRosUrl, connect, isConnected, ros } = useRosStore();

  const { setNodes } = useNodeStore();
  const { setTopics } = useTopicStore();
  const { setServices } = useServiceStore();
  const { setParams } = useParamStore();

  useEffect(() => {
    if (rosUrl === "ws://localhost:9090") {
      setRosUrl("ws://localhost:9090");
      connect();
    }
  }, []);

  useEffect(() => {
    if (!ros) {
      return;
    }

    console.log("ROS is connected");
    const getNodes = async () => {
      const detailedNodes = await getDetailedNodes(ros);
      setNodes(detailedNodes);
    };

    const getTopics = async () => {
      const detailedTopics = await topicsAPI.getDetailedTopics(ros);
      setTopics(detailedTopics);
      console.log("Topics:", detailedTopics);
    };

    // const getServices = async () => {
    //   const detailedServices = await getDetailedServices(ros);
    //   setServices(detailedServices);
    // };

    const getParams = async () => {
      const detailedParams = await paramAPI.getDetailedParams(ros);
      setParams(detailedParams);
    };

    getNodes();
    getTopics();
    // getServices();
    getParams();
  }, [isConnected]);

  return (
    <>
      <SidebarProvider>
        <AppSidebar>{children}</AppSidebar>
      </SidebarProvider>
    </>
  );
}
