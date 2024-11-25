"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CodeSection from "@/components/CodeSection";
import { Info } from "lucide-react";

const install = `
sudo apt-get install ros-<rosdistro>-rosbridge-server
`;

const launchCpp = `
<launch>
  <!-- Start ROSBridge WebSocket server -->
  <node name="rosbridge_websocket" pkg="rosbridge_server" type="rosbridge_websocket" output="screen">
 <param name="port" value="9090" />
  </node>

  <node name="rosapi" pkg="rosapi" type="rosapi_node" output="screen" />

  <!-- Add any custom ROS nodes here -->
  <!-- Example of custom node -->
  <node pkg="my_custom_package" type="my_node" name="my_custom_node" output="screen" />
</launch>
`;

const launchPython = `
Node(
    package='rosbridge_server',
    executable='rosbridge_websocket',
    name='rosbridge_websocket',
    output='screen',
    parameters=[{'port': 9090}]
),

Node(
    package='rosapi',
    executable='rosapi_node',
    name='rosapi',
    output='screen'
),

# Add any custom ROS nodes here
# Example of custom node
Node(
    package='my_custom_package',
    executable='my_node',
    name='my_custom_node',
    output='screen'
)`;

const roslaunch = `
roslaunch my_launch_files rosbridge_with_rosapi.launch`;
const page = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div>
        <div id="intro">
          <p className="text-5xl font-bold"> Getting Started guide</p>
          <Separator className="my-4" />
          <p className="text-4xl mb-2">Installation</p>
          <p className="mb-2">
            Rosbridge is available as a debian. To install:
          </p>
          <CodeSection code={install} language="bash" />
          <div className="flex items-center gap-2 mt-3">
            <Info className="text-green-500" />
            <p className="opacity-30">
              Replace {`<your-ros-distro>`} with your ROS distribution (e.g.,
              noetic, melodic).
            </p>
          </div>
        </div>

        <div id="launch" className="mt-10">
          <p className="text-4xl mb-2">Launch ROSBridge Websocket and ROSApi</p>
          <Separator className="my-4" />
          <p className="mb-2">
            Add the following lines the your{" "}
            <span className="bg-accent italic px-2 py-1 rounded-md">
              launch
            </span>{" "}
            file
          </p>
          <Tabs defaultValue="C++" className="w-full]">
            <TabsList>
              <TabsTrigger value="C++">C++</TabsTrigger>
              <TabsTrigger value="Python">Python</TabsTrigger>
            </TabsList>
            <TabsContent value="C++">
              <CodeSection code={launchCpp} language="xml" />
            </TabsContent>
            <TabsContent value="Python">
              <CodeSection code={launchPython} language="python" />
            </TabsContent>
          </Tabs>
        </div>

        <div id="roslauch" className="my-10">
          <p className="text-4xl mb-2">
            Launch the ROSBridge and ROSAPI nodes:
          </p>
          <Separator className="my-4" />
          <CodeSection code={roslaunch} language="js" />
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default page;
