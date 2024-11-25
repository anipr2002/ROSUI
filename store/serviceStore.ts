import { create } from 'zustand';
import { IService } from '@/types/types';

interface ServiceStore{
  services: IService[];
  setServices: (services: IService[]) => void;
}

const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  setServices: (services: IService[]) => set({ services }),
}));
export default useServiceStore;
