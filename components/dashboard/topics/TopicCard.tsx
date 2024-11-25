"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, BellOff } from "lucide-react";

import { ITopic } from "@/types/types";
import topicsAPI from "@/roslib/topics";
import useTopicStore from "@/store/topicStore";

export default function TopicInfoCard({
  topic,
  ros,
}: {
  topic: ITopic;
  ros: ROSLIB.Ros;
}) {
  const { subscribeToTopic } = topicsAPI;
  const { topics, setTopics } = useTopicStore();
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscription = async () => {
    setIsSubscribed(!isSubscribed);
    try {
      if (!isSubscribed) {
        // Subscribe logic
        if (!ros) {
          return;
        }
        const messages = await subscribeToTopic(ros, topic);

        // Update the topic in the global topics state
        setTopics(
          topics.map((t) =>
            t.name === topic.name ? { ...t, message: messages } : t
          )
        );
      } else {
        // Unsubscribe logic
        setTopics(
          topics.map((t) =>
            t.name === topic.name ? { ...t, message: undefined } : t
          )
        );
        // Here you would typically call an unsubscribe method if available
      }
    } catch (error) {
      console.error("Failed to handle topic subscription:", error);
    }
  };

  const sections = {
    details: {
      label: "Details",
      data: [
        { label: "Message Type", value: topic.messageType },
        {
          label: "Latest Message",
          value:
            isSubscribed && topic.message
              ? JSON.stringify(topic.message, null, 2)
              : "No message received yet.",
        },
      ],
    },
    fields: {
      label: `Fields (${topic.fieldNames.length})`,
      data: topic.fieldNames.map((name, index) => ({
        name,
        type: topic.fieldTypes[index],
      })),
    },
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="bg-secondary flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold ">{topic.name}</CardTitle>

        <Button
          className=""
          variant={isSubscribed ? "destructive" : "secondary"}
          size="sm"
          onClick={handleSubscription}
        >
          {isSubscribed ? (
            <>
              <BellOff className="mr-2 h-4 w-4" />
              Unsubscribe
            </>
          ) : (
            <>
              <Bell className="mr-2 h-4 w-4" />
              Subscribe
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            {Object.entries(sections).map(([key, section]) => (
              <TabsTrigger key={key} value={key}>
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="details">
            <ScrollArea className="h-64 w-full rounded-md border p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-4">
                    {sections.details.data.map((item, index) => (
                      <div key={index} className="flex h-full flex-col gap-1">
                        <span className="text-sm h-full text-muted-foreground">
                          {item.label}
                        </span>
                        {item.label === "Latest Message" ? (
                          <pre className="whitespace-pre-wrap h-full text-sm bg-muted p-2 rounded-md">
                            {item.value}
                          </pre>
                        ) : (
                          <Badge variant="secondary">{item.value}</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="fields">
            <ScrollArea className="h-64 w-full rounded-md border p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-2">
                    {sections.fields.data.map((field, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-2"
                      >
                        <span className="font-medium">
                          {field.name.slice(1)}
                        </span>
                        <Badge>{field.type}</Badge>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
