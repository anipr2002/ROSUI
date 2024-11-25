"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { INode } from "@/types/types";
import NodeDrawer from "./NodeDrawer";

type Section = "published" | "subscribed" | "services";

export default function ROSNodeInfoCard({ node }: { node: INode }) {
  const sections: Record<Section, { data: string[]; label: string }> = {
    published: {
      data: node.publishedTopics,
      label: `Publications (${node.publishedTopics.length})`,
    },
    subscribed: {
      data: node.subscribedTopics,
      label: `Subscriptions (${node.subscribedTopics.length})`,
    },
    services: {
      data: node.services,
      label: `Services (${node.services.length})`,
    },
  };

  return (
    <>
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader className="bg-secondary">
          <CardTitle className="text-2xl font-bold">{node.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="published" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {(Object.keys(sections) as Section[]).map((section) => (
                <TabsTrigger key={section} value={section}>
                  {sections[section].label}
                </TabsTrigger>
              ))}
            </TabsList>
            {(Object.keys(sections) as Section[]).map((section) => (
              <TabsContent key={section} value={section}>
                <ScrollArea className="h-64 w-full rounded-md border p-4 ">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={section}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-wrap gap-2">
                        {sections[section].data.map((item, index) => (
                          <NodeDrawer
                            name={item}
                            key={index}
                            section={section}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
