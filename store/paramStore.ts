import { create } from 'zustand';
import { IParam } from '@/types/types';

interface ParamStore{
  params: IParam[];
  setParams: (params: IParam[]) => void;
  updateParam: (paramName: string, updates: Partial<IParam>) => void;
}

const useParamStore = create<ParamStore>((set) => ({
  params: [],
  setParams: (params: IParam[]) => set({ params }),
  updateParam: (paramName: string, updates: Partial<IParam>) => {
    set((state) => ({
      params: state.params.map((param) => {
        if (param.name === paramName) {
          return {
            ...param,
            ...updates,
          };
        }
        return param;
      }),
    }));
  },
}));
export default useParamStore;
