import { create } from 'zustand';
import useGroupStore from './useGroupStore';
import useUserStore from '@/store/useUserInfo';

interface CreatedBy {
  name: string;
  profileImgUrl: string;
}

interface Album {
  id: number;
  title: string;
  thumbnailUrl: string[];
  likes: boolean;
  createdBy: CreatedBy;
}

interface AlbumStore {
  albums: Album[];
  hasAlbums: boolean;
  isLoading: boolean;
  fetchAlbums: () => Promise<void>;
  refreshAlbums: () => Promise<void>;
}

const useAlbumStore = create<AlbumStore>((set) => ({
  albums: [],
  hasAlbums: false,
  isLoading: false,
  fetchAlbums: async () => {
    try {
      const { userInfo, isLoading: userLoading } = useUserStore.getState();

      if (userLoading || !userInfo?.currentGroupId) {
        return;
      }

      set({ isLoading: true });
      const response = await fetch(
        `/backend/api/v1/albums/group/${userInfo.currentGroupId}`,
        {
          method: 'get',
          credentials: 'include',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }

      const data = await response.json();
      set({
        albums: data.data,
        hasAlbums: data.data.length > 0,
        isLoading: false,
      });
    } catch (e) {
      console.error('Error fetching albums: ', e);
      set({ isLoading: false });
    }
  },
  refreshAlbums: async () => {
    try {
      const { userInfo, isLoading: userLoading } = useUserStore.getState();

      if (userLoading || !userInfo?.currentGroupId) {
        return;
      }

      set({ isLoading: true });
      const response = await fetch(
        `/backend/api/v1/albums/group/${userInfo.currentGroupId}`,
        {
          method: 'get',
          credentials: 'include',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }

      const data = await response.json();
      set({
        albums: data.data,
        hasAlbums: data.data.length > 0,
        isLoading: false,
      });
    } catch (e) {
      console.error('Error refreshing albums: ', e);
      set({ isLoading: false });
    }
  },
}));

export default useAlbumStore;
