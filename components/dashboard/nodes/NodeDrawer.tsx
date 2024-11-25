"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ITopic } from "@/types/types";
import topicsAPI from "@/roslib/topics";
import useRosStore from "@/store/rosStore";
import { Button } from "@/components/ui/button";

type NodeDrawerProps = {
  name: string;
  section: "published" | "subscribed" | "services";
};

const NodeDrawer = (props: NodeDrawerProps) => {
  const { ros } = useRosStore();
  const [topicArgs, setTopicArgs] = React.useState<ITopic["fieldNames"]>([]);

  const getTopicArgs = (topic: string) => {
    if (!ros) {
      return;
    }
    topicsAPI.getTopic(ros, topic).then((topicInfo) => {
      if (topicInfo) {
        setTopicArgs(topicInfo.fieldNames);
      } else {
        setTopicArgs([]);
      }
    });
  };

  React.useEffect(() => {
    if (props.section === "published" || props.section === "subscribed") {
      getTopicArgs(props.name);
    }
  }, [props.name]);

  return (
    <>
      {(props.section === "published" || props.section === "subscribed") && (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant={"outline"}>{props.name}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerClose />
            <DrawerHeader>
              <DrawerTitle>Node</DrawerTitle>
            </DrawerHeader>

            <div className="flex flex-col gap-4">
              {topicArgs.map((arg, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="w-full rounded-md border border-solid border-border px-2 py-1"
                    placeholder={arg}
                  />
                </div>
              ))}
            </div>
            <DrawerFooter>
              <button className="btn btn-secondary">Cancel</button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default NodeDrawer;
