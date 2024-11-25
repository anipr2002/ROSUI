import {
  Circle,
  MessageSquare,
  Cog,
  Sliders,
  Network,
  Cpu,
  Database,
  GitBranch,
} from "lucide-react";

export const NodeIcon = ({ className = "", ...props }) => (
  <Network className={`w-6 h-6 ${className}`} {...props} />
);

export const TopicIcon = ({ className = "", ...props }) => (
  <MessageSquare className={`w-6 h-6 ${className}`} {...props} />
);

export const ServiceIcon = ({ className = "", ...props }) => (
  <Cog className={`w-6 h-6 ${className}`} {...props} />
);

export const ParameterIcon = ({ className = "", ...props }) => (
  <Sliders className={`w-6 h-6 ${className}`} {...props} />
);

export const MasterIcon = ({ className = "", ...props }) => (
  <Cpu className={`w-6 h-6 ${className}`} {...props} />
);

export const BagIcon = ({ className = "", ...props }) => (
  <Database className={`w-6 h-6 ${className}`} {...props} />
);

export const NamespaceIcon = ({ className = "", ...props }) => (
  <GitBranch className={`w-6 h-6 ${className}`} {...props} />
);

export const ActionIcon = ({ className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-6 h-6 ${className}`}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
    <path d="M16 16l-4-2" />
  </svg>
);

export const TransformIcon = ({ className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-6 h-6 ${className}`}
    {...props}
  >
    <path d="M4 4v16h16" />
    <path d="M4 20l7-7" />
    <path d="M15 9l5 5" />
    <path d="M15 14l5-5" />
  </svg>
);

export default function Component() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="flex flex-col items-center">
        <NodeIcon className="text-blue-500" />
        <span className="mt-2 text-sm">Node</span>
      </div>
      <div className="flex flex-col items-center">
        <TopicIcon className="text-green-500" />
        <span className="mt-2 text-sm">Topic</span>
      </div>
      <div className="flex flex-col items-center">
        <ServiceIcon className="text-purple-500" />
        <span className="mt-2 text-sm">Service</span>
      </div>
      <div className="flex flex-col items-center">
        <ParameterIcon className="text-yellow-500" />
        <span className="mt-2 text-sm">Parameter</span>
      </div>
      <div className="flex flex-col items-center">
        <MasterIcon className="text-red-500" />
        <span className="mt-2 text-sm">Master</span>
      </div>
      <div className="flex flex-col items-center">
        <BagIcon className="text-indigo-500" />
        <span className="mt-2 text-sm">Bag</span>
      </div>
      <div className="flex flex-col items-center">
        <NamespaceIcon className="text-pink-500" />
        <span className="mt-2 text-sm">Namespace</span>
      </div>
      <div className="flex flex-col items-center">
        <ActionIcon className="text-orange-500" />
        <span className="mt-2 text-sm">Action</span>
      </div>
      <div className="flex flex-col items-center">
        <TransformIcon className="text-teal-500" />
        <span className="mt-2 text-sm">Transform</span>
      </div>
    </div>
  );
}
