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
  isLoading: boolean;
  fetchUserInfo: () => Promise<User | null>;
  clearUserInfo: () => void;
  setCurrentGroupId: (groupId: number) => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  userInfo: null,
  isLoading: true,
  fetchUserInfo: async (): Promise<User | null> => {
    try {
      set({ isLoading: true });
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
        isLoading: false,
      });
      return newUserInfo;
    } catch (error) {
      console.error('Error fetching user data:', error);
      set({ isLoading: false });
      return null;
    }
  },
  clearUserInfo: () => set({ userInfo: null, isLoading: false }),
  setCurrentGroupId: (groupId: number) =>
    set((state) => ({
      userInfo: state.userInfo
        ? { ...state.userInfo, currentGroupId: groupId }
        : null,
    })),
}));

export default useUserStore;
