import { create } from 'zustand';
import { ITopic } from '@/types/types';

interface TopicStore{
  topics: ITopic[];
  setTopics: (topics: ITopic[]) => void;
  updateTopic: (topicName: string, updates: Partial<ITopic>) => void;

}

const useTopicStore = create<TopicStore>((set) => ({
  topics: [],
  setTopics: (topics: ITopic[]) => set({ topics }),
  updateTopic: (topicName, updates) => set((state) => ({
    topics: state.topics.map(topic =>
      topic.name === topicName
        ? { ...topic, ...updates }
        : topic
    )
  })),
}));

export default useTopicStore;
