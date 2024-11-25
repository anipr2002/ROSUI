import { create } from 'zustand';
import { INode } from '@/types/types';

interface NodeStore{
  nodes: INode[];
  setNodes: (nodes: INode[]) => void;
}

const useNodeStore = create<NodeStore>((set) => ({
  nodes: [],
  setNodes: (nodes: INode[]) => set({ nodes }),
}));
export default useNodeStore;
