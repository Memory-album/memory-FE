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
  fetchUserInfo: () => Promise<User | null>;
  clearUserInfo: () => void;
  setCurrentGroupId: (groupId: number) => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  userInfo: null,
  fetchUserInfo: async (): Promise<User | null> => {
    try {
      const userResponse = await axios.get('/backend/user/my-page', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const groups = await getUserGroups();
      const currentUserInfo = get().userInfo;
      const currentGroupId =
        currentUserInfo?.currentGroupId &&
        groups.some((group: any) => group.id === currentUserInfo.currentGroupId)
          ? currentUserInfo.currentGroupId
          : groups && groups.length > 0
            ? groups[0].id
            : 1;

      const { user } = userResponse.data;
      const newUserInfo: User = {
        email: user.email,
        name: user.name,
        profileImgUrl: user.profileImgUrl,
        currentGroupId,
      };
      set({
        userInfo: newUserInfo,
      });
      return newUserInfo;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
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
