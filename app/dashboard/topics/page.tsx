"use client";
import React from "react";
import useTopicStore from "@/store/topicStore";
import TopicCard from "@/components/dashboard/topics/TopicCard";
import TopicCardSkeleton from "@/components/dashboard/topics/TopicCardSkeleton";
import useRosStore from "@/store/rosStore";

const Topics = () => {
  const { topics } = useTopicStore();
  const { ros, isConnected } = useRosStore();
  return (
    <>
      <div className="flex flex-wrap justify-evenly gap-4">
        {ros &&
          topics.map((topic) => (
            <TopicCard key={topic.name} topic={topic} ros={ros} />
          ))}
      </div>

      {(!isConnected || topics.length === 0) && (
        <div className="flex w-full flex-col items-center justify-center mt-5">
          {!isConnected && (
            <>
              <h2 className="text-2xl font-bold">ROS is not connected</h2>
              <p className="text-sm">
                Please connect to a ROS master to view nodes
              </p>
            </>
          )}
          {topics.length === 0 && (
            <>
              <h2 className="text-2xl font-bold">Loading</h2>
              <p className="text-sm">
                Please create a parameter to view it here
              </p>
            </>
          )}
          <div className="mt-6 w-full">
            <TopicCardSkeleton />
          </div>
        </div>
      )}
    </>
  );
};

export default Topics;
