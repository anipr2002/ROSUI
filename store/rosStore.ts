// store/rosStore.ts
import { create } from 'zustand';
import * as roslib from 'roslib';
import { toast } from 'sonner';


interface RosState {
  ros: roslib.Ros | null;
  rosUrl: string;
  isConnected: boolean;
  setRosUrl: (url: string) => void;
  connect: () => void;
  disconnect: () => void;
}

const useRosStore = create<RosState>((set, get) => ({
  ros: null,
  rosUrl: 'ws://localhost:9090',
  isConnected: false,
  setRosUrl: (url: string) => set({ rosUrl: url }),
  connect: () => {
    const { rosUrl } = get();
    const ros = new roslib.Ros({ url: rosUrl });

    ros.on('connection', () => {
      set({ isConnected: true, ros });
      toast.success('Connected to websocket server.');
      console.log('Connected to websocket server.');
    });

    ros.on('error', (error) => {
      set({ isConnected: false });
      toast.error('Error connecting to websocket server.');
      console.log('Error connecting to websocket server:', error);
    });

    ros.on('close', () => {
      set({ isConnected: false });
      toast.error('Connection to websocket server closed.');
      console.log('Connection to websocket server closed.');
    });
  },
  disconnect: () => {
    const { ros } = get();
    if (ros) {
      ros.close();
      set({ ros: null, isConnected: false });
      toast.success('Disconnected from websocket server.');
    }
  },
}));

// export ros variable to be used in other files
export const useRos = () => useRosStore((state) => state.ros);
export default useRosStore;
