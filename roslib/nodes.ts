import * as ROSLIB from "roslib";
import { INode } from "@/types/types";

// Nodes to ignore
const IGNORE_NODES = [
    "/rosapi",
    "rosapi",
    "/rosapi_params",
    "rosapi_params",
    "/rosout",
    "rosout",
    "rosbridge",
    "/rosbridge",
    "/rosbridge/rosbridge_websockets"
];

// Function to check if a node should be included
function shouldIncludeNode(nodeName: string): boolean {
    return !IGNORE_NODES.some(ignored =>
        nodeName.toLowerCase().includes(ignored.toLowerCase())
    );
}

function getDetailedNodes(ros: ROSLIB.Ros): Promise<INode[]> {
  return new Promise((resolve, reject) => {
    ros.getNodes((nodes) => {
      // Filter out the nodes to ignore
      const filteredNodes = nodes.filter(shouldIncludeNode);

      const detailedNodes: INode[] = [];
      let processedNodes = 0;

      if (filteredNodes.length === 0) {
        resolve(detailedNodes);
        return;
      }

      filteredNodes.forEach((node) => {
        ros.getNodeDetails(node, (details) => {
          const nodeInfo: INode = {
            name: node,
            subscribedTopics: details.subscribing || [],
            publishedTopics: details.publishing || [],
            services: details.services || []
          };
          detailedNodes.push(nodeInfo);
          processedNodes++;

          if (processedNodes === filteredNodes.length) {
            resolve(detailedNodes);
          }
        });
      });
    }, (error) => {
      console.error('Error getting nodes:', error);
      reject(error);
    });
  });
}

export default getDetailedNodes;
