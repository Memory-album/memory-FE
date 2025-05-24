import axios from 'axios';
import { create } from 'zustand';
import { getUserGroups } from '@/features/group/api/getUserGroups';

interface User {
  email: string;
  name: string;
  profileImgUrl: string;
  currentGroupId: number;
}

interface UserStore {
  userInfo: User | null;
  fetchUserInfo: () => Promise<void>;
  clearUserInfo: () => void;
  setCurrentGroupId: (groupId: number) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userInfo: null,
  fetchUserInfo: async () => {
    try {
      const userResponse = await axios.get('/backend/user/my-page', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Get user's groups and set currentGroupId
      const groups = await getUserGroups();
      const currentGroupId = groups && groups.length > 0 ? groups[0].id : 1;
      console.log(groups[0].id);

      const { user } = userResponse.data;
      set({
        userInfo: {
          email: user.email,
          name: user.name,
          profileImgUrl: user.profileImgUrl,
          currentGroupId,
        },
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
  clearUserInfo: () => set({ userInfo: null }),
  setCurrentGroupId: (groupId: number) =>
    set((state) => ({
      userInfo: state.userInfo
        ? { ...state.userInfo, currentGroupId: groupId }
        : null,
    })),
}));

export default useUserStore;
