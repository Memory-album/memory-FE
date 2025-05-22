import { create } from 'zustand';
import axios from 'axios';

interface Group {
  id: number;
  name: string;
  groupImageUrl: string;
  groupDescription: string;
  inviteCode: string;
  role: string;
  userName: string;
  groupProfileImgUrl: string;
  notificationEnabled: boolean;
  sortOrder: number;
  lastVisitAt: string;
  ownerName: string;
  ownerUserId: number;
}

interface GroupStore {
  group: Group | null;
  fetchGroup: (groupId: number) => Promise<void>;
  clearGroup: () => void;
}

const useGroupStore = create<GroupStore>((set) => ({
  group: null,
  fetchGroup: async (groupId: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groups/${groupId}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      set({ group: response.data.data });
    } catch (error) {
      console.error('Error fetching group:', error);
    }
  },
  clearGroup: () => set({ group: null }),
}));

export default useGroupStore;
