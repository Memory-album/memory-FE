import axios from 'axios';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

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

const useUserStore = create(
  //persist로 새로고침해도 상태 유지
  persist<UserStore>(
    (set) => ({
      userInfo: null,
      fetchUserInfo: async () => {
        try {
          const userResponse = await axios.get(`/api/user/my-page`, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          //userInfo 구조를 평탄화해서 저장
          const { user } = userResponse.data;
          set({
            userInfo: {
              email: user.email,
              name: user.name,
              profileImgUrl: user.profileImgUrl,
              currentGroupId: 1,
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
    }),
    {
      name: 'user-storage',
    },
  ),
);

export default useUserStore;
