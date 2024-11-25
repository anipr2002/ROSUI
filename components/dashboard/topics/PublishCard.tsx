"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ITopic } from "@/types/types";
import topicsAPI from "@/roslib/topics";

type TopicPublisherCardProps = {
  topic: ITopic;
  ros: ROSLIB.Ros;
};

const TopicPublisherCard: React.FC<TopicPublisherCardProps> = ({
  topic,
  ros,
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [isPublishing, setIsPublishing] = useState(false);

  const { publishTopic } = topicsAPI;

  const handleInputChange = (
    fieldName: string,
    value: string,
    fieldType: string
  ) => {
    let parsedValue: any = value;

    // Parse values based on field type
    try {
      if (fieldType.includes("int")) {
        parsedValue = parseInt(value);
      } else if (fieldType.includes("float") || fieldType.includes("double")) {
        parsedValue = parseFloat(value);
      } else if (fieldType.includes("bool")) {
        parsedValue = value === "true";
      } else if (fieldType.includes("array")) {
        parsedValue = value.split(",").map((item) => item.trim());
      }
    } catch (error) {
      toast.error(`Error parsing value for ${fieldName}: ${error.message}`);
    }

    setFormValues((prev) => ({
      ...prev,
      [fieldName]: parsedValue,
    }));
  };

  const handlePublish = async () => {
    const toastId = toast.loading("Publishing message...");
    setIsPublishing(true);

    try {
      // Create message object from form values
      const message: Record<string, any> = {};
      topic.fieldNames.forEach((name) => {
        message[name.slice(1)] = formValues[name] || null;
      });

      await publishTopic(ros, topic, message);

      toast.success("Message published successfully!", {
        id: toastId,
        description: `Published to ${topic.name}`,
      });
    } catch (error) {
      toast.error("Failed to publish message", {
        id: toastId,
        description: error.message,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="bg-secondary">
        <div className="flex flex-col items-start justify-between">
          <CardTitle className="text-2xl font-bold">{topic.name}</CardTitle>
          <Badge variant="outline">{topic.messageType}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePublish();
          }}
          className="space-y-4"
        >
          {topic.fieldNames.map((fieldName, index) => (
            <div key={fieldName} className="space-y-2">
              <Label className="text-sm">
                {fieldName.slice(1)}
                <span className="ml-2 text-xs text-muted-foreground">
                  ({topic.fieldTypes[index]})
                </span>
              </Label>
              <Input
                placeholder={`Enter ${topic.fieldTypes[index]} value`}
                onChange={(e) =>
                  handleInputChange(
                    fieldName,
                    e.target.value,
                    topic.fieldTypes[index]
                  )
                }
                value={formValues[fieldName] || ""}
              />
            </div>
          ))}

          <Button type="submit" className="w-full" disabled={isPublishing}>
            <Send className="mr-2 h-4 w-4" />
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TopicPublisherCard;
