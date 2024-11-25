// @ts-ignore
import * as ROSLIB from "roslib";
import { ITopic } from "../types/types";
const IGNORE_TOPICS = [
    "/rosout",
    "/rosout_agg",
    "/rosbridge/connected_clients",
    "/parameter_events",
    "/rosbridge"
    // Add any other topics you want to ignore
];
function shouldIncludeTopic(topicName: string): boolean {
    return !IGNORE_TOPICS.some(ignored =>
        topicName.toLowerCase().includes(ignored.toLowerCase())
    );
}
function getDetailedTopics(ros: ROSLIB.Ros): Promise<ITopic[]> {
    return new Promise((resolve, reject) => {
        ros.getTopics((result: { topics: string[], types: string[] }) => {
            const filteredTopicIndices = result.topics
                .map((topic, index) => ({ topic, index }))
                .filter(({ topic }) => shouldIncludeTopic(topic));

            const detailedTopics: ITopic[] = [];
            const topicPromises = filteredTopicIndices.map(({ topic, index }) => {
                return new Promise<void>((resolveType) => {
                    ros.getMessageDetails(result.types[index], (details) => {
                        const topicInfo: ITopic = {
                            name: topic,
                            messageType: result.types[index],
                            fieldNames: details[0].fieldnames || [],
                            fieldTypes: details[0].fieldtypes || [],
                            isSubscribed: false,
                        };
                        detailedTopics.push(topicInfo);
                        resolveType();
                    });
                });
            });

            Promise.all(topicPromises)
                .then(() => {
                    resolve(detailedTopics);
                })
                .catch(reject);
        });
    });
}

function getTopic(ros: ROSLIB.Ros, topic: string): Promise<ITopic | null> {
  if (!shouldIncludeTopic(topic)) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    ros.getTopicType(topic, (type) => {
      ros.getMessageDetails(type, (details) => {
        const topicInfo: ITopic = {
          name: topic,
          messageType: type,
          fieldNames: details[0].fieldnames || [],
          fieldTypes: details[0].fieldtypes || [],
          isSubscribed: false,
        };
        resolve(topicInfo);
      });
    });
  });
}

function subscribeToTopic(ros: ROSLIB.Ros, topic: ITopic): Promise<string[] | null | ROSLIB.Message> {
     if (!shouldIncludeTopic(topic.name)) {
        return Promise.resolve(null);
    }
    const makeTopic = new ROSLIB.Topic({
      ros,
      name: topic.name,
      messageType: topic.messageType,
    });
 return new Promise((resolve) => {
    makeTopic.subscribe((message) => {
      resolve(message);
    });

 })
}

function publishTopic(ros: ROSLIB.Ros, topic: ITopic, message: Record<string, any>): Promise<void> {
  return new Promise((resolve) => {
      if (!shouldIncludeTopic(topic.name)) {
        return Promise.resolve();
    }
    const makeTopic = new ROSLIB.Topic({
      ros,
      name: topic.name,
      messageType: topic.messageType,
    });
    console.log("Publishing message:", message);
    makeTopic.publish(message);
    resolve();
  });
  }

const topicsAPI = {getDetailedTopics, getTopic, subscribeToTopic, publishTopic};
export default topicsAPI;
