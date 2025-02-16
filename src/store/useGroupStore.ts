import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface Group {
  id: number;
  name: string;
  groupImageUrl: string;
  description: string;
}

interface GroupStore {
  groups: Group[];
  fetchGroups: () => Promise<void>;
  clearGroups: () => void;
}

const useGroupStore = create(
  persist<GroupStore>(
    (set) => ({
      groups: [],
      fetchGroups: async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groups/my-groups`,
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          set({ groups: response.data.data });
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      },
      clearGroups: () => set({ groups: [] }),
    }),
    {
      name: 'group-store',
    },
  ),
);

export default useGroupStore;
